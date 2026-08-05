import Image from 'next/image';
import styles from './Team.module.css';

export default function Team() {
  return (
    <section id="team" className={`section ${styles.teamSection}`}>
      <div className={`container ${styles.teamContainer}`}>
        <div className={styles.imageWrapper}>
          <Image 
            src="/images/pizzaiolas.jpg" 
            alt="Les pizzaiolas Ya'Pizz en pleine préparation" 
            fill 
            className={styles.image}
          />
        </div>
        <div className={styles.textContent}>
          <h2 className={styles.title}>Histoire de terroir</h2>
          <p className={styles.paragraph}>
            Nous cuisons toutes nos pizzas au feu de bois dans la pure tradition, en privilégiant systématiquement les produits locaux, bios et issus du terroir italien. Chaque ingrédient est sélectionné avec soin pour vous offrir un moment de partage authentique, en respectant les producteur.ices et en privilégiant les circuit courts.
          </p>
          <div className={styles.signatures}>
            <Image src="/images/logo1.png" alt="Sceau Ya'Pizz" width={80} height={80} className={styles.stamp} />
            <span className={styles.name}>L'équipe Ya'Pizz</span>
          </div>
        </div>
      </div>
    </section>
  );
}
