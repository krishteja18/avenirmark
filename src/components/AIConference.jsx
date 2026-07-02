import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Users, BookOpen, Award, CheckCircle, HelpCircle, FileText, ArrowRight, Play, Check } from 'lucide-react';

export default function AIConference({ playSound }) {
  const [activeInfoTab, setActiveInfoTab] = useState('venue');
  const [abstractSubmitted, setAbstractSubmitted] = useState(false);
  const [abstractForm, setAbstractForm] = useState({
    name: '',
    email: '',
    title: '',
    session: 'deep-learning',
    abstract: ''
  });

  const handleHover = () => {
    if (playSound) playSound('hover');
  };

  const handleClick = () => {
    if (playSound) playSound('click');
  };

  const speakers = [
    {
      name: "Dr. Rajnish Khanna",
      title: "Senior AI Carnegie Scientist & Founder",
      affiliation: "i-Cultiver, Inc. & Stanford University",
      topic: "Neural Network Modeling in Plant Pathology & Crop Adaptability",
      initials: "RK",
      align: "left"
    },
    {
      name: "Dr. Jeremy Sweet",
      title: "Director of Computational Genomics",
      affiliation: "Sweet Environmental Consultants, UK",
      topic: "Algorithmic Genomic Mapping & Crop Biotech Forecasting",
      initials: "JS",
      align: "right"
    },
    {
      name: "Prof. Costantino Paciolla",
      title: "Head of Artificial Intelligence in Biology",
      affiliation: "University of Bari Aldo Moro, Italy",
      topic: "Predictive Bio-modeling & Photosynthesis Diagnostics via Deep Nets",
      initials: "CP",
      align: "left"
    },
    {
      name: "Dr. Jorge A. Zavala",
      title: "Lead Researcher in Agricultural Deep Learning",
      affiliation: "University of Buenos Aires, Argentina",
      topic: "Insect-Plant Evolutionary Defense Predictions using Generative AI",
      initials: "JZ",
      align: "right"
    },
    {
      name: "Dr. Usha R. Palaniswamy",
      title: "Professor of Bio-computational Science",
      affiliation: "University of Connecticut, USA",
      topic: "Computer Vision Systems for Crop Nutrition & Soil Chemistry Analysis",
      initials: "UP",
      align: "left"
    },
    {
      name: "Dr. Gulara Huseynzade",
      title: "Chair of Applied Data Science",
      affiliation: "Baku State University, Azerbaijan",
      topic: "Climate Resilience Predictive Algorithms and Soil Water Mapping",
      initials: "GH",
      align: "right"
    },
    {
      name: "Prof. Rachel Amir",
      title: "Head of Computational Biochemistry",
      affiliation: "Tel-Hai College, Israel",
      topic: "Metabolic Pathway Optimization via AI Synthesis Tools",
      initials: "RA",
      align: "left"
    },
    {
      name: "Dr. Marouane Ben Massoud",
      title: "Computational Biologist & Data Scientist",
      affiliation: "University of Dublin, Ireland",
      topic: "Systems Biology Simulation & Cell Stress Network Classifiers",
      initials: "MM",
      align: "right"
    }
  ];

  const sessions = [
    { id: 'deep-learning', title: "Deep Learning & Neural Architectures", desc: "Convolutional, recurrent, and transformer neural networks applied to genomic sequencing, protein folding, and complex biological state predictions." },
    { id: 'gen-ai', title: "Generative AI & LLMs in Sciences", desc: "Leveraging large language models and generative algorithms to parse massive volumes of scientific publications and synthesize metabolic hypotheses." },
    { id: 'computer-vision', title: "Computer Vision & Autonomous Systems", desc: "Real-time crop disease detection, phenotyping, and robotic automation using high-resolution spectral image classification and edge AI devices." },
    { id: 'bioinformatics', title: "Computational Bioinformatics & Systems Biology", desc: "Mapping cellular networks, modeling plant physiology, and predicting multi-omic system interactions through machine learning pipelines." },
    { id: 'climate', title: "AI-Driven Climate & Adaptation Models", desc: "Using historical weather data, satellite imagery, and crop yields to predict climate change impact and model evolutionary plant adaptation." },
    { id: 'precision-agri', title: "Precision Agronomy & Smart Agriculture", desc: "Sensor-fused soil diagnostics, predictive watering algorithms, and automated chemical sprays optimized via AI to increase yields." },
    { id: 'quantum', title: "Quantum Machine Learning", desc: "Exploring the horizon of quantum computing architectures for complex chemical molecular simulations and molecular breeding algorithms." },
    { id: 'ethics', title: "AI Governance, Safety & Open Science", desc: "Addressing data biases, ethical frameworks for synthetic biology, security protocols for custom bio-architectures, and open-source models." }
  ];

  const handleAbstractSubmit = (e) => {
    e.preventDefault();
    handleClick();
    setAbstractSubmitted(true);
    setTimeout(() => {
      setAbstractSubmitted(false);
      setAbstractForm({ name: '', email: '', title: '', session: 'deep-learning', abstract: '' });
    }, 4000);
  };

  return (
    <div style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh', paddingTop: '85px' }}>
      
      {/* Import script & cursive fonts to match mockup exactly */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Alex+Brush&family=Playfair+Display:ital,wght@1,700&display=swap');
        
        .script-font {
          font-family: 'Alex Brush', cursive !important;
        }
        .serif-italic {
          font-family: 'Playfair Display', serif !important;
          font-style: italic !important;
        }
        .heavy-italic {
          font-family: var(--font-display);
          font-style: italic;
          font-weight: 900;
        }
        .polaroid-container:hover .polaroid-sheet-1 {
          transform: rotate(-10deg) scale(1.05) !important;
        }
        .polaroid-container:hover .polaroid-sheet-2 {
          transform: rotate(8deg) scale(1.05) !important;
        }
        .polaroid-container:hover .polaroid-sheet-3 {
          transform: rotate(-5deg) scale(1.05) !important;
        }
        .polaroid-container:hover .polaroid-photo {
          transform: scale(1.03) !important;
          box-shadow: 0 10px 25px rgba(27,39,81,0.2) !important;
        }
        .abstract-input:focus, .abstract-textarea:focus {
          border-color: var(--accent) !important;
          box-shadow: 0 0 10px rgba(255, 222, 66, 0.25) !important;
        }
        @media (max-width: 640px) {
          .form-row-2 {
            grid-template-columns: 1fr !important;
            gap: 1.2rem !important;
          }
        }
      `}</style>

      {/* 1. HERO SECTION (Layout matching top of Valio Con mockup) */}
      <section style={{ 
        position: 'relative', 
        minHeight: '75vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(rgba(27, 39, 81, 0.65), rgba(27, 39, 81, 0.75)), url("/team_meeting.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden',
        color: '#FFFFFF',
        padding: '5rem 1.5rem',
        textAlign: 'center'
      }}>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '900px', margin: '0 auto' }}>
          <motion.h1
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, cubicBezier: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 8vw, 5.2rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              marginBottom: '1rem',
              letterSpacing: '-0.03em',
              color: '#FFFFFF',
              textTransform: 'uppercase'
            }}
          >
            GCAI CON 2026
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.95rem, 2.5vw, 1.3rem)',
              fontWeight: 700,
              color: 'var(--accent)',
              textTransform: 'uppercase',
              letterSpacing: '5px',
              maxWidth: '800px',
              margin: '0 auto 2.5rem auto'
            }}
          >
            Intelligence to Impact • Rome &amp; Online
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <a
              href="#registration"
              onClick={handleClick}
              onMouseEnter={handleHover}
              className="btn-premium"
              style={{ padding: '1rem 2.5rem', fontSize: '0.95rem', background: '#FFFFFF', color: '#1b2751', border: '1px solid #FFFFFF', fontWeight: 800 }}
            >
              REGISTER NOW
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. GLIMPSES OF GCAI SECTION (Video layout matching mockup) */}
      <section className="section" style={{ background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>
        
        {/* Giant Red/Gold Wavy Background SVG Line (from Valio Con mockup backdrop) */}
        <div style={{ 
          position: 'absolute', 
          top: '10%', 
          left: '50%', 
          transform: 'translateX(-50%)', 
          width: '90%', 
          maxWidth: '900px', 
          opacity: 0.08, 
          zIndex: 1, 
          pointerEvents: 'none' 
        }}>
          <svg viewBox="0 0 800 500" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50,250 C180,50 320,450 450,200 C580,-50 680,400 780,250" stroke="var(--accent)" strokeWidth="95" strokeLinecap="round" />
            <path d="M100,280 C220,100 340,480 470,230 C600,0 700,430 800,280" stroke="var(--text-primary)" strokeWidth="60" strokeLinecap="round" />
          </svg>
        </div>

        <div style={{ position: 'relative', zIndex: 2 }}>
          {/* Cursive script heading style matching Valio Con */}
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <h2 className="script-font" style={{ fontSize: 'clamp(3rem, 7vw, 4.8rem)', color: 'var(--text-primary)', margin: 0, fontWeight: 400, lineHeight: 0.9 }}>
              Glimpses of GCAI
            </h2>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-secondary)', display: 'block', marginTop: '0.5rem' }}>
              Relive Scientific Discoveries &amp; Panels
            </span>
          </div>

          {/* Staggered Video Mockup Layout (One large center-top, two smaller side-by-side below) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '850px', margin: '0 auto', padding: '0 1rem' }}>
            
            {/* Top Main Video Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ 
                position: 'relative', 
                width: '100%', 
                aspectRatio: '16/9', 
                borderRadius: '24px', 
                overflow: 'hidden', 
                boxShadow: '0 15px 35px rgba(27,39,81,0.1)',
                border: '1px solid var(--border)'
              }}
            >
              <img src="/hero-workspace.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Keynote Presentation" />
              <div style={{ 
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
                background: 'rgba(27, 39, 81, 0.45)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.3s' 
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(27, 39, 81, 0.35)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(27, 39, 81, 0.45)'}
              >
                <button 
                  onClick={handleClick}
                  onMouseEnter={handleHover}
                  style={{ 
                    width: '70px', height: '70px', borderRadius: '50%', 
                    background: '#FFFFFF', color: '#1b2751', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    border: 'none', boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
                    cursor: 'none', transition: 'transform 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <Play size={26} style={{ fill: '#1b2751', marginLeft: '5px' }} />
                </button>
              </div>
            </motion.div>

            {/* Bottom Row Two Video Frames */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }} className="form-row-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                style={{ 
                  position: 'relative', 
                  aspectRatio: '16/10', 
                  borderRadius: '20px', 
                  overflow: 'hidden', 
                  boxShadow: '0 10px 25px rgba(27,39,81,0.08)',
                  border: '1px solid var(--border)'
                }}
              >
                <img src="/team_meeting.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Interactive Workshop" />
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(27, 39, 81, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <button style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#FFFFFF', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'none' }}>
                    <Play size={18} style={{ fill: '#1b2751', marginLeft: '3px' }} />
                  </button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                style={{ 
                  position: 'relative', 
                  aspectRatio: '16/10', 
                  borderRadius: '20px', 
                  overflow: 'hidden', 
                  boxShadow: '0 10px 25px rgba(27,39,81,0.08)',
                  border: '1px solid var(--border)'
                }}
              >
                <img src="/saivaas.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Virtual Panel Sessions" />
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(27, 39, 81, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <button style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#FFFFFF', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'none' }}>
                    <Play size={18} style={{ fill: '#1b2751', marginLeft: '3px' }} />
                  </button>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. ABOUT SECTION (Valio Con layout: Large bold title + description + background waves) */}
      <section className="section" style={{ background: 'var(--bg-tertiary)', position: 'relative', overflow: 'hidden' }}>
        
        {/* Soft abstract shape overlay */}
        <div style={{
          position: 'absolute',
          top: '30%',
          right: '-5%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(255, 222, 66, 0.08) 0%, transparent 70%)',
          zIndex: 1,
          pointerEvents: 'none'
        }} />

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '3.5rem', 
          maxWidth: '1000px', 
          margin: '0 auto', 
          padding: '0 1.5rem',
          position: 'relative',
          zIndex: 2
        }}>
          {/* Left Block - Huge heavy italic font */}
          <div style={{ display: 'flex', flexDirection: 'column', justifycontent: 'center' }}>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="heavy-italic"
              style={{
                fontSize: 'clamp(2.5rem, 5.5vw, 4.4rem)',
                lineHeight: 1.05,
                color: 'var(--text-primary)',
                margin: 0,
                textTransform: 'uppercase',
                letterSpacing: '-0.04em'
              }}
            >
              GCAI Con <br />
              The Premium <br />
              Conference
            </motion.h2>
          </div>

          {/* Right Block - Description block and details */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1.2rem' }}>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}
            >
              The **11th Edition of Global Conference on Artificial Intelligence** (GCAI 2026) is the leading hybrid summit for deep learning, algorithmic automation, and data sciences. 
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}
            >
              Our Scientific Committee is committed to presenting field-ready research. By gathering geneticists, neural engineers, computer vision pioneers, and quantum analysts in Rome, we facilitate deep collaborative bridges across both fundamental scientific studies and commercial applications.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ marginTop: '0.5rem' }}
            >
              <a
                href="#scientific-sessions"
                className="btn-premium-outline"
                onMouseEnter={handleHover}
                onClick={handleClick}
                style={{ padding: '0.75rem 1.6rem', fontSize: '0.85rem', border: '1px solid var(--text-primary)' }}
              >
                View Scientific Tracks
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. VENUE / INFO CARD SECTION (Dark Green Card Layout, using AvenirMark Navy Blue) */}
      <section className="section" style={{ background: 'var(--bg-primary)' }}>
        <div style={{ maxWidth: '950px', margin: '0 auto', padding: '0 1rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              background: '#1b2751', 
              borderRadius: '24px',
              padding: '2.5rem',
              color: '#FFFFFF',
              boxShadow: '0 20px 40px rgba(27,39,81,0.12)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2.5rem',
              alignItems: 'center'
            }}
          >
            {/* Left Column: Welcome Banner / Ticket Mockup */}
            <div style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16/9',
              borderRadius: '16px',
              overflow: 'hidden',
              background: 'linear-gradient(rgba(27,39,81,0.5), rgba(27,39,81,0.85)), url("/hero-workspace.png")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '1.5rem',
              border: '2px solid rgba(255, 222, 66, 0.25)',
              textAlign: 'center',
              boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
            }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--accent)' }}>
                Venue &amp; Host
              </span>
              <h4 style={{ fontSize: '1.6rem', fontWeight: 900, margin: '0.4rem 0', fontFamily: 'var(--font-display)', color: '#FFFFFF', letterSpacing: '-0.5px' }}>
                WELCOME TO ROME
              </h4>
              <p style={{ fontSize: '0.75rem', color: '#E2E8F0', margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>
                NH Roma Villa Carpegna, Italy
              </p>
            </div>

            {/* Right Column: Info Details & Register Button */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem', justifyContent: 'center' }}>
              {/* Vertical Info Rows */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                  <Calendar size={18} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                  <div>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#94A3B8', fontWeight: 700 }}>Dates</span>
                    <p style={{ fontSize: '0.9rem', color: '#FFFFFF', margin: 0, fontWeight: 600 }}>September 14-16, 2026</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                  <MapPin size={18} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                  <div>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#94A3B8', fontWeight: 700 }}>Venue Location</span>
                    <p style={{ fontSize: '0.9rem', color: '#FFFFFF', margin: 0, fontWeight: 600 }}>Rome, Italy &amp; Online (Hybrid)</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                  <HelpCircle size={18} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                  <div>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#94A3B8', fontWeight: 700 }}>Scientific Committee</span>
                    <p style={{ fontSize: '0.9rem', color: '#FFFFFF', margin: 0, fontWeight: 600 }}>20+ Reviewers &amp; CPD Accredited</p>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                <a
                  href="#registration"
                  className="btn-premium"
                  onMouseEnter={handleHover}
                  onClick={handleClick}
                  style={{ width: '100%', justifyContent: 'center', padding: '0.9rem', fontSize: '0.9rem', boxShadow: 'var(--shadow-glow)' }}
                >
                  Register Now
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. SPEAKERS SECTION (Cursive script header + long column of polaroid cards) */}
      <section className="section" style={{ background: 'var(--bg-tertiary)' }}>
        
        {/* Section Heading styled exactly like Speakers mockup */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="script-font" style={{ fontSize: 'clamp(3.5rem, 8vw, 5.5rem)', color: 'var(--text-primary)', margin: 0, fontWeight: 400, lineHeight: 0.9 }}>
            Speakers
          </h2>
          <p style={{ maxWidth: '600px', margin: '0.5rem auto 0 auto', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Scientific Committee &amp; Keynote Lecturers at GCAI 2026 Hybrid Conference.
          </p>
        </div>

        {/* Stack of Polaroid-styled Speaker Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', maxWidth: '720px', margin: '0 auto', padding: '0 1rem' }}>
          {speakers.map((sp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              style={{
                display: 'flex',
                flexDirection: sp.align === 'left' ? 'row' : 'row-reverse',
                flexWrap: 'wrap',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '20px',
                padding: '1.8rem',
                boxShadow: 'var(--shadow-sm)',
                gap: '2rem',
                alignItems: 'center'
              }}
              className="polaroid-container"
            >
              {/* Polaroid Photo Wrapper (Layered sheets rotated offset) */}
              <div style={{ position: 'relative', width: '110px', height: '110px', flexShrink: 0, margin: '0 auto' }}>
                {/* Polaroid Layer 1 (Pink) */}
                <div 
                  className="polaroid-sheet-1"
                  style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    borderRadius: '14px', background: '#FF5B84',
                    transform: 'rotate(-6deg)', opacity: 0.65, zIndex: 1,
                    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)'
                  }} 
                />
                {/* Polaroid Layer 2 (Cyan) */}
                <div 
                  className="polaroid-sheet-2"
                  style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    borderRadius: '14px', background: '#53CBF3',
                    transform: 'rotate(5deg)', opacity: 0.65, zIndex: 1,
                    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)'
                  }} 
                />
                {/* Polaroid Layer 3 (Gold) */}
                <div 
                  className="polaroid-sheet-3"
                  style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    borderRadius: '14px', background: 'var(--accent)',
                    transform: 'rotate(-2deg)', opacity: 0.85, zIndex: 1,
                    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)'
                  }} 
                />

                {/* Photo Element */}
                <div 
                  className="polaroid-photo"
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    borderRadius: '14px',
                    background: 'linear-gradient(135deg, #1b2751, #0F172A)',
                    border: '3px solid #FFFFFF',
                    boxShadow: '0 4px 10px rgba(27,39,81,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2,
                    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)'
                  }}
                >
                  <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--font-display)' }}>
                    {sp.initials}
                  </span>
                </div>
              </div>

              {/* Speaker Description Info */}
              <div style={{ 
                flex: 1, 
                textAlign: sp.align === 'left' ? 'left' : 'right',
                minWidth: '240px'
              }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>
                  {sp.name}
                </h3>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginTop: '0.1rem' }}>
                  {sp.title}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginTop: '0.1rem', fontStyle: 'italic' }}>
                  {sp.affiliation}
                </span>
                
                <div style={{ marginTop: '0.8rem', paddingTop: '0.5rem', borderTop: '1px dashed var(--border)' }}>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-primary)', margin: 0, lineHeight: 1.4 }}>
                    <strong>Topic:</strong> {sp.topic}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. SCIENTIFIC TRACKS & SESSIONS GRID */}
      <section id="scientific-sessions" className="section" style={{ background: 'var(--bg-primary)' }}>
        <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
          <h2 className="script-font" style={{ fontSize: 'clamp(3rem, 7vw, 4.8rem)', color: 'var(--text-primary)', margin: 0, fontWeight: 400 }}>
            Scientific Tracks
          </h2>
          <p style={{ maxWidth: '600px', margin: '0.5rem auto 0 auto', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Presentations and abstracts are invited for the following research fields.
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '2rem', 
          maxWidth: '1000px', 
          margin: '0 auto', 
          padding: '0 1rem' 
        }}>
          {sessions.map((sess, idx) => (
            <motion.div
              key={sess.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                padding: '1.8rem',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              }}
            >
              <div style={{
                display: 'inline-flex',
                background: 'rgba(27, 39, 81, 0.05)',
                color: 'var(--text-primary)',
                padding: '0.4rem 0.8rem',
                borderRadius: '8px',
                fontSize: '0.75rem',
                fontWeight: 800,
                marginBottom: '1rem'
              }}>
                Track {idx + 1}
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem', lineHeight: 1.3 }}>
                {sess.title}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                {sess.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 7. ABSTRACT SUBMISSION SECTION (Form Card) */}
      <section id="abstract-submission" className="section" style={{ background: 'var(--bg-tertiary)' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: '0 1rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border)',
              borderRadius: '24px',
              padding: '2.5rem',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <h3 className="serif-italic" style={{ fontSize: '2.2rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                Submit Abstract
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>
                Share your research with the GCAI 2026 Committee.
              </p>
            </div>

            {abstractSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  textAlign: 'center',
                  padding: '3rem 1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1rem'
                }}
              >
                <div style={{
                  width: '60px', height: '60px',
                  borderRadius: '50%',
                  background: '#10B981',
                  color: '#FFFFFF',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(16,185,129,0.2)'
                }}>
                  <Check size={32} />
                </div>
                <h4 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0.5rem 0 0 0', color: 'var(--text-primary)' }}>
                  Abstract Submitted Successfully
                </h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '400px', margin: 0, lineHeight: 1.5 }}>
                  Thank you! An email confirmation has been sent. Your abstract ID has been cataloged for committee review.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleAbstractSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }} className="form-row-2">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.5px' }}>
                      Presenter Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Dr. Jane Doe"
                      value={abstractForm.name}
                      onChange={(e) => setAbstractForm({ ...abstractForm, name: e.target.value })}
                      onMouseEnter={handleHover}
                      style={{
                        padding: '0.8rem 1.2rem',
                        borderRadius: '12px',
                        border: '1px solid var(--border)',
                        background: 'var(--bg-primary)',
                        color: 'var(--text-primary)',
                        outline: 'none',
                        fontSize: '0.9rem',
                        transition: 'border-color 0.2s',
                        cursor: 'none'
                      }}
                      className="abstract-input"
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.5px' }}>
                      Contact Email *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="e.g. jane.doe@university.edu"
                      value={abstractForm.email}
                      onChange={(e) => setAbstractForm({ ...abstractForm, email: e.target.value })}
                      onMouseEnter={handleHover}
                      style={{
                        padding: '0.8rem 1.2rem',
                        borderRadius: '12px',
                        border: '1px solid var(--border)',
                        background: 'var(--bg-primary)',
                        color: 'var(--text-primary)',
                        outline: 'none',
                        fontSize: '0.9rem',
                        transition: 'border-color 0.2s',
                        cursor: 'none'
                      }}
                      className="abstract-input"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.2rem' }} className="form-row-2">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.5px' }}>
                      Presentation / Paper Title *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. CNN models for leaf disease detection"
                      value={abstractForm.title}
                      onChange={(e) => setAbstractForm({ ...abstractForm, title: e.target.value })}
                      onMouseEnter={handleHover}
                      style={{
                        padding: '0.8rem 1.2rem',
                        borderRadius: '12px',
                        border: '1px solid var(--border)',
                        background: 'var(--bg-primary)',
                        color: 'var(--text-primary)',
                        outline: 'none',
                        fontSize: '0.9rem',
                        transition: 'border-color 0.2s',
                        cursor: 'none'
                      }}
                      className="abstract-input"
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.5px' }}>
                      Target Session Track *
                    </label>
                    <select
                      value={abstractForm.session}
                      onChange={(e) => setAbstractForm({ ...abstractForm, session: e.target.value })}
                      onMouseEnter={handleHover}
                      style={{
                        padding: '0.8rem 1.2rem',
                        borderRadius: '12px',
                        border: '1px solid var(--border)',
                        background: 'var(--bg-primary)',
                        color: 'var(--text-primary)',
                        outline: 'none',
                        fontSize: '0.9rem',
                        height: '46px',
                        transition: 'border-color 0.2s',
                        cursor: 'none'
                      }}
                    >
                      {sessions.map((sess) => (
                        <option key={sess.id} value={sess.id}>
                          {sess.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', letterSpacing: '0.5px' }}>
                    Abstract Summary (Min 100 words - Max 350 words) *
                  </label>
                  <textarea
                    required
                    rows={6}
                    placeholder="Write or paste your abstract details here..."
                    value={abstractForm.abstract}
                    onChange={(e) => setAbstractForm({ ...abstractForm, abstract: e.target.value })}
                    onMouseEnter={handleHover}
                    style={{
                      padding: '0.9rem 1.2rem',
                      borderRadius: '12px',
                      border: '1px solid var(--border)',
                      background: 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                      outline: 'none',
                      fontSize: '0.9rem',
                      fontFamily: 'var(--font-body)',
                      lineHeight: 1.5,
                      resize: 'vertical',
                      transition: 'border-color 0.2s',
                      cursor: 'none'
                    }}
                    className="abstract-textarea"
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                  <button
                    type="submit"
                    onMouseEnter={handleHover}
                    className="btn-premium"
                    style={{ border: 'none', padding: '0.9rem 2.2rem', cursor: 'none' }}
                  >
                    Submit Abstract
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* 8. REGISTRATION SECTION */}
      <section id="registration" className="section" style={{ background: 'var(--bg-primary)' }}>
        <div style={{ maxWidth: '950px', margin: '0 auto', padding: '0 1rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{
              background: 'linear-gradient(135deg, #1b2751 0%, #0F172A 100%)',
              borderRadius: '24px',
              padding: '3rem 2.5rem',
              color: '#FFFFFF',
              boxShadow: '0 20px 45px rgba(27,39,81,0.2)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '2.5rem'
            }}
          >
            <div style={{ maxWidth: '550px' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--accent)' }}>
                Register Online
              </span>
              <h3 style={{ fontSize: '2rem', fontWeight: 800, color: '#FFFFFF', margin: '0.4rem 0 0.8rem 0', fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}>
                Join GCAI 2026 Conference
              </h3>
              <p style={{ fontSize: '0.95rem', color: '#CBD5E1', lineHeight: 1.6, margin: 0 }}>
                Reserve your slot for GCAI 2026. Register as an Oral Presenter, Poster Presenter, Delegate, or Virtual Attendee. Early bird discounts are available until June 30, 2026.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', width: '250px', flexShrink: 0 }}>
              <a
                href="https://wa.me/919966093777?text=Hi%20AvenirMark,%20I%20want%20to%20register%20for%20the%20GCAI%202026%20AI%20Conference."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium"
                onMouseEnter={handleHover}
                onClick={handleClick}
                style={{ justifyContent: 'center', padding: '0.95rem 1.8rem' }}
              >
                Inquire via WhatsApp
              </a>
              <a
                href="#contact"
                className="btn-premium-outline"
                onMouseEnter={handleHover}
                onClick={handleClick}
                style={{ justifyContent: 'center', padding: '0.95rem 1.8rem', border: '1px solid rgba(255,255,255,0.2)', color: '#FFFFFF' }}
              >
                Contact Organizers
              </a>
            </div>
          </motion.div>

          {/* Bottom Glimpses Row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.2rem', marginTop: '4rem', justifyContent: 'center' }}>
            <a
              href="/AvenirMark_Portfolio_Updated.pdf"
              download="AvenirMark_Portfolio.pdf"
              className="btn-premium-outline"
              onMouseEnter={handleHover}
              onClick={handleClick}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                fontSize: '0.85rem',
                padding: '0.65rem 1.5rem',
                borderRadius: '50px',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
                cursor: 'none'
              }}
            >
              <FileText size={15} /> Download Conference Brochure
            </a>
            <a
              href="#scientific-sessions"
              className="btn-premium-outline"
              onMouseEnter={handleHover}
              onClick={handleClick}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                fontSize: '0.85rem',
                padding: '0.65rem 1.5rem',
                borderRadius: '50px',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
                cursor: 'none'
              }}
            >
              <BookOpen size={15} /> View Scientific Program
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
