import { useRef } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, BookOpen, Laptop, Brain, Share2, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';

export default function Services({ playSound }) {
  const services = [
    {
      id: 'seo',
      title: 'Search Engine Optimization',
      desc: 'Enhance your online visibility and drive organic traffic to your website with our expert SEO strategies. We focus on search algorithms, keywords, content tuning, and high-domain backlinks.',
      icon: TrendingUp,
      gridSpan: 'span 1',
      glowColor: 'var(--accent-glow)',
    },
    {
      id: 'content',
      title: 'Content Marketing',
      desc: 'Fuel your digital strategy with high-quality content that resonates with your audience and drives meaningful engagement. From copy to visuals, we create content assets that convert.',
      icon: BookOpen,
      gridSpan: 'span 1',
    },
    {
      id: 'web',
      title: 'Website Design',
      desc: 'Our design experts craft visually stunning, fully animated, and user-friendly websites optimized for performance and high conversion. We blend beauty with technical perfection.',
      icon: Laptop,
      gridSpan: 'span 1',
    },
    {
      id: 'brand',
      title: 'Brand Strategy',
      desc: 'Discover your unique market positioning. We conduct exhaustive brand audits, persona design, voice development, and competitive analysis to identify areas for explosive growth and expansion.',
      icon: Brain,
      gridSpan: 'span 2',
    },
    {
      id: 'social',
      title: 'Social Media Marketing',
      desc: 'Engage your audience, humanize your business, and build lasting brand loyalty with our modern social media management, creative ad targeting, and influencer solutions.',
      icon: Share2,
      gridSpan: 'span 1',
    },
  ];

  const cardRefs = useRef([]);

  const handleMouseMove = (e, index) => {
    const card = cardRefs.current[index];
    if (!card) return;
    
    // Set mouse custom properties for spotlight shader
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);

    // Subtle 3D Card Tilt Effect
    const tiltX = (y - rect.height / 2) / (rect.height / 2) * -8; // max 8deg tilt
    const tiltY = (x - rect.width / 2) / (rect.width / 2) * 8;

    gsap.to(card, {
      rotateX: tiltX,
      rotateY: tiltY,
      transformPerspective: 800,
      scale: 1.02,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = (index) => {
    const card = cardRefs.current[index];
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const handleHover = () => {
    if (playSound) playSound('hover');
  };

  const handleCTA = () => {
    if (playSound) playSound('click');
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="section" style={{ position: 'relative' }}>
      {/* Background glow shadow elements */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          right: '-10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          backgroundColor: 'rgba(140, 255, 0, 0.02)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          backgroundColor: 'rgba(0, 240, 255, 0.015)',
          filter: 'blur(120px)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          style={{
            fontSize: '0.85rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '3px',
            color: 'var(--accent)',
            display: 'inline-block',
            marginBottom: '0.8rem',
          }}
        >
          What We Offer
        </motion.span>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ marginBottom: '1.2rem' }}
        >
          Innovative Services for High-Growth Brands
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ maxWidth: '700px', margin: '0 auto' }}
        >
          We offer comprehensive digital growth solutions designed to capture attention, optimize search discovery, and drive measurable revenue.
        </motion.p>
      </div>

      {/* Bento Grid */}
      <div className="bento-grid" style={{ perspective: 1000 }}>
        {services.map((service, index) => {
          const IconComponent = service.icon;
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              ref={(el) => (cardRefs.current[index] = el)}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
              onMouseEnter={handleHover}
              className="spotlight-card"
              style={{
                gridColumn: service.gridSpan,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '2rem',
                transformStyle: 'preserve-3d',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {/* Custom glowing icon wrapper */}
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '16px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent)',
                    boxShadow: 'inset 0 0 10px rgba(140,255,0,0.05)',
                  }}
                >
                  <IconComponent size={28} />
                </div>
                
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-0.02em' }}>
                  {service.title}
                </h3>
                
                <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {service.desc}
                </p>
              </div>

              {/* Bottom detail action link */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  transition: 'color 0.3s ease',
                }}
                className="card-action"
              >
                Learn more
                <ArrowUpRight size={16} style={{ transition: 'transform 0.3s ease' }} className="card-arrow" />
              </div>
            </motion.div>
          );
        })}
      </div>

      <div style={{ textAlign: 'center', marginTop: '4rem' }}>
        <motion.button
          onClick={handleCTA}
          onMouseEnter={handleHover}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="btn-premium"
          style={{ border: 'none' }}
        >
          Need a Custom Plan? Contact Us Now <ArrowUpRight size={18} />
        </motion.button>
      </div>

      <style>{`
        .spotlight-card:hover .card-action {
          color: var(--accent) !important;
        }
        .spotlight-card:hover .card-arrow {
          transform: translate(3px, -3px);
        }
        @media (max-width: 1024px) {
          .spotlight-card {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </section>
  );
}
