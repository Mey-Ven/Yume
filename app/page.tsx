import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Menu from '@/components/Menu';
import Gallery from '@/components/Gallery';
import Reservation from '@/components/Reservation';
import Order from '@/components/Order';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import CursorAndProgress from '@/components/CursorAndProgress';

export default function Home() {
  return (
    <main className="relative">
      <CursorAndProgress />
      <Navigation />
      <Hero />
      <About />
      <Menu />
      <Gallery />
      <Reservation />
      <Order />
      <Contact />
      <Footer />
    </main>
  );
}
