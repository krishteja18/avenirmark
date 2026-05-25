import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PartnerTabs({ playSound }) {
  const [activeTab, setActiveTab] = useState('mission');

  const tabData = {
    mission: {
      title: 'Our Mission',
      content: 'To empower your brand with smart, meaningful digital strategies that don’t just get clicks — they build connections. We’re here to make your growth journey easier, more impactful, and tailored to what matters most to you. Your success is our purpose.',
      highlight: 'Connecting brands to humans.',
    },
    vision: {
      title: 'Our Vision',
      content: 'We see a world where businesses of every size can grow with clarity, creativity, and confidence — without the guesswork. Our vision is to be the team you turn to when you want more than just results — when you want a real partner who listens, understands, and grows with you.',
      highlight: 'Clarity, creativity, confidence.',
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
            All-in-One Growth Solutions
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ lineHeight: 1.1 }}
          >
            Turning Visitors into Loyal Customers
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
            Think of us as <span style={{ color: 'var(--accent)' }}>your growth partner</span> — not just an agency.
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}
          >
            We’re here to walk with you through every step of your customer’s journey. From the first impression to lasting loyalty, we focus on what really works — data, creativity, and strategy — to help your brand truly connect and grow in a way that feels right and gets real results.
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
              background: 'radial-gradient(circle, rgba(140, 255, 0, 0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* Tab Switcher Headers */}
          <div
            style={{
              display: 'flex',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
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
                  color: activeTab === tab ? '#050505' : 'var(--text-secondary)',
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
                    color: 'rgba(255,255,255,0.4)',
                  }}
                >
                  {tabData[activeTab].highlight}
                </div>
                
                <p style={{ fontSize: '1.15rem', color: 'var(--text-primary)', lineHeight: 1.75 }}>
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
