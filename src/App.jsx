import React, { Suspense, lazy } from 'react';
import { LanguageProvider } from './i18n/LanguageContext.jsx';
import { useCart } from './context/CartContext';
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

const DigitalCatalog = lazy(() => import('./components/DigitalCatalog'));

function CatalogLayer() {
  const { isCatalogOpen } = useCart();
  if (!isCatalogOpen) return null;
  return <Suspense fallback={<div className="dc-loading" role="status">Abriendo carta digital…</div>}>
    <DigitalCatalog />
  </Suspense>;
}

export default function App() {
  return (
    <LanguageProvider>
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
        <CatalogLayer />
      </div>
    </CartProvider>
    </LanguageProvider>
  );
}
