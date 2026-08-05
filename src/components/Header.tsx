'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Menu as MenuIcon, X, Phone, Users, PartyPopper, UtensilsCrossed } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.headerContainer}`}>
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          <Image src="/images/logo1.png" alt="Ya'Pizz Logo" width={52} height={52} priority />
        </Link>

        <nav className={`${styles.nav} ${isOpen ? styles.navOpen : ''}`}>
          <Link href="#menu" className={styles.navLink} onClick={closeMenu}>
            <UtensilsCrossed size={20} /> <span>La Carte</span>
          </Link>
          <Link href="#schedule" className={styles.navLink} onClick={closeMenu}>
            <MapPin size={20} /> <span>Lieux</span>
          </Link>
          <Link href="#team" className={styles.navLink} onClick={closeMenu}>
            <Users size={20} /> <span>L'Équipe</span>
          </Link>
          <Link href="#privatisation" className={styles.navLink} onClick={closeMenu}>
            <PartyPopper size={20} /> <span>Privatisation</span>
          </Link>
        </nav>

        <div className={styles.rightActions}>
          <a href="tel:0624344061" className={styles.cta} onClick={closeMenu}>
            <Phone size={18} /> <span>Commander</span>
          </a>

          <button 
            className={styles.menuToggle} 
            onClick={toggleMenu} 
            aria-label="Menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={26} /> : <MenuIcon size={26} />}
          </button>
        </div>
      </div>
    </header>
  );
}
