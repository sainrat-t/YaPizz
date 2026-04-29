import { supabase } from '@/lib/supabase';
import { Leaf } from 'lucide-react';
import styles from './PizzaMenu.module.css';

// Type définition
export type Pizza = {
  id: string;
  name: string;
  ingredients: string;
  price: number;
  base: 'tomate' | 'creme' | 'extra';
  is_monthly_special: boolean;
  image_url?: string;
};

export default async function PizzaMenu() {
  // Mock data for design purposes
  const MOCK_PIZZAS: Pizza[] = [
    { id: '1', name: 'Margherita', ingredients: 'Tomate, Mozzarella, Origan, Olives', price: 10, base: 'tomate', is_monthly_special: false },
    { id: '2', name: 'Reine', ingredients: 'Tomate, Mozzarella, Jambon, Champignons frais', price: 11.5, base: 'tomate', is_monthly_special: false },
    { id: '3', name: 'Calzone', ingredients: 'Tomate, Mozzarella, Jambon, Oeuf', price: 12, base: 'tomate', is_monthly_special: false },
    { id: '4', name: 'Chèvre Miel', ingredients: 'Crème, Mozzarella, Chèvre, Miel, Noix', price: 13, base: 'creme', is_monthly_special: false },
    { id: '5', name: 'Savoyarde', ingredients: 'Crème, Mozzarella, Lardons, Reblochon, Pommes de terre, Oignons', price: 14, base: 'creme', is_monthly_special: false },
    { id: '6', name: 'La Truffière', ingredients: 'Crème à la truffe, Mozzarella, Champignons bruns, Roquette, Copeaux de Parmesan', price: 15.5, base: 'creme', is_monthly_special: true },
  ];

  let displayPizzas = MOCK_PIZZAS;

  if (supabase) {
    try {
      const { data: pizzas, error } = await supabase
        .from('pizzas')
        .select('*')
        .order('name');
      
      if (error) {
        console.error('Supabase fetch error, using mock data:', error);
      } else if (pizzas) {
        displayPizzas = pizzas;
      }
    } catch (e) {
      console.error('Supabase fetch failed, using mock data', e);
    }
  }

  const monthlySpecial = displayPizzas.find(p => p.is_monthly_special);
  const regularPizzas = displayPizzas.filter(p => !p.is_monthly_special);
  const baseTomate = regularPizzas.filter(p => p.base === 'tomate');
  const baseCreme = regularPizzas.filter(p => p.base === 'creme');
  const baseExtra = regularPizzas.filter(p => p.base === 'extra');

  const renderIngredients = (text: string) => {
    if (!text.includes('*')) return text;
    
    const parts = text.split('*');
    return (
      <>
        {parts.map((part, index) => (
          <span key={index}>
            {part}
            {index < parts.length - 1 && <Leaf size={14} className={styles.organicIconInline} />}
          </span>
        ))}
      </>
    );
  };

  return (
    <section id="menu" className={`section ${styles.menuSection}`}>
      <div className="container">
        {monthlySpecial && (
          <div className={styles.showcaseWrapper}>
            <div className={styles.showcaseContent}>
              <span className={styles.showcaseEyebrow}>La Pizza du Moment</span>
              <h3 className={styles.showcaseTitle}>{monthlySpecial.name}</h3>
              <p className={styles.showcaseDesc}>
                Notre création éphémère. Une recette inédite et savoureuse, imaginée avec les meilleurs produits de saison de notre terroir.
              </p>
              <div className={styles.showcaseIngredients}>
                {renderIngredients(monthlySpecial.ingredients)}
              </div>
              <div className={styles.showcaseFooter}>
                <span className={styles.showcasePrice}>{monthlySpecial.price.toFixed(2)} €</span>
                <span className={styles.showcaseBadge}>Édition Limitée</span>
              </div>
            </div>
            <div className={styles.showcaseVisual}>
              <div 
                className={styles.blob}
                style={monthlySpecial.image_url ? { backgroundImage: `url('${monthlySpecial.image_url}')` } : undefined}
              ></div>
            </div>
          </div>
        )}

        <div className={styles.menuHeader}>
          <h2 className="section-title">Notre Carte Classique</h2>
          <p className={styles.menuSubtitle}>Des pizzas généreuses, une pâte maturée et cuite au feu de bois.</p>
        </div>
        
        <div className={styles.basesContainer}>
          <div className={styles.baseColumn}>
            <div className={styles.baseTitleWrapper}>
              <h3 className={styles.baseTitle}>
                Base Tomate <Leaf size={24} className={styles.organicIcon} style={{ verticalAlign: 'baseline', marginLeft: '0.25rem' }} />
              </h3>
              <span className={styles.baseTitleDecoration}></span>
            </div>
            <ul className={styles.pizzaList}>
              {baseTomate.map((pizza) => (
                <li key={pizza.id} className={styles.pizzaItem}>
                  <div className={styles.pizzaHeader}>
                    <h4 className={styles.pizzaName}>{pizza.name}</h4>
                    <span className={styles.dots}></span>
                    <span className={styles.pizzaPrice}>{pizza.price.toFixed(2)} €</span>
                  </div>
                  <p className={styles.pizzaIngredients}>{renderIngredients(pizza.ingredients)}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.baseColumn}>
            <div className={styles.baseTitleWrapper}>
              <h3 className={styles.baseTitle}>
                Base Crème <Leaf size={24} className={styles.organicIcon} style={{ verticalAlign: 'baseline', marginLeft: '0.25rem' }} />
              </h3>
              <span className={styles.baseTitleDecoration}></span>
            </div>
            <ul className={styles.pizzaList}>
              {baseCreme.map((pizza) => (
                <li key={pizza.id} className={styles.pizzaItem}>
                  <div className={styles.pizzaHeader}>
                    <h4 className={styles.pizzaName}>{pizza.name}</h4>
                    <span className={styles.dots}></span>
                    <span className={styles.pizzaPrice}>{pizza.price.toFixed(2)} €</span>
                  </div>
                  <p className={styles.pizzaIngredients}>{renderIngredients(pizza.ingredients)}</p>
                </li>
              ))}
            </ul>
          </div>

          {baseExtra.length > 0 && (
            <div className={styles.baseColumn}>
              <div className={styles.baseTitleWrapper}>
                <h3 className={styles.baseTitle}>Les Extras</h3>
                <span className={styles.baseTitleDecoration}></span>
              </div>
              <ul className={styles.pizzaList}>
                {baseExtra.map((pizza) => (
                  <li key={pizza.id} className={styles.pizzaItem}>
                    <div className={styles.pizzaHeader}>
                      <h4 className={styles.pizzaName}>{pizza.name}</h4>
                      <span className={styles.dots}></span>
                      <span className={styles.pizzaPrice}>{pizza.price.toFixed(2)} €</span>
                    </div>
                    <p className={styles.pizzaIngredients}>{renderIngredients(pizza.ingredients)}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className={styles.legendContainer}>
          <div className={styles.organicLegend}>
            <Leaf size={16} className={styles.organicIcon} />
            <span>: issu de l'agriculture biologique</span>
          </div>
          <p className={styles.legendText}>Nous privilégions les produits locaux, bios et de terroir italien.</p>
          <p className={styles.legendText}>Tout supplément : 2,00€</p>
        </div>
      </div>
    </section>
  );
}
