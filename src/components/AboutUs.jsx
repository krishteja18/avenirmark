import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Award, ShieldCheck, Sparkles, Target, ArrowUpRight, ShieldAlert } from 'lucide-react';

export default function AboutUs({ playSound }) {
  const handleHover = () => {
    if (playSound) playSound('hover');
  };

  const handleCTA = () => {
    if (playSound) playSound('click');
    window.location.hash = '#contact';
  };

  const hashtags = [
    'Digital marketing',
    'Online-advertising',
    'Social media marketing',
    'Search engine optimization',
    'Contentmarketing',
    'Emailmarketing',
    'Affiliate marketing',
    'Influencermarketing',
    'Pay-per-click',
    'Lead generation'
  ];

  const philosophy = [
    {
      icon: Target,
      title: 'Precision Strategy',
      desc: 'We don’t believe in guess-work. Every move we make is backed by market intelligence, semantic data, and deep behavioral psychology.',
      color: '#FFDE42'
    },
    {
      icon: ShieldCheck,
      title: 'Uncompromised Integrity',
      desc: 'Transparency is our cornerstone. We deliver clear, verifiable metrics, direct accountability, and compounding brand equity.',
      color: '#5478FF'
    },
    {
      icon: Sparkles,
      title: 'Elite Innovation',
      desc: 'From custom AI Voice Agents to stunning digital interfaces, we leverage bleeding-edge technology to give your brand a massive unfair advantage.',
      color: '#C084FC'
    }
  ];

  return (
    <div style={{ paddingTop: '8rem', minHeight: '100vh', background: 'var(--bg-primary)', position: 'relative', zIndex: 1 }}>
      
      {/* Premium ambient decorative glow */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          right: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 222, 66, 0.025)',
          filter: 'blur(120px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '-10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          backgroundColor: 'rgba(84, 120, 255, 0.02)',
          filter: 'blur(150px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="section" style={{ position: 'relative', zIndex: 2 }}>
        
        {/* Breadcrumb / Headline area */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              fontSize: '0.85rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '3px',
              color: 'var(--accent)',
              display: 'inline-block',
              marginBottom: '1rem',
            }}
          >
            Behind AvenirMark
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ 
              marginBottom: '1.8rem',
              fontSize: 'clamp(2.5rem, 5vw, 4.8rem)',
              lineHeight: 1.05,
              fontWeight: 800,
              letterSpacing: '-0.03em'
            }}
          >
            Architecting the Future <br />
            Of Digital Dominance.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.2rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}
          >
            AvenirMark India Pvt. Ltd. (AAA) is an elite, full-service digital advertising and marketing agency. We combine cutting-edge technology, brilliant strategy, and bold creative execution to design high-impact solutions that don’t just stand out — they command markets.
          </motion.p>
        </div>

        {/* Brand Philosophy Grid */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '2rem',
            marginBottom: '6rem'
          }}
        >
          {philosophy.map((item, index) => {
            const IconComp = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={handleHover}
                className="glass-panel"
                style={{
                  padding: '3rem 2.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem',
                  borderRadius: '24px',
                  borderTop: `3px solid ${item.color}`,
                  background: 'rgba(255, 255, 255, 0.88)',
                  boxShadow: '0 8px 40px rgba(27, 39, 81, 0.08)',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{
                  width: '55px',
                  height: '55px',
                  borderRadius: '16px',
                  background: `${item.color}15`,
                  color: item.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <IconComp size={26} />
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{item.title}</h3>
                <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{item.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Corporate Credentials Split screen */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 0.9fr',
            gap: '5rem',
            alignItems: 'center',
            marginBottom: '6rem'
          }}
          className="credentials-grid"
        >
          {/* Left Column: Bold narrative */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <motion.span
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{
                fontSize: '0.8rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '2px',
                color: 'var(--accent)'
              }}
            >
              Elite Corporate Profile
            </motion.span>
            
            <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.8rem)', lineHeight: 1.15 }}>
              AvenirMark India Pvt. Ltd. (AAA)
            </h2>
            
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1.1rem' }}>
              From search engine optimization that commands ranking authority, to custom pay-per-click engines and advanced lead generation, AvenirMark is the digital advertising agency built for premium scale.
            </p>
            
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '1.1rem' }}>
              Headquartered in Hyderabad's premier Banjara Hills district, our seasoned teams engineer digital dominance for leading brands across Asia and the globe.
            </p>
            
            <div style={{ marginTop: '1rem' }}>
              <button 
                onClick={handleCTA}
                onMouseEnter={handleHover}
                className="btn-premium"
                style={{ border: 'none' }}
              >
                Brief Our Strategy Team <ArrowUpRight size={18} />
              </button>
            </div>
          </div>

          {/* Right Column: Premium corporate glass panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-panel"
            style={{
              padding: '3.5rem 3rem',
              background: '#1b2751',
              border: '1px solid rgba(255, 222, 66, 0.15)',
              borderRadius: '28px',
              color: '#FFFFFF',
              boxShadow: '0 20px 60px rgba(27, 39, 81, 0.25)',
              display: 'flex',
              flexDirection: 'column',
              gap: '2.5rem'
            }}
          >
            <h3 style={{ color: '#FFFFFF', fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 800 }}>
              Official Agency Details
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* Address detail */}
              <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'start' }}>
                <div style={{ color: 'var(--accent)', background: 'rgba(255,222,66,0.06)', padding: '0.75rem', borderRadius: '50%', flexShrink: 0 }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#94A3B8', letterSpacing: '1px', display: 'block', marginBottom: '0.3rem' }}>
                    Corporate Headquarters
                  </span>
                  <p style={{ color: '#F1F5F9', fontSize: '1rem', fontWeight: 600, lineHeight: 1.5 }}>
                    AvenirMark India Pvt. Ltd. <br />
                    #A2, President Banjara Apartment,<br />
                    Road No. 2, Sagar Society, Banjara Hills,<br />
                    Hyderabad, Telangana 500034.
                  </p>
                </div>
              </div>

              {/* Phone detail */}
              <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'start' }}>
                <div style={{ color: 'var(--accent)', background: 'rgba(255,222,66,0.06)', padding: '0.75rem', borderRadius: '50%', flexShrink: 0 }}>
                  <Phone size={20} />
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#94A3B8', letterSpacing: '1px', display: 'block', marginBottom: '0.3rem' }}>
                    Direct Hotline
                  </span>
                  <a href="tel:+919966093777" style={{ color: '#FFDE42', fontSize: '1.15rem', fontWeight: 700, textDecoration: 'none', cursor: 'none' }} onMouseEnter={handleHover}>
                    +91 99660 93777
                  </a>
                </div>
              </div>

              {/* Email details */}
              <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'start' }}>
                <div style={{ color: 'var(--accent)', background: 'rgba(255,222,66,0.06)', padding: '0.75rem', borderRadius: '50%', flexShrink: 0 }}>
                  <Mail size={20} />
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#94A3B8', letterSpacing: '1px', display: 'block', marginBottom: '0.3rem' }}>
                    Corporate Communications
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <a href="mailto:info@avenirmark.com" style={{ color: '#F1F5F9', fontSize: '0.95rem', fontWeight: 600, textDecoration: 'none', cursor: 'none' }} onMouseEnter={handleHover}>
                      info@avenirmark.com
                    </a>
                    <a href="mailto:avenirmak.official@gmail.com" style={{ color: '#F1F5F9', fontSize: '0.95rem', fontWeight: 600, textDecoration: 'none', cursor: 'none' }} onMouseEnter={handleHover}>
                      avenirmak.official@gmail.com
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </div>

        {/* Dynamic Hashtag Directory */}
        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <motion.h3 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: '2rem', fontSize: '1.8rem', fontWeight: 800 }}
          >
            Core Areas of Global Expertise
          </motion.h3>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '1rem',
              maxWidth: '900px',
              margin: '0 auto'
            }}
          >
            {hashtags.map((tag, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onMouseEnter={handleHover}
                style={{
                  padding: '0.75rem 1.5rem',
                  background: 'rgba(255,255,255,0.85)',
                  border: '1px solid rgba(27,39,81,0.08)',
                  borderRadius: '50px',
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  boxShadow: '0 4px 15px rgba(27,39,81,0.02)',
                  cursor: 'none',
                  transition: 'all 0.3s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
                className="about-tag"
              >
                <span style={{ color: 'var(--accent)' }}>#</span>{tag}
              </motion.span>
            ))}
          </div>
        </div>

      </div>

      {/* Styled overrides for responsiveness */}
      <style>{`
        .about-tag:hover {
          background-color: var(--accent) !important;
          color: #050505 !important;
          border-color: var(--accent) !important;
          transform: translateY(-3px) scale(1.05);
          box-shadow: var(--shadow-glow) !important;
        }
        @media (max-width: 900px) {
          .credentials-grid {
            grid-template-columns: 1fr !important;
            gap: 3.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}
