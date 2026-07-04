import { useState, useEffect } from 'react';
import Lenis from 'lenis';
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

// New blog components
import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetail';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import AIConference from './components/AIConference';
import Chatbot from './components/Chatbot';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState(() => {
    const hash = window.location.hash;
    if (hash === '#about-us') return { name: 'about-us' };
    if (hash === '#blogs') return { name: 'blogs' };
    if (hash.startsWith('#blog/')) {
      return { name: 'blog-detail', slug: hash.substring(6) };
    }
    if (hash === '#admin') return { name: 'admin' };
    if (hash === '#ai-conference') return { name: 'ai-conference' };
    return { name: 'home' };
  });

  const [adminAuth, setAdminAuth] = useState({ authenticated: false, csrfToken: '', username: '' });
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Check auth status on mount
  useEffect(() => {
    fetch('/api/check-auth.php')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          setAdminAuth({
            authenticated: true,
            csrfToken: data.csrfToken,
            username: data.username
          });
        }
        setCheckingAuth(false);
      })
      .catch((err) => {
        console.error('Error checking auth:', err);
        setCheckingAuth(false);
      });
  }, []);

  const handleLoginSuccess = (token, user) => {
    setAdminAuth({
      authenticated: true,
      csrfToken: token,
      username: user
    });
  };

  const handleLogout = () => {
    fetch('/api/logout.php')
      .then((res) => res.json())
      .then(() => {
        setAdminAuth({
          authenticated: false,
          csrfToken: '',
          username: ''
        });
        window.location.hash = '';
      })
      .catch((err) => {
        console.error('Logout error:', err);
        setAdminAuth({
          authenticated: false,
          csrfToken: '',
          username: ''
        });
        window.location.hash = '';
      });
  };

  // Listen to hash change for premium SPA routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#about-us') {
        setCurrentRoute({ name: 'about-us' });
        window.scrollTo({ top: 0, behavior: 'auto' });
      } else if (hash === '#blogs') {
        setCurrentRoute({ name: 'blogs' });
        window.scrollTo({ top: 0, behavior: 'auto' });
      } else if (hash.startsWith('#blog/')) {
        setCurrentRoute({ name: 'blog-detail', slug: hash.substring(6) });
        window.scrollTo({ top: 0, behavior: 'auto' });
      } else if (hash === '#admin') {
        setCurrentRoute({ name: 'admin' });
        window.scrollTo({ top: 0, behavior: 'auto' });
      } else if (hash === '#ai-conference') {
        setCurrentRoute({ name: 'ai-conference' });
        window.scrollTo({ top: 0, behavior: 'auto' });
      } else {
        setCurrentRoute({ name: 'home' });
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
    if (currentRoute.name === 'home' && window.location.hash && window.location.hash !== '#about-us') {
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

  // Toggle admin-mode class on body for cursor styling
  useEffect(() => {
    if (currentRoute.name === 'admin') {
      document.body.classList.add('admin-mode');
    } else {
      document.body.classList.remove('admin-mode');
    }
    return () => {
      document.body.classList.remove('admin-mode');
    };
  }, [currentRoute.name]);

  return (
    <>
      {/* Floating glass header (hide when on admin or conference for clean CMS/landing page experience) */}
      {currentRoute.name !== 'admin' && currentRoute.name !== 'ai-conference' && <Header />}

      {/* Floating Chatbot Assistant */}
      {currentRoute.name !== 'admin' && <Chatbot />}

      {currentRoute.name === 'about-us' && <AboutUs />}
      
      {currentRoute.name === 'blogs' && <BlogList />}
      
      {currentRoute.name === 'ai-conference' && <AIConference />}
      
      {currentRoute.name === 'blog-detail' && (
        <BlogDetail slug={currentRoute.slug} />
      )}
      
      {currentRoute.name === 'admin' && (
        checkingAuth ? (
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#1b2751', color: '#FFFFFF' }}>
            <div className="spinner" style={{
              width: '40px', height: '40px',
              border: '3px solid rgba(255,255,255,0.1)',
              borderTop: '3px solid var(--accent)',
              borderRadius: '50%',
              margin: '0 auto 1.5rem auto',
              animation: 'spin 1s linear infinite'
            }} />
            <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>Verifying session security...</p>
          </div>
        ) : adminAuth.authenticated ? (
          <AdminDashboard 
            csrfToken={adminAuth.csrfToken} 
            username={adminAuth.username} 
            onLogout={handleLogout} 
          />
        ) : (
          <AdminLogin onLoginSuccess={handleLoginSuccess} />
        )
      )}

      {currentRoute.name === 'home' && (
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

      {/* Detailed Premium Footer (hide when on admin or conference) */}
      {currentRoute.name !== 'admin' && currentRoute.name !== 'ai-conference' && <Footer />}

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
