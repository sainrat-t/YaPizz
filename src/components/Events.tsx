import { PartyPopper, CalendarCheck, Users, Mail } from 'lucide-react';
import styles from './Events.module.css';

export default function Events() {
  return (
    <section id="privatisation" className={styles.eventsSection}>
      <div className="container">
        <div className={styles.contentWrapper}>
          <div className={styles.iconWrapper}>
            <PartyPopper size={40} />
          </div>
          
          <h2 className={styles.title}>Ya'Pizz s'invite à vos événements</h2>
          
          <p className={styles.description}>
            Envie de surprendre vos invités avec des pizzas napolitaines cuites au feu de bois ? 
            Il est possible de privatiser notre camion pour vos événements privés ou professionnels. 
            Nous nous déplaçons directement sur le lieu de votre choix pour régaler vos convives avec nos produits locaux et de terroir.
          </p>

          <div className={styles.featuresGrid}>
            <div className={styles.feature}>
              <CalendarCheck size={32} className={styles.featureIcon} />
              <span className={styles.featureText}>Anniversaires & Mariages</span>
            </div>
            <div className={styles.feature}>
              <Users size={32} className={styles.featureIcon} />
              <span className={styles.featureText}>Repas d'entreprise</span>
            </div>
            <div className={styles.feature}>
              <PartyPopper size={32} className={styles.featureIcon} />
              <span className={styles.featureText}>Fêtes de village</span>
            </div>
          </div>

          <a href="#footer" className={styles.ctaButton}>
            <Mail size={20} />
            Demander un devis
          </a>
        </div>
      </div>
    </section>
  );
}
