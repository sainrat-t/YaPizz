-- Création de la table des pizzas
CREATE TABLE public.pizzas (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  ingredients text not null,
  price numeric(5,2) not null,
  base text check (base in ('tomate', 'creme')),
  is_monthly_special boolean default false,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Politiques RLS (Row Level Security)
ALTER TABLE public.pizzas ENABLE ROW LEVEL SECURITY;

-- Tout le monde peut voir les pizzas
CREATE POLICY "Public profiles are viewable by everyone."
  ON public.pizzas FOR SELECT
  USING ( true );

-- Seuls les utilisateurs authentifiés peuvent modifier
CREATE POLICY "Users can insert their own profile."
  ON public.pizzas FOR INSERT
  WITH CHECK ( auth.role() = 'authenticated' );

CREATE POLICY "Users can update own profile."
  ON public.pizzas FOR UPDATE
  USING ( auth.role() = 'authenticated' );

CREATE POLICY "Users can delete own profile."
  ON public.pizzas FOR DELETE
  USING ( auth.role() = 'authenticated' );
