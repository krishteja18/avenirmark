import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import Hero from './components/Hero';
import MarqueeStrip from './components/MarqueeStrip';
import Services from './components/Services';
import PartnerTabs from './components/PartnerTabs';
import ProcessTimeline from './components/ProcessTimeline';
import Portfolio from './components/Portfolio';
import ContactBanner from './components/ContactBanner';
import Footer from './components/Footer';
import AboutUs from './components/AboutUs';
import Clients from './components/Clients';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState(window.location.hash === '#about-us' ? 'about-us' : 'home');

  // Listen to hash change for premium SPA routing
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#about-us') {
        setCurrentRoute('about-us');
        window.scrollTo({ top: 0, behavior: 'auto' });
      } else {
        setCurrentRoute('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Buttery-smooth Lenis Scroll initialization
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo out smooth easing
      smooth: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    window.lenis = lenis; // Expose globally to control from modals

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  // Smooth-scroll back to section if returning from another page
  useEffect(() => {
    if (currentRoute === 'home' && window.location.hash && window.location.hash !== '#about-us') {
      const id = window.location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 250); // slight delay to ensure home elements are fully rendered
    }
  }, [currentRoute]);

  return (
    <>
      {/* Premium custom mouse cursor */}
      <CustomCursor />

      {/* Floating glass header */}
      <Header />

      {currentRoute === 'about-us' ? (
        <AboutUs />
      ) : (
        <>
          {/* Hero section */}
          <Hero />

          {/* Dynamic speed marquee strip */}
          <MarqueeStrip />

          {/* Services bento grid */}
          <Services />

          {/* Elite client list */}
          <Clients />

          {/* Partner story split-screen tabs */}
          <PartnerTabs />

          {/* Process SVG drawing line timeline */}
          <ProcessTimeline />

          {/* Portfolio highlights gallery grid & lightbox */}
          <Portfolio />

          {/* Contact Banner & Brief builder form */}
          <ContactBanner />
        </>
      )}

      {/* Detailed Premium Footer */}
      <Footer />
    </>
  );
}
