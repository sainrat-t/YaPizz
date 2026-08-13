import NextImage from 'next/image';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.heroContainer}`}>
        <div className={styles.textContent}>
          <h1 className={styles.title}>
            Pizzas napolitaines <br />
            au feu de bois <br />
            <span className={styles.highlight}>de produits bios, locaux et de saison</span>
          </h1>
          <p className={styles.subtitle}>
            Ya'Pizz, c'est avant tout une aventure humaine. Sillonnant les vallons du Beaujolais, notre mission est de vous apporter des pizzas napolitaines cuites au feu de bois, élaborées avec des produits bios, locaux et de saison, là où vous vivez.
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
