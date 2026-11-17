
import React from 'react';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import MarqueeBanner from './components/MarqueeBanner';
import AboutSection from './components/AboutSection';
import SpecialtiesSection from './components/SpecialtiesSection';
import MenuSection from './components/MenuSection';
import WhyDifferentSection from './components/WhyDifferentSection';
import GallerySection from './components/GallerySection';
import DeliveryCtaSection from './components/DeliveryCtaSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import HerculesModal from './components/HerculesModal';
export default function App() {
 return <CartProvider>
   <div className="min-h-screen bg-brand-purpleDeep text-brand-cream font-sans">
    <Navbar />
    <main>
     <HeroSection />
     <AboutSection />
     <SpecialtiesSection />
     <MarqueeBanner variant="yellow" />
     <MenuSection />
     <WhyDifferentSection />
     <GallerySection />
     <div id="delivery"><DeliveryCtaSection /></div>
     <ContactSection />
    </main>
    <Footer /><CartDrawer /><HerculesModal />
   </div>
 </CartProvider>;
}
