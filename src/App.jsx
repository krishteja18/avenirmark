import { useEffect } from 'react';
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

export default function App() {
  // Buttery-smooth Lenis Scroll initialization
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo out smooth easing
      smooth: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {/* Premium custom mouse cursor */}
      <CustomCursor />

      {/* Floating glass header */}
      <Header />

      {/* Hero section */}
      <Hero />

      {/* Dynamic speed marquee strip */}
      <MarqueeStrip />

      {/* Services bento grid */}
      <Services />

      {/* Partner story split-screen tabs */}
      <PartnerTabs />

      {/* Process SVG drawing line timeline */}
      <ProcessTimeline />

      {/* Portfolio highlights gallery grid & lightbox */}
      <Portfolio />

      {/* Contact Banner & Brief builder form */}
      <ContactBanner />

      {/* Detailed Premium Footer */}
      <Footer />
    </>
  );
}
