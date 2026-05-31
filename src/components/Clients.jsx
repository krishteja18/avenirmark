import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Award, ShieldCheck, Sparkles } from 'lucide-react';
import gsap from 'gsap';

function Counter({ value, duration = 2.0, prefix = "", suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = parseInt(value, 10);
    if (isNaN(end) || start === end) return;

    let totalMiliseconds = duration * 1000;
    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressRatio = Math.min(progress / totalMiliseconds, 1);
      
      const easeOutQuad = (t) => t * (2 - t);
      const currentCount = Math.floor(easeOutQuad(progressRatio) * (end - start) + start);
      
      setCount(currentCount);

      if (progress < totalMiliseconds) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

export default function Clients({ playSound }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Set custom tracking properties
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);

    // Subtle 3D Card Tilt Effect
    const tiltX = (y - rect.height / 2) / (rect.height / 2) * -4; // max 4deg tilt for large card
    const tiltY = (x - rect.width / 2) / (rect.width / 2) * 4;

    gsap.to(card, {
      rotateX: tiltX,
      rotateY: tiltY,
      transformPerspective: 1000,
      scale: 1.01,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
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

  return (
    <section id="clients" className="section" style={{ position: 'relative', paddingBottom: '6rem' }}>
      
      {/* Dynamic background ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 222, 66, 0.02)',
          filter: 'blur(130px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Header section */}
      <div style={{ textAlign: 'center', marginBottom: '4rem', position: 'relative', zIndex: 1 }}>
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
          Our Track Record
        </motion.span>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ marginBottom: '1.2rem', fontSize: 'clamp(2rem, 3.5vw, 3.2rem)' }}
        >
          Trusted by Market Leaders.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.05rem', color: 'var(--text-secondary)' }}
        >
          We've engineered growth and digital dominance for leading brands across tech, real estate, hospitality, luxury, and consumer markets.
        </motion.p>
      </div>

      {/* Premium Framed Image Block */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ position: 'relative', zIndex: 2, perspective: 1000 }}
      >
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleHover}
          style={{
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderTop: '3px solid var(--accent)',
            borderRight: '1px solid rgba(230, 230, 240, 0.9)',
            borderBottom: '1px solid rgba(230, 230, 240, 0.9)',
            borderLeft: '1px solid rgba(230, 230, 240, 0.9)',
            borderRadius: '32px',
            padding: '2.5rem',
            boxShadow: '0 20px 50px rgba(27, 39, 81, 0.08), 0 2px 10px rgba(27, 39, 81, 0.03)',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            transformStyle: 'preserve-3d',
            transition: 'box-shadow 0.3s ease, border-color 0.3s ease'
          }}
          className="clients-sheet-card"
        >
          {/* Top Panel Info */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
              <div style={{ background: 'rgba(255, 222, 66, 0.1)', color: 'var(--accent)', padding: '0.6rem', borderRadius: '12px' }}>
                <ShieldCheck size={22} />
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.5px', display: 'block' }}>
                  Verified Engagements
                </span>
                <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Active Portfolio Companies
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent)' }} /> Real Estate & Tech
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-cyan)' }} /> Luxury Hospitality
              </div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--accent-purple)' }} /> Retail & Wellness
              </div>
            </div>
          </div>

          {/* Actual brand sheet image wrapper */}
          <div 
            className="clients-image-wrapper"
            style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              overflow: 'hidden',
              padding: '1.5rem',
              border: '1px solid rgba(27, 39, 81, 0.05)',
              boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.02)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <img
              src="/clients_sheet.png"
              alt="Avenirmark Official Client Roster"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                objectFit: 'contain',
                maxHeight: '520px',
                borderRadius: '12px'
              }}
            />
          </div>

          {/* Bottom stats callouts */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            borderTop: '1px solid rgba(27, 39, 81, 0.06)',
            paddingTop: '2rem'
          }}>
             <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', display: 'block' }}>
                <Counter value={25} suffix="+" />
              </span>
              <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Brands Transformed</span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', display: 'block' }}>
                <Counter value={12} prefix="₹" suffix="Cr+" />
              </span>
              <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Advertising Spends Handled</span>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', display: 'block' }}>
                <Counter value={10} suffix="x" />
              </span>
              <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Average ROI Scaled</span>
            </div>
          </div>

        </div>
      </motion.div>

      <style>{`
        .clients-sheet-card:hover {
          border-color: var(--accent) !important;
          box-shadow: 0 30px 70px rgba(27, 39, 81, 0.12) !important;
        }
        @media (max-width: 640px) {
          .clients-sheet-card {
            padding: 1.2rem 0.6rem !important;
            border-radius: 20px !important;
            gap: 1.2rem !important;
          }
          .clients-image-wrapper {
            padding: 0.3rem !important;
            border-radius: 12px !important;
          }
        }
      `}</style>
    </section>
  );
}
