import Image from 'next/link'; // Wait, Image is next/image
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
            Découvrez Ya'Pizz, votre pizzeria itinérante. Des ingrédients frais, une pâte maison, et un savoir-faire passionné, pour des pizzas qui ont le vrai goût de l'Italie.
          </p>
          <div className={styles.actions}>
            <a href="#menu" className={styles.primaryBtn}>Voir la Carte</a>
            <a href="#schedule" className={styles.secondaryBtn}>Où nous trouver ?</a>
          </div>
        </div>
        <div className={styles.imageContent}>
          <div className={styles.imageWrapper}>
            <NextImage 
              src="/images/image3.jpg" 
              alt="Pizza artisanale Ya'Pizz" 
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
