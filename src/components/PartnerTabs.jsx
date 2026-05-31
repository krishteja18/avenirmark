import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PartnerTabs({ playSound }) {
  const [activeTab, setActiveTab] = useState('mission');

  const tabData = {
    mission: {
      title: 'Our Mission',
      content: 'To build digital brands that leave a mark — on markets, on culture, and on the people they serve. We exist to make strategy intelligent, creativity purposeful, and growth sustainable for ambitious brands who refuse to settle.',
      highlight: 'Growth that actually means something.',
    },
    vision: {
      title: 'Our Vision',
      content: 'A landscape where every ambitious brand — regardless of size — has access to world-class strategy, execution, and creativity. To be the agency that iconic brands credit when they talk about the turning point.',
      highlight: 'A world where great brands win.',
    },
  };

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    if (playSound) playSound('click');
  };

  const handleHover = () => {
    if (playSound) playSound('hover');
  };

  return (
    <section id="about" className="section" style={{ position: 'relative' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '5rem',
          alignItems: 'center',
        }}
        className="partner-grid"
      >
        {/* Left Side: Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
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
            }}
          >
            The Avenirmark Advantage
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ lineHeight: 1.1 }}
          >
            Built for Brands That Refuse to be Average
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              borderLeft: '3px solid var(--accent)',
              paddingLeft: '1.5rem',
              fontFamily: 'var(--font-display)',
              fontSize: '1.25rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
            }}
          >
            We’re not your vendor. We’re <span style={{ color: 'var(--accent)' }}>your competitive weapon.</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}
          >
            The best brands in the world don’t grow by accident. They grow through relentless strategy, ruthless creativity, and partnerships with people who care as much as they do. That’s exactly what we bring.
          </motion.p>
        </div>

        {/* Right Side: Interactive Tabs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="glass-panel"
          style={{
            padding: '3rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '2.5rem',
            position: 'relative',
            overflow: 'hidden',
            background: '#1b2751',
            border: '1px solid rgba(255, 222, 66, 0.15)',
            boxShadow: '0 20px 50px rgba(27, 39, 81, 0.25)',
          }}
        >
          {/* Subtle grid light overlay */}
          <div
            style={{
              position: 'absolute',
              top: '-10%',
              right: '-10%',
              width: '200px',
              height: '200px',
              background: 'radial-gradient(circle, rgba(255, 222, 66, 0.15) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* Tab Switcher Headers */}
          <div
            style={{
              display: 'flex',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '50px',
              padding: '0.4rem',
              position: 'relative',
              zIndex: 2,
            }}
          >
            {['mission', 'vision'].map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabSwitch(tab)}
                onMouseEnter={handleHover}
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  padding: '0.85rem 1.5rem',
                  borderRadius: '50px',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  color: activeTab === tab ? '#050505' : '#94A3B8',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  position: 'relative',
                  zIndex: 2,
                  transition: 'color 0.3s ease',
                }}
              >
                {tab === 'mission' ? 'Our Mission' : 'Our Vision'}

                {/* Animated Background Pill */}
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTabPill"
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 30,
                    }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'var(--accent)',
                      borderRadius: '50px',
                      zIndex: -1,
                      boxShadow: 'var(--shadow-glow)',
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Animated Tab Content wrapper */}
          <div style={{ minHeight: '180px', position: 'relative', zIndex: 2 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}
              >
                <div
                  style={{
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    color: 'var(--accent)',
                  }}
                >
                  {tabData[activeTab].highlight}
                </div>
                
                <p style={{ fontSize: '1.15rem', color: '#FFFFFF', lineHeight: 1.75 }}>
                  {tabData[activeTab].content}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .partner-grid {
            grid-template-columns: 1fr !important;
            gap: 4rem !important;
          }
        }
      `}</style>
    </section>
  );
}
