import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setIsMenuOpen(false);

    const element = document.getElementById(id);
    if (element) {
      // Offset for floating header
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 9999,
          padding: isScrolled ? '1rem 2rem' : '1.8rem 2rem',
          background: isScrolled ? 'rgba(5, 5, 5, 0.75)' : 'transparent',
          borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid transparent',
          backdropFilter: isScrolled ? 'blur(15px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(15px)' : 'none',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          transition: 'padding 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), background 0.4s ease, border-color 0.4s ease',
        }}
      >
        {/* Brand Logo */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.6rem',
            fontWeight: 800,
            color: 'var(--text-primary)',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            letterSpacing: '-0.04em',
          }}
        >
          Avenir<span style={{ color: 'var(--accent)' }}>mark</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2.5rem',
          }}
          className="desktop-nav"
        >
          {['services', 'about', 'process', 'portfolio'].map((section) => (
            <a
              key={section}
              href={`#${section}`}
              onClick={(e) => handleNavClick(e, section)}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                fontWeight: 500,
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                textTransform: 'capitalize',
                transition: 'color 0.3s ease',
                position: 'relative',
              }}
              className="nav-link"
            >
              {section}
              <span className="nav-line" />
            </a>
          ))}
        </nav>

        {/* Right CTA Button */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.2rem',
          }}
          className="desktop-nav-cta"
        >
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            className="btn-premium"
            style={{
              padding: '0.65rem 1.4rem',
              fontSize: '0.85rem',
            }}
          >
            Talk to Us <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div style={{ display: 'none' }} className="mobile-trigger-container">
          <button
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              zIndex: 10000,
            }}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Full screen Drawer Menu */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '100%',
          height: '100vh',
          background: 'rgba(5, 5, 5, 0.98)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          zIndex: 9998,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          transform: isMenuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.6s cubic-bezier(0.85, 0, 0.15, 1)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2.5rem',
            alignItems: 'center',
          }}
        >
          {['services', 'about', 'process', 'portfolio'].map((section, index) => (
            <a
              key={section}
              href={`#${section}`}
              onClick={(e) => handleNavClick(e, section)}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2.5rem',
                fontWeight: 800,
                color: 'var(--text-primary)',
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                transition: 'color 0.3s ease, transform 0.3s ease',
                transform: isMenuOpen ? 'translateY(0)' : 'translateY(40px)',
                opacity: isMenuOpen ? 1 : 0,
                transitionDelay: `${index * 0.1}s`,
              }}
              className="drawer-link"
            >
              {section}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            className="btn-premium"
            style={{
              marginTop: '1.5rem',
              fontSize: '1.1rem',
              padding: '1rem 2.5rem',
              transform: isMenuOpen ? 'translateY(0)' : 'translateY(40px)',
              opacity: isMenuOpen ? 1 : 0,
              transitionDelay: '0.4s',
            }}
          >
            Talk to Us Now <ArrowUpRight size={18} />
          </a>
        </div>
      </div>

      {/* Navigation specific stylesheet */}
      <style>{`
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 1px;
          bottom: -4px;
          left: 0;
          background-color: var(--accent);
          transition: width 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .nav-link:hover::after {
          width: 100%;
        }
        .nav-link:hover {
          color: var(--text-primary) !important;
        }
        
        .drawer-link:hover {
          color: var(--accent) !important;
          transform: scale(1.05);
        }

        @media (max-width: 900px) {
          .desktop-nav, .desktop-nav-cta {
            display: none !important;
          }
          .mobile-trigger-container {
            display: flex !important;
            align-items: center;
          }
        }
      `}</style>
    </>
  );
}
