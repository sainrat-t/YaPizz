'use client';

import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Style d'animation globale injectée
const animationStyles = `
<style>
  @keyframes truckWobble {
    0% { transform: translate(-12px, -12px) rotate(-3deg); }
    50% { transform: translate(-12px, -14px) rotate(3deg); }
    100% { transform: translate(-12px, -12px) rotate(-3deg); }
  }
  .truck-marker {
    transition: transform 0.3s;
  }
  .truck-moving {
    animation: truckWobble 0.6s infinite ease-in-out;
  }
</style>
`;

// Configuration de l'icône de camion
const getTruckIcon = (isMoving: boolean) => new L.DivIcon({
  html: `${animationStyles}<div style="font-size: 24px; filter: drop-shadow(0px 2px 4px rgba(0,0,0,0.3)); transform: translate(-12px, -12px);" class="${isMoving ? 'truck-moving' : ''}">🚚</div>`,
  className: 'truck-marker-container',
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

// Icône par défaut pour Leaflet (correction du bug d'icône manquante)
const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = defaultIcon;

interface TourMapProps {
  truckPosition: [number, number];
  isMoving: boolean;
  locations: { id: string; name: string; position: [number, number] }[];
  fullPath?: [number, number][];
}

export default function TourMap({ truckPosition, isMoving, locations, fullPath }: TourMapProps) {
  // Coordonnées centrales entre les 3 villages
  const centerPosition: [number, number] = [45.89, 4.7];

  // Le tracé de la boucle par défaut si fullPath n'est pas fourni
  const polylinePositions = fullPath || [
    locations[0].position, // Mardi
    locations[1].position, // Jeudi
    locations[2].position, // Vendredi
    locations[0].position  // Retour à Mardi pour fermer la boucle
  ];

  return (
    <MapContainer 
      center={centerPosition} 
      zoom={12} 
      style={{ width: '100%', height: '100%', minHeight: '400px', borderRadius: 'var(--border-radius)', zIndex: 1 }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* Ligne en pointillés entre les emplacements */}
      <Polyline 
        positions={polylinePositions} 
        pathOptions={{ 
          color: 'var(--primary-color, #E63946)', 
          weight: 3, 
          dashArray: '10, 10', 
          opacity: 0.6 
        }} 
      />
      
      {locations.map((loc) => (
        <Marker key={loc.id} position={loc.position}>
          <Popup>{loc.name}</Popup>
        </Marker>
      ))}

      <Marker position={truckPosition} icon={getTruckIcon(isMoving)} zIndexOffset={1000} />
    </MapContainer>
  );
}
