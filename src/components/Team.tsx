import Image from 'next/image';
import styles from './Team.module.css';

export default function Team() {
  return (
    <section id="team" className={`section ${styles.teamSection}`}>
      <div className={`container ${styles.teamContainer}`}>
        <div className={styles.imageWrapper}>
          <Image 
            src="/images/image4.jpg" 
            alt="L'équipe Ya'Pizz en pleine action" 
            fill 
            className={styles.image}
          />
        </div>
        <div className={styles.textContent}>
          <h2 className={styles.title}>Une histoire de terroir et de passion</h2>
          <p className={styles.paragraph}>
            Ya'Pizz, c'est avant tout une aventure humaine. Sillonnant les vallons du Beaujolais, notre pizzeria itinérante a une mission simple : vous apporter une véritable pizza napolitaine, là où vous vivez.
          </p>
          <p className={styles.paragraph}>
            Nous cuisons toutes nos pizzas au feu de bois dans la pure tradition, en privilégiant systématiquement les produits locaux, bios et issus du terroir de notre belle région. Chaque ingrédient est sélectionné avec soin pour vous offrir un moment de partage authentique et chaleureux.
          </p>
          <div className={styles.signatures}>
            <Image src="/images/logo2.png" alt="Sceau Ya'Pizz" width={80} height={80} className={styles.stamp} />
            <span className={styles.name}>L'équipe Ya'Pizz</span>
          </div>
        </div>
      </div>
    </section>
  );
}
