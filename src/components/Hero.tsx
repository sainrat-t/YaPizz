import NextImage from 'next/image';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.heroContainer}`}>
        <div className={styles.textContent}>
          <h1 className={styles.title}>
            L'Authentique <br />
            <span className={styles.highlight}>Pizza Artisanale</span><br />
            à votre porte
          </h1>
          <p className={styles.subtitle}>
            Ya'Pizz, c'est avant tout une aventure humaine. Sillonnant les vallons du Beaujolais, notre mission est de vous apporter des pizzas napolitaines de produits bios, locaux et de saison, là où vous vivez.
          </p>
          <div className={styles.actions}>
            <a href="#menu" className={styles.primaryBtn}>Voir la Carte</a>
            <a href="#schedule" className={styles.secondaryBtn}>Où nous trouver ?</a>
          </div>
        </div>
        <div className={styles.imageContent}>
          <div className={styles.imageWrapper}>
            <NextImage 
              src="/images/hero-feu-de-bois.jpg" 
              alt="Pizza artisanale cuite au feu de bois Ya'Pizz" 
              fill
              className={styles.image}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
