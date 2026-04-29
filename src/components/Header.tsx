import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Menu, Phone, Users, PartyPopper } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <Link href="/" className={styles.logo}>
          <Image src="/images/logo1.png" alt="Ya'Pizz Logo" width={60} height={60} priority />
        </Link>
        <nav className={styles.nav}>
          <Link href="#menu" className={styles.navLink}>
            <Menu size={18} /> La Carte
          </Link>
          <Link href="#schedule" className={styles.navLink}>
            <MapPin size={18} /> Lieux
          </Link>
          <Link href="#team" className={styles.navLink}>
            <Users size={18} /> L'Équipe
          </Link>
          <Link href="#privatisation" className={styles.navLink}>
            <PartyPopper size={18} /> Privatisation
          </Link>
          <a href="tel:0624344061" className={styles.cta}>
            <Phone size={18} /> Commander
          </a>
        </nav>
      </div>
    </header>
  );
}
