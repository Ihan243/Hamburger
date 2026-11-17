import React from 'react';
import { CartProvider } from './context/CartContext';
import TopAnnouncement from './components/TopAnnouncement';
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
  return (
    <CartProvider>
      <div className="min-h-screen bg-brand-purpleDeep text-brand-cream selection:bg-brand-yellow selection:text-brand-purple flex flex-col font-sans">
        {/* Top Info Bar */}
        <TopAnnouncement />

        {/* Sticky Header with Navigation and Cart Trigger */}
        <Navbar />

        {/* Main Landing Page Flow */}
        <main className="flex-grow">
          {/* Hero Section with Massive Typography and Showcase */}
          <HeroSection />

          {/* Yellow Marquee Ticker */}
          <MarqueeBanner variant="yellow" />

          {/* About Section: Story, Identity & Values */}
          <AboutSection />

          {/* House Specialties Showcase (3 Circular Cards) */}
          <SpecialtiesSection />

          {/* Purple Accent Marquee Ticker */}
          <MarqueeBanner variant="purple" />

          {/* Full Interactive Menu with Search, Filters and Monumental Boat */}
          <MenuSection />

          {/* 4 Pillars: Why We Are Different */}
          <WhyDifferentSection />

          {/* Social Wall & Photography Gallery */}
          <GallerySection />

          {/* High Energy Delivery CTA */}
          <DeliveryCtaSection />

          {/* Location, Schedule & Contact Cards */}
          <ContactSection />
        </main>

        {/* Complete Footer */}
        <Footer />

        {/* Slide-over Shopping Cart Drawer */}
        <CartDrawer />

        {/* Hercules Interactive Mascot Assistant */}
        <HerculesModal />
      </div>
    </CartProvider>
  );
}
