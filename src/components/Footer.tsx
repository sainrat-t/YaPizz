import { Mail, Phone, MapPin } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.brand}>
          <h2 className={styles.logo}>Ya'Pizz</h2>
          <p className={styles.description}>
            La véritable pizza artisanale en camion, près de chez vous.
          </p>
        </div>

        <div className={styles.contact}>
          <h3 className={styles.title}>Contactez-nous</h3>
          <ul className={styles.contactList}>
            <li>
              <a href="tel:0624344061" className={styles.contactLink}>
                <Phone size={18} /> 06 24 34 40 61
              </a>
            </li>
            <li>
              <a href="mailto:yapizz.beaujo@gmail.com" className={styles.contactLink}>
                <Mail size={18} /> yapizz.beaujo@gmail.com
              </a>
            </li>
            <li>
              <span className={styles.contactText}>
                <MapPin size={18} /> Beaujolais et alentours
              </span>
            </li>
          </ul>
        </div>

        <div className={styles.social}>
          <h3 className={styles.title}>Suivez-nous</h3>
          <div className={styles.socialLinks}>
            <a href="https://www.facebook.com/yapizz.beaujo" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="https://www.instagram.com/ya_pizz" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Ya'Pizz. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
