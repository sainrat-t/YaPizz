import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Team from '@/components/Team';
import Schedule from '@/components/Schedule';
import PizzaMenu from '@/components/PizzaMenu';
import Events from '@/components/Events';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PizzaMenu />
        <Schedule />
        <Team />
        <Events />
      </main>
      <Footer />
    </>
  );
}
