import { useState } from 'react';
import { Send, ArrowUp } from 'lucide-react';
import { navigateTo } from '../App';

export default function Footer({ playSound }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (playSound) playSound('click');
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 4000);
  };

  const handleHover = () => {
    if (playSound) playSound('hover');
  };

  const scrollToTop = () => {
    if (playSound) playSound('click');
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    if (playSound) playSound('click');

    if (id === 'about us') {
      navigateTo('/about-us');
      return;
    }

    if (id === 'blog') {
      navigateTo('/blogs');
      return;
    }

    const isHomePage = window.location.pathname === '/' || window.location.pathname === '';
    if (isHomePage) {
      const el = document.getElementById(id);
      if (el) {
        const offset = 80;
        const pos = el.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: pos, behavior: 'smooth' });
        window.history.pushState({}, '', '/#' + id);
      }
    } else {
      navigateTo('/#' + id);
    }
  };

  const socialLinks = [
    {
      label: 'Facebook',
      url: 'https://www.facebook.com/profile.php?id=61583614370070',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
        </svg>
      )
    },
    {
      label: 'Instagram',
      url: 'https://www.instagram.com/avenirmarkofficial/',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
        </svg>
      )
    },
    {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/company/109642779/admin/dashboard/',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
          <rect width="4" height="12" x="2" y="9"/>
          <circle cx="4" cy="4" r="2"/>
        </svg>
      )
    },
    {
      label: 'Pinterest',
      url: 'https://pin.it/3x96fA45C',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 22a9 9 0 0 1-1.91-5.15c.3-1.8 1.4-6.8 1.4-6.8s-.35-.7-.35-1.74c0-1.63.95-2.85 2.13-2.85 1 0 1.49.75 1.49 1.66 0 1.01-.64 2.53-.97 3.93-.28 1.18.59 2.14 1.75 2.14 2.1 0 3.72-2.22 3.72-5.42 0-2.83-2.04-4.81-4.94-4.81-3.37 0-5.35 2.53-5.35 5.14 0 1.02.39 2.11.88 2.7.1.11.11.21.08.33l-.33 1.34c-.05.21-.17.26-.39.16C3.96 15.63 3.5 13.56 3.5 11.23c0-3.66 2.66-7 7.67-7 4.02 0 7.15 2.87 7.15 6.7 0 4-2.52 7.22-6 7.22-1.17 0-2.27-.61-2.65-1.33l-.72 2.74c-.26 1-.97 2.25-1.45 3.03A9 9 0 0 0 8 22z" />
        </svg>
      )
    },
    {
      label: 'YouTube',
      url: 'https://www.youtube.com/@Avenirmark',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/>
          <polygon points="10 15 15 12 10 9"/>
        </svg>
      )
    }
  ];

  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border)',
        padding: '5rem 2rem 2.5rem 2rem',
        position: 'relative',
        zIndex: 5,
      }}
    >
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.4fr 0.8fr 1fr 0.8fr',
          gap: '4rem',
        }}
        className="footer-grid"
      >
        {/* Col 1: Pitch & Newsletter */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              if (window.location.hash === '#about-us') {
                window.location.hash = '';
              } else {
                scrollToTop();
              }
            }}
            onMouseEnter={handleHover}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              alignSelf: 'flex-start',
              textDecoration: 'none',
            }}
          >
            <img
              src="/logo.png"
              alt="Avenirmark Logo"
              style={{
                height: 'clamp(3.5rem, 9vw, 5.5rem)',
                width: 'auto',
                display: 'block',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            />
          </a>
          
          <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text-secondary)', maxWidth: '350px' }}>
            We engineer growth for ambitious brands — transforming digital presence into market dominance, one breakthrough campaign at a time.
          </p>

          {/* Newsletter Input */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', maxWidth: '350px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)' }}>
              Subscribe to Newsletter
            </span>
            {subscribed ? (
              <span style={{ color: 'var(--accent)', fontSize: '0.9rem', fontWeight: 700 }}>
                Successfully subscribed!
              </span>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '0.5rem', position: 'relative' }}>
                <input
                  required
                  type="email"
                  placeholder="Your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onMouseEnter={handleHover}
                  style={{
                    flex: 1,
                    background: 'var(--bg-primary)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    padding: '0.8rem 1.2rem',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    outline: 'none',
                    fontSize: '0.9rem',
                    cursor: 'none',
                    transition: 'all 0.3s ease',
                  }}
                  className="footer-input"
                />
                <button
                  type="submit"
                  onMouseEnter={handleHover}
                  style={{
                    background: 'var(--accent)',
                    border: 'none',
                    color: '#050505',
                    borderRadius: '8px',
                    width: '45px',
                    height: '45px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease',
                    boxShadow: 'var(--shadow-glow)',
                  }}
                >
                  <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Col 2: Navigation Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--text-primary)' }}>
            Quick Links
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {['services', 'about us', 'process', 'portfolio', 'blog', 'contact'].map((link) => (
              <li key={link}>
                <a
                  href={link === 'blog' ? '#blogs' : `#${link}`}
                  onClick={(e) => handleLinkClick(e, link)}
                  onMouseEnter={handleHover}
                  style={{
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    textTransform: 'capitalize',
                    fontSize: '0.95rem',
                    transition: 'color 0.3s ease',
                    display: 'inline-block',
                  }}
                  className="footer-link"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Detailed Services */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--text-primary)' }}>
            Services Offered
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {[
              'Search Engine Optimization',
              'Content Marketing',
              'Website Design & Dev',
              'App Development',
              'Brand Strategy',
              '360° Social Media Marketing',
              'AI Voice Agents',
              'Logo Design & Identity',
            ].map((srv) => (
              <li key={srv}>
                <a
                  href="#services"
                  onClick={(e) => handleLinkClick(e, 'services')}
                  onMouseEnter={handleHover}
                  style={{
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                    fontSize: '0.95rem',
                    transition: 'color 0.3s ease',
                    display: 'inline-block',
                  }}
                  className="footer-link"
                >
                  {srv}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Contact details & Socials */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--text-primary)' }}>
              Follow Us
            </h4>
            
            {/* Social Icons list */}
            <div style={{ display: 'flex', gap: '0.8rem', marginTop: '0.5rem' }}>
              {socialLinks.map((soc, idx) => {
                return (
                  <a
                    key={idx}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={handleHover}
                    aria-label={soc.label}
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      background: 'rgba(15, 23, 42, 0.03)',
                      border: '1px solid var(--border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-secondary)',
                      transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                      cursor: 'none',
                    }}
                    className="footer-soc-link"
                  >
                    {soc.icon}
                  </a>
                );
              })}
            </div>
          </div>

          {/* Back to top button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginTop: '0.5rem' }}>
            <button
              onClick={scrollToTop}
              onMouseEnter={handleHover}
              style={{
                width: '45px',
                height: '45px',
                borderRadius: '50%',
                background: 'rgba(15, 23, 42, 0.02)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
              }}
              className="back-to-top"
            >
              <ArrowUp size={18} />
            </button>
            <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)' }}>
              Back To Top
            </span>
          </div>

        </div>
      </div>

      {/* Credit & Bottom details */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '3rem auto 0 auto',
          paddingTop: '2rem',
          borderTop: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          © {new Date().getFullYear()} Avenirmark Agency. All rights reserved.
        </span>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', gap: '1.2rem' }}>
          <a href="/admin" onClick={(e) => { e.preventDefault(); navigateTo('/admin'); }} style={{ color: 'inherit', textDecoration: 'none', cursor: 'none' }} onMouseEnter={handleHover}>Admin Portal</a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none', cursor: 'none' }} onMouseEnter={handleHover}>Privacy Policy</a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none', cursor: 'none' }} onMouseEnter={handleHover}>Terms of Service</a>
        </span>
      </div>

      <style>{`
        .footer-link:hover {
          color: var(--accent) !important;
          transform: translateX(4px);
        }
        .footer-soc-link:hover {
          background-color: var(--accent) !important;
          color: #050505 !important;
          border-color: var(--accent) !important;
          transform: translateY(-3px);
          box-shadow: var(--shadow-glow);
        }
        .back-to-top:hover {
          background-color: var(--accent) !important;
          color: #050505 !important;
          border-color: var(--accent) !important;
          box-shadow: var(--shadow-glow);
        }
        .footer-input:focus {
          border-color: var(--accent) !important;
          background-color: var(--bg-primary) !important;
        }
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 3rem !important;
          }
        }
        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .back-to-top {
            width: 40px !important;
            height: 40px !important;
          }
        }
      `}</style>
    </footer>
  );
}
