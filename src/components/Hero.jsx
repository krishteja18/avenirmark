import { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Award } from 'lucide-react';
import gsap from 'gsap';

export default function Hero() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const imgWrapperRef = useRef(null);
  const imgRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // 3D Mouse Parallax Effect on Hero Image
    const handleMouseMove = (e) => {
      if (!imgWrapperRef.current || !imgRef.current) return;
      const rect = imgWrapperRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Subtle tilt and translate
      gsap.to(imgRef.current, {
        x: x * -0.05,
        y: y * -0.05,
        rotationY: x * 0.03,
        rotationX: y * -0.03,
        duration: 0.6,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      if (!imgRef.current) return;
      gsap.to(imgRef.current, {
        x: 0,
        y: 0,
        rotationY: 0,
        rotationX: 0,
        duration: 0.8,
        ease: 'power2.out',
      });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
    }

    // Magnetic Button Effect on CTA
    const handleCtaMove = (e) => {
      const btn = ctaRef.current;
      if (!btn) return;
      const rect = btn.getBoundingClientRect();
      const btnX = e.clientX - rect.left - rect.width / 2;
      const btnY = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: btnX * 0.35,
        y: btnY * 0.35,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleCtaLeave = () => {
      const btn = ctaRef.current;
      if (!btn) return;
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    const btn = ctaRef.current;
    if (btn) {
      btn.addEventListener('mousemove', handleCtaMove);
      btn.addEventListener('mouseleave', handleCtaLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
      if (btn) {
        btn.removeEventListener('mousemove', handleCtaMove);
        btn.removeEventListener('mouseleave', handleCtaLeave);
      }
    };
  }, []);

  const handleClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const typewriterWords = useMemo(() => [
    isMobile ? "Empires." : "Business Empires.",
    "Momentum.",
    "Champions.",
    "Kingdoms.",
    "Ecosystems.",
    "Legacies.",
    "Brand Equity.",
    "Brand Power.",
    "Sales Funnels.",
    "Industry Leaders."
  ], [isMobile]);

  // Reset typed text when word index or mobile mode changes
  useEffect(() => {
    setCurrentText("");
    setIsDeleting(false);
  }, [currentWordIdx, isMobile]);

  useEffect(() => {
    let timer;
    const fullWord = typewriterWords[currentWordIdx];

    const tick = () => {
      if (!isDeleting) {
        // Typing mode
        if (currentText === fullWord) {
          // Word fully typed: pause for 2.0s, then start deleting
          timer = setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
        // Add the next character
        setCurrentText(fullWord.slice(0, currentText.length + 1));
      } else {
        // Deleting mode
        if (currentText === "") {
          // Word fully deleted: shift to the next word index and start typing
          setIsDeleting(false);
          setCurrentWordIdx((prev) => (prev + 1) % typewriterWords.length);
          return;
        }
        // Remove the last character
        setCurrentText(fullWord.slice(0, currentText.length - 1));
      }
    };

    // Snappy typing pace (160ms) and steady backspacing pace (80ms)
    const currentSpeed = isDeleting ? 80 : 160;
    timer = setTimeout(tick, currentSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIdx, typewriterWords]);

  // Splitting static headline text into lines and words for stagger entry
  const line1Words = "We Don't Just Market Brands. We Build".split(" ");

  return (
    <section
      ref={containerRef}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '8rem 2rem 4rem 2rem',
        background: 'radial-gradient(circle at 10% 20%, rgba(255, 222, 66, 0.05) 0%, transparent 60%), radial-gradient(circle at 90% 80%, rgba(83, 203, 243, 0.06) 0%, transparent 50%)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Decorative grids */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'radial-gradient(rgba(15, 23, 42, 0.03) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: '1400px',
          width: '100%',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '4rem',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
        className="hero-grid"
      >
        {/* Left text column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Main Tagline with 3D Word Reveal */}
          <h1
            ref={titleRef}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.6rem, 5.2vw, 5rem)', // Slightly trimmed to guarantee perfect mobile fitting
              lineHeight: 1.15,
              fontWeight: 800,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.6rem',
              textAlign: 'left',
            }}
            className="hero-tagline-h1"
          >
            {/* Line 1: We Don't Just Market Brands. We Build */}
            <span style={{ display: 'inline-flex', flexWrap: 'wrap', columnGap: '0.8rem', rowGap: '0.4rem', justifyContent: 'inherit' }}>
              {line1Words.map((word, idx) => (
                <span
                  key={idx}
                  style={{
                    overflow: 'hidden',
                    display: 'inline-block',
                    verticalAlign: 'bottom',
                    paddingBottom: '0.1em',
                  }}
                >
                  <motion.span
                    initial={{ y: '105%' }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: 0.85,
                      ease: [0.16, 1, 0.3, 1],
                      delay: idx * 0.08,
                    }}
                    style={{ display: 'inline-block' }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </span>

            {/* Line 2: [Typewriter Word] */}
            <span style={{ display: 'inline-flex', flexWrap: 'wrap', columnGap: '0.8rem', rowGap: '0.4rem', alignItems: 'center', justifyContent: 'inherit' }}>
              {/* Dynamic Typewriter Word with Brand Accent Color */}
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  verticalAlign: 'bottom',
                  paddingBottom: '0.1em',
                  color: 'var(--accent)',
                  textAlign: 'left',
                }}
                className="typewriter-word-span"
              >
                <span style={{ position: 'relative', display: 'inline-block' }}>
                  {currentText}
                  <span className="typewriter-cursor">|</span>
                </span>
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{
              fontSize: '1.25rem',
              color: 'var(--text-secondary)',
              maxWidth: '600px',
              lineHeight: 1.6,
            }}
          >
Precision-engineered campaigns. Measurable outcomes. Brands that don't just compete — they lead.
          </motion.p>

          {/* Call to Actions & Experience Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2.5rem',
              flexWrap: 'wrap',
              marginTop: '1rem',
            }}
            className="hero-actions"
          >
            {/* Magnetic CTA wrapper */}
            <div style={{ display: 'inline-block' }}>
              <button
                ref={ctaRef}
                onClick={handleClick}
                className="btn-premium"
                style={{
                  outline: 'none',
                  border: 'none',
                  fontSize: '1.05rem',
                  padding: '1.1rem 2.5rem',
                  boxShadow: 'var(--shadow-glow)',
                }}
              >
                Book a Strategy Call <ArrowUpRight size={20} />
              </button>
            </div>

            {/* Experience Counter Card */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                background: 'linear-gradient(135deg, rgba(255, 222, 66, 0.05) 0%, rgba(255, 255, 255, 0.9) 100%)',
                border: '1px solid rgba(255, 222, 66, 0.2)',
                borderRadius: '16px',
                padding: '0.8rem 1.5rem',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 32px rgba(255, 222, 66, 0.06)',
                transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
              }}
              className="experience-badge"
            >
              <div
                style={{
                  background: 'rgba(84, 120, 255, 0.08)',
                  borderRadius: '50%',
                  width: '45px',
                  height: '45px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-cyan)',
                }}
              >
                <Award size={24} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.25rem', fontFamily: 'var(--font-display)' }}>10+ Years</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>of Market Dominance</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right visual column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          ref={imgWrapperRef}
          style={{
            position: 'relative',
            perspective: 1000,
            transformStyle: 'preserve-3d',
            display: 'flex',
            justifyContent: 'center',
          }}
          className="hero-image-container"
        >
          <div
            className="hero-image-wrapper"
            style={{
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg), 0 0 60px rgba(0,0,0,0.4)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              width: '100%',
              maxWidth: '600px',
              aspectRatio: '3/2',
            }}
          >
            <img
              ref={imgRef}
              src="/hero-workspace.jpg"
              alt="Avenirmark Premium Agency Workspace"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'right center',
                scale: 1.02, // Minimal scale for 3D tilts
              }}
            />

            {/* Glowing border outline */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(to bottom, transparent, rgba(5,5,5,0.7))',
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* Interactive floating card layer */}
          <motion.div
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              bottom: '10%',
              left: '-8%',
              background: '#1b2751',
              border: '1px solid rgba(255, 222, 66, 0.25)',
              backdropFilter: 'blur(15px)',
              WebkitBackdropFilter: 'blur(15px)',
              padding: '1.2rem 1.8rem',
              borderRadius: '20px',
              boxShadow: 'var(--shadow-md)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem',
              pointerEvents: 'none',
              zIndex: 3,
            }}
            className="floating-stats-card"
          >
            <span style={{ fontSize: '0.8rem', color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.85 }}>
              Avg. Organic Traffic Growth
            </span>
            <span style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-display)', color: '#FFFFFF' }}>
              +412%
            </span>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        .typewriter-cursor {
          display: inline-block;
          font-weight: 200;
          color: var(--accent);
          margin-left: 2px;
          animation: blink 0.8s infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        .experience-badge:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 40px rgba(255, 222, 66, 0.12) !important;
          border-color: var(--accent) !important;
        }
        @media (max-width: 1024px) {
          .hero-tagline-h1 {
            text-align: center !important;
            align-items: center !important;
          }
          .hero-tagline-h1 > span {
            justify-content: center !important;
          }
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 4rem !important;
            text-align: center;
          }
          .hero-actions {
            justify-content: center !important;
          }
          .hero-image-container {
            max-width: 600px;
            margin: 0 auto;
            flex-direction: column !important;
            align-items: center !important;
            gap: 1.5rem !important;
          }
          .hero-image-wrapper {
            aspect-ratio: auto !important;
            height: auto !important;
            width: 100% !important;
          }
          .hero-image-wrapper img {
            height: auto !important;
            object-fit: contain !important;
          }
          .floating-stats-card {
            position: relative !important;
            left: 0 !important;
            bottom: 0 !important;
            width: 100% !important;
            max-width: 600px !important;
            margin-top: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
