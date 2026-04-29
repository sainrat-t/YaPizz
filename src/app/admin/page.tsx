'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Pizza } from '@/components/PizzaMenu';
import styles from './Admin.module.css';
import { ArrowLeft, Plus, Edit2, Trash2 } from 'lucide-react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [loading, setLoading] = useState(false);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPizza, setEditingPizza] = useState<Pizza | null>(null);
  const [formData, setFormData] = useState<Partial<Pizza>>({
    name: '',
    ingredients: '',
    price: 10,
    base: 'tomate',
    is_monthly_special: false,
    image_url: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple authentication for MVP (should be replaced with proper auth in production)
    if (password === 'yapizz2026') {
      setIsAuthenticated(true);
      fetchPizzas();
    } else {
      setError('Mot de passe incorrect');
    }
  };

  const MOCK_PIZZAS: Pizza[] = [
    { id: '1', name: 'Margherita', ingredients: 'Tomate, Mozzarella, Origan, Olives', price: 10, base: 'tomate', is_monthly_special: false },
    { id: '2', name: 'Reine', ingredients: 'Tomate, Mozzarella, Jambon, Champignons frais', price: 11.5, base: 'tomate', is_monthly_special: false },
    { id: '3', name: 'Calzone', ingredients: 'Tomate, Mozzarella, Jambon, Oeuf', price: 12, base: 'tomate', is_monthly_special: false },
    { id: '4', name: 'Chèvre Miel', ingredients: 'Crème, Mozzarella, Chèvre, Miel, Noix', price: 13, base: 'creme', is_monthly_special: false },
    { id: '5', name: 'Savoyarde', ingredients: 'Crème, Mozzarella, Lardons, Reblochon, Pommes de terre, Oignons', price: 14, base: 'creme', is_monthly_special: false },
    { id: '6', name: 'La Truffière', ingredients: 'Crème à la truffe, Mozzarella, Champignons bruns, Roquette, Copeaux de Parmesan', price: 15.5, base: 'creme', is_monthly_special: true },
  ];

  const fetchPizzas = async () => {
    setLoading(true);
    if (supabase) {
      try {
        const { data, error } = await supabase.from('pizzas').select('*').order('name');
        if (error) {
          console.error("Erreur de récupération Supabase, utilisation des fausses données:", error);
          setPizzas(MOCK_PIZZAS);
        } else {
          // data is an array, even if empty, we use it!
          setPizzas(data);
        }
      } catch (e) {
        console.error("Exception lors de la récupération:", e);
        setPizzas(MOCK_PIZZAS);
      }
    } else {
      setPizzas(MOCK_PIZZAS);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette pizza ?')) {
      if (supabase) {
        try {
          const { error } = await supabase.from('pizzas').delete().eq('id', id);
          if (error) {
            console.error('Delete error', error);
            alert("Erreur lors de la suppression. Avez-vous désactivé la sécurité RLS ?");
          } else {
            setPizzas(pizzas.filter(p => p.id !== id));
          }
        } catch (e) {
          console.error("Delete failed");
        }
      } else {
        setPizzas(pizzas.filter(p => p.id !== id));
      }
    }
  };

  const openModal = (pizza: Pizza | null = null) => {
    setImageFile(null);
    if (pizza) {
      setEditingPizza(pizza);
      setFormData(pizza);
    } else {
      setEditingPizza(null);
      setFormData({
        name: '',
        ingredients: '',
        price: 10,
        base: 'tomate',
        is_monthly_special: false,
        image_url: ''
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPizza(null);
    setImageFile(null);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) {
      alert("Mode Mockup : Connexion à Supabase requise pour sauvegarder.");
      closeModal();
      return;
    }

    // Validation basique
    if (!formData.name || !formData.ingredients || !formData.price) return;

    setUploadingImage(true);
    let uploadedImageUrl = formData.image_url;

    // Si on a sélectionné un fichier, on l'upload d'abord
    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from('pizzas')
        .upload(fileName, imageFile);

      if (uploadError) {
        console.error("Upload error:", uploadError);
        alert("Erreur lors de l'upload de l'image.");
        setUploadingImage(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from('pizzas')
        .getPublicUrl(fileName);
        
      uploadedImageUrl = publicUrlData.publicUrl;
    }

    const payload = {
      name: formData.name,
      ingredients: formData.ingredients,
      price: formData.price,
      base: formData.base,
      is_monthly_special: formData.is_monthly_special,
      image_url: uploadedImageUrl
    };

    if (editingPizza) {
      // UPDATE
      const { data, error } = await supabase
        .from('pizzas')
        .update(payload)
        .eq('id', editingPizza.id)
        .select();

      if (error) {
        console.error("Update error:", error);
        alert("Erreur lors de la modification. (RLS ?)");
      } else if (data) {
        setPizzas(pizzas.map(p => p.id === editingPizza.id ? data[0] : p));
        closeModal();
      }
    } else {
      // INSERT
      const { data, error } = await supabase
        .from('pizzas')
        .insert([payload])
        .select();

      if (error) {
        console.error("Insert error:", error);
        alert("Erreur lors de l'ajout. (Avez-vous bien désactivé le blocage RLS dans Supabase ?)");
      } else if (data) {
        setPizzas([...pizzas, data[0]]);
        closeModal();
      }
    }
    setUploadingImage(false);
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.loginContainer}>
        <div className={styles.loginBox}>
          <Link href="/" className={styles.backLink}><ArrowLeft size={16} /> Retour au site</Link>
          <h1 className={styles.loginTitle}>Accès Back-Office</h1>
          <form onSubmit={handleLogin} className={styles.loginForm}>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Mot de passe"
              className={styles.input}
              required
            />
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" className={styles.btn}>Connexion</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.dashboardHeader}>
        <div>
          <h1 className={styles.dashboardTitle}>Administration Ya'Pizz</h1>
          <p className={styles.dashboardSubtitle}>Gérez votre carte et la pizza du mois</p>
        </div>
        <div className={styles.headerActions}>
          <Link href="/" className={styles.backLink}><ArrowLeft size={16} /> Voir le site</Link>
          <button className={styles.btnPrimary} onClick={() => openModal()}><Plus size={16} /> Ajouter une Pizza</button>
        </div>
      </header>

      {loading ? (
        <p>Chargement des pizzas...</p>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Ingrédients</th>
                <th>Base</th>
                <th>Prix</th>
                <th>Pizza du mois</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pizzas.map((pizza) => (
                <tr key={pizza.id}>
                  <td><strong>{pizza.name}</strong></td>
                  <td>{pizza.ingredients}</td>
                  <td><span className={styles.badge}>{pizza.base}</span></td>
                  <td>{pizza.price.toFixed(2)} €</td>
                  <td>
                    {pizza.is_monthly_special ? (
                      <span className={styles.badgeSpecial}>Oui</span>
                    ) : (
                      <span className={styles.badgeNormal}>Non</span>
                    )}
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button className={styles.actionBtnEdit} title="Modifier" onClick={() => openModal(pizza)}><Edit2 size={16} /></button>
                      <button className={styles.actionBtnDelete} title="Supprimer" onClick={() => handleDelete(pizza.id)}><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {pizzas.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>
                    Aucune pizza trouvée. (Veuillez configurer Supabase)
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal d'ajout / modification */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2 className={styles.modalTitle}>{editingPizza ? 'Modifier la pizza' : 'Nouvelle pizza'}</h2>
            <form onSubmit={handleSave} className={styles.modalForm}>
              
              <div className={styles.formGroup}>
                <label>Nom de la pizza</label>
                <input 
                  type="text" 
                  value={formData.name || ''} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  required 
                />
              </div>

              <div className={styles.formGroup}>
                <label>Ingrédients</label>
                <textarea 
                  value={formData.ingredients || ''} 
                  onChange={(e) => setFormData({...formData, ingredients: e.target.value})} 
                  required 
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Prix (€)</label>
                  <input 
                    type="number" 
                    step="0.50"
                    value={formData.price || ''} 
                    onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})} 
                    required 
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Base</label>
                  <select 
                    value={formData.base || 'tomate'} 
                    onChange={(e) => setFormData({...formData, base: e.target.value as 'tomate'|'creme'|'extra'})}
                  >
                    <option value="tomate">Tomate</option>
                    <option value="creme">Crème</option>
                    <option value="extra">Extra</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroupCheckbox}>
                <label>
                  <input 
                    type="checkbox" 
                    checked={formData.is_monthly_special || false} 
                    onChange={(e) => setFormData({...formData, is_monthly_special: e.target.checked})} 
                  />
                  Pizza du Mois (Mise en avant sur le site)
                </label>
              </div>

              {formData.is_monthly_special && (
                <div className={styles.formGroupImage}>
                  <label>Photo de la Pizza du Mois</label>
                  {formData.image_url && !imageFile && (
                    <div style={{ marginBottom: '0.5rem' }}>
                      <img src={formData.image_url} alt="Aperçu" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
                    </div>
                  )}
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setImageFile(e.target.files[0]);
                      }
                    }} 
                  />
                  <small style={{ color: '#666', marginTop: '4px' }}>L'image remplacera l'image par défaut sur la page d'accueil.</small>
                </div>
              )}

              <div className={styles.modalActions}>
                <button type="button" onClick={closeModal} className={styles.btnSecondary} disabled={uploadingImage}>Annuler</button>
                <button type="submit" className={styles.btnPrimary} disabled={uploadingImage}>
                  {uploadingImage ? 'Enregistrement...' : 'Sauvegarder'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
