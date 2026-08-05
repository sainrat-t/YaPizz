'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { MapPin, Clock } from 'lucide-react';
import styles from './Schedule.module.css';
import { getCurvedPoint, generateCurvedPath } from '@/lib/mapUtils';

// Chargement dynamique de la carte pour éviter les erreurs SSR avec Leaflet
const TourMap = dynamic(() => import('./TourMap'), { 
  ssr: false,
  loading: () => <div className={styles.mapLoadingPlaceholder}>Chargement de la carte...</div>
});

const locationsData = [
  { id: 'mardi', day: 'Mardi', name: 'Quincieux', detail: 'chemin Saint Laurent', time: '17h30 - 21h00', position: [45.912, 4.774] as [number, number], dayIndex: 2, openMin: 17 * 60 + 30, closeMin: 21 * 60 },
  { id: 'jeudi', day: 'Jeudi', name: 'Chasselay', detail: 'Route de Montluzik', time: '17h30 - 21h00', position: [45.872667, 4.768722] as [number, number], dayIndex: 4, openMin: 17 * 60 + 30, closeMin: 21 * 60 },
  { id: 'vendredi', day: 'Vendredi', name: "Châtillon d'Azergues", detail: 'Place du 11 novembre', time: '17h30 - 21h00', position: [45.879, 4.646] as [number, number], dayIndex: 5, openMin: 17 * 60 + 30, closeMin: 21 * 60 },
];

function getMinutesSinceWeekStart(date: Date) {
  const day = date.getDay(); // 0 = Sunday, 1 = Monday
  const adjustedDay = day === 0 ? 6 : day - 1; // 0 = Monday, ..., 6 = Sunday
  return adjustedDay * 24 * 60 + date.getHours() * 60 + date.getMinutes() + date.getSeconds() / 60;
}

// Convert opening times to continuous minutes since Monday 00:00
const schedulePoints = locationsData.map(loc => ({
  ...loc,
  start: (loc.dayIndex - 1) * 24 * 60 + loc.openMin,
  end: (loc.dayIndex - 1) * 24 * 60 + loc.closeMin,
}));

// Function to calculate truck position
function calculateTruckPosition(date: Date): { position: [number, number], isMoving: boolean } {
  const currentMins = getMinutesSinceWeekStart(date);
  
  for (let i = 0; i < schedulePoints.length; i++) {
    const point = schedulePoints[i];
    
    // Si on est pendant l'ouverture
    if (currentMins >= point.start && currentMins <= point.end) {
      return { position: point.position, isMoving: false };
    }
    
    const nextPoint = schedulePoints[(i + 1) % schedulePoints.length];
    
    let isBetween = false;
    let timeElapsed = 0;
    let totalTime = 0;
    
    if (i < schedulePoints.length - 1) {
      if (currentMins > point.end && currentMins < nextPoint.start) {
        isBetween = true;
        timeElapsed = currentMins - point.end;
        totalTime = nextPoint.start - point.end;
      }
    } else {
      // Cas spécial: boucle du week-end (Vendredi soir -> Mardi aprèm)
      const maxMinsInWeek = 7 * 24 * 60; // 10080
      if (currentMins > point.end) {
        // Fin de semaine (Vendredi soir -> Dimanche soir)
        isBetween = true;
        timeElapsed = currentMins - point.end;
        totalTime = (maxMinsInWeek - point.end) + nextPoint.start;
      } else if (currentMins < nextPoint.start) {
        // Début de semaine (Lundi matin -> Mardi aprèm)
        isBetween = true;
        timeElapsed = (maxMinsInWeek - point.end) + currentMins;
        totalTime = (maxMinsInWeek - point.end) + nextPoint.start;
      }
    }
    
    if (isBetween) {
      const progress = totalTime > 0 ? timeElapsed / totalTime : 0;
      return { position: getCurvedPoint(point.position, nextPoint.position, progress), isMoving: true };
    }
  }
  
  return { position: schedulePoints[0].position, isMoving: false };
}

// Générer le tracé complet avec les zig-zags
const fullCurvedPath = [
  ...generateCurvedPath(locationsData[0].position, locationsData[1].position, 40),
  ...generateCurvedPath(locationsData[1].position, locationsData[2].position, 40),
  ...generateCurvedPath(locationsData[2].position, locationsData[0].position, 40)
];

export default function Schedule() {
  const [truckState, setTruckState] = useState<{ position: [number, number], isMoving: boolean }>({ 
    position: locationsData[0].position, 
    isMoving: false 
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Initialiser la position
    setTruckState(calculateTruckPosition(new Date()));
    
    // Mettre à jour la position toutes les minutes
    const interval = setInterval(() => {
      setTruckState(calculateTruckPosition(new Date()));
    }, 60000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="schedule" className={`section ${styles.scheduleSection}`}>
      <div className="container">
        <div className={styles.header}>
          <h2 className="section-title">Où nous trouver ?</h2>
          <p className={styles.subtitle}>Suivez le camion à travers le Beaujolais tout au long de la semaine.</p>
        </div>
        
        <div className={styles.contentWrapper}>
          <div className={styles.mapContainer}>
            {mounted && <TourMap truckPosition={truckState.position} isMoving={truckState.isMoving} locations={locationsData} fullPath={fullCurvedPath} />}
          </div>

          <div className={styles.listContainer}>
            {locationsData.map((item) => (
              <div key={item.id} className={styles.card}>
                <div className={styles.dayBadge}>{item.day}</div>
                <div className={styles.details}>
                  <h4 className={styles.locationTitle}>{item.name}</h4>
                  <div className={styles.infoRow}>
                    <MapPin size={16} className={styles.icon} />
                    <span>{item.detail}</span>
                  </div>
                  <div className={styles.infoRow}>
                    <Clock size={16} className={styles.icon} />
                    <span>{item.time}</span>
                  </div>
                </div>
              </div>
            ))}
            <div className={styles.cardClosed}>
              Les autres jours : Fermé (Repos de la pâte & Préparations)
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
