import React from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import TopAnnouncement from './components/TopAnnouncement';
import HeroSection from './components/HeroSection';
import EditorialPointerGlow from './components/EditorialPointerGlow';
import ScrollReveal from './components/ScrollReveal';
import ScrollCinematics from './components/ScrollCinematics';
import MarqueeBanner from './components/MarqueeBanner';
import AboutSection from './components/AboutSection';
import SpecialtiesSection from './components/SpecialtiesSection';
import MenuSection from './components/MenuSection';
import WhyDifferentSection from './components/WhyDifferentSection';
import GallerySection from './components/GallerySection';
import DeliveryCtaSection from './components/DeliveryCtaSection';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import HerculesModal from './components/HerculesModal';

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-brand-purpleDeep text-brand-cream font-sans">
        <EditorialPointerGlow />
        <ScrollReveal />
        <ScrollCinematics />
        <TopAnnouncement />
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <SpecialtiesSection />
          <MenuSection />
          <MarqueeBanner />
          <WhyDifferentSection />
          <GallerySection />
          <DeliveryCtaSection />
        </main>
        <Footer />
        <CartDrawer />
        <HerculesModal />
      </div>
    </CartProvider>
  );
}
