import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ProcessTimeline({ playSound }) {
  const containerRef = useRef(null);
  const pathRef = useRef(null);
  const stepsRefs = useRef([]);
  const dotRefs = useRef([]);

  const steps = [
    {
      num: '01',
      title: 'Initial Consultation & Discovery',
      desc: 'We start by sitting down with you to thoroughly understand your business goals, target demographics, brand history, and potential opportunities.',
    },
    {
      num: '02',
      title: 'Strategy Development',
      desc: 'Our design and marketing experts assemble a highly customized multi-channel campaign blueprint backed by actual market data and SEO research.',
    },
    {
      num: '03',
      title: 'Implementation & Execution',
      desc: 'We craft and launch high-performance web assets, launch organic/paid campaigns, tune technical architectures, and configure key trackers.',
    },
    {
      num: '04',
      title: 'Monitoring & Optimization',
      desc: 'We consistently run audits, check conversions, A/B test ad campaigns, improve web speeds, and ensure budgets are targeted efficiently.',
    },
    {
      num: '05',
      title: 'Reporting & Feedback',
      desc: 'You receive transparent dashboards. We break down the real metrics — conversions, click-through rates, and exact returns on investment.',
    },
    {
      num: '06',
      title: 'Continuous Support & Innovation',
      desc: 'Digital landscapes shift constantly. We provide ongoing support, keeping your brand ahead of competitors with the latest marketing techs.',
    },
  ];

  useEffect(() => {
    const path = pathRef.current;
    const container = containerRef.current;
    if (!path || !container) return;

    // Get total path length
    const pathLength = path.getTotalLength();
    
    // Set dash settings to make the path initially fully hidden
    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    // Animate path drawing scroll trigger
    const pathAnim = gsap.to(path, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top 50%',
        end: 'bottom 70%',
        scrub: 0.5,
      },
    });

    // Highlight indicator dots as the scroll reaches them
    steps.forEach((_, idx) => {
      const dot = dotRefs.current[idx];
      const step = stepsRefs.current[idx];
      if (!dot || !step) return;

      ScrollTrigger.create({
        trigger: step,
        start: 'top 55%',
        end: 'bottom 55%',
        onEnter: () => {
          gsap.to(dot, { backgroundColor: '#D4AF37', scale: 1.3, duration: 0.3 });
          if (playSound) playSound('click');
        },
        onLeaveBack: () => {
          gsap.to(dot, { backgroundColor: 'rgba(15,23,42,0.1)', scale: 1.0, duration: 0.3 });
        },
      });
    });

    return () => {
      pathAnim.scrollTrigger?.kill();
      pathAnim.kill();
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger && st.trigger.id && st.trigger.id.startsWith('step-')) st.kill();
      });
    };
  }, [playSound]);

  const handleHover = () => {
    if (playSound) playSound('hover');
  };

  return (
    <section id="process" ref={containerRef} className="section" style={{ position: 'relative', overflow: 'visible' }}>
      
      {/* Title */}
      <div style={{ textAlign: 'center', marginBottom: '8rem' }}>
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
          Our Process
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ marginBottom: '1.2rem' }}
        >
          How We Work in Simple Steps
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ maxWidth: '600px', margin: '0 auto' }}
        >
          A methodical, transparent, and iterative approach tailored specifically to deliver optimal results.
        </motion.p>
      </div>

      {/* Timeline track container */}
      <div style={{ position: 'relative', maxWidth: '1000px', margin: '0 auto' }} className="timeline-wrapper">
        
        {/* SVG Drawing Line - Desktop (Centered) */}
        <div className="svg-line-desktop" style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: '4px',
          transform: 'translateX(-50%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}>
          {/* Background trace line */}
          <div style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: '1px',
            width: '2px',
            backgroundColor: 'rgba(15,23,42,0.04)',
          }} />
          
          <svg style={{ width: '100%', height: '100%', overflow: 'visible' }}>
            <line
              ref={pathRef}
              x1="2" y1="0" x2="2" y2="100%"
              style={{
                stroke: 'var(--accent)',
                strokeWidth: 3,
                strokeLinecap: 'round',
                filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.5))',
              }}
            />
          </svg>
        </div>

        {/* SVG Drawing Line - Mobile (Left) */}
        <div className="svg-line-mobile" style={{
          display: 'none',
          position: 'absolute',
          left: '20px',
          top: 0,
          bottom: 0,
          width: '4px',
          zIndex: 1,
          pointerEvents: 'none',
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: '1px',
            width: '2px',
            backgroundColor: 'rgba(15,23,42,0.04)',
          }} />
        </div>

        {/* Steps List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8rem', position: 'relative', zIndex: 2 }}>
          {steps.map((step, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={idx}
                ref={(el) => (stepsRefs.current[idx] = el)}
                id={`step-${idx}`}
                style={{
                  display: 'flex',
                  justifyContent: isEven ? 'flex-start' : 'flex-end',
                  alignItems: 'center',
                  width: '100%',
                  position: 'relative',
                }}
                className="step-row"
              >
                
                {/* Desktop Center Indicator Dot */}
                <div
                  ref={(el) => (dotRefs.current[idx] = el)}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(15,23,42,0.1)',
                    border: '3px solid var(--bg-primary)',
                    zIndex: 4,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    transition: 'background-color 0.3s ease, scale 0.3s ease',
                  }}
                  className="timeline-dot"
                />

                {/* Mobile Left Indicator Dot (Styled via media query fallback or inline dynamically handled below) */}

                {/* Step Card */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={handleHover}
                  className="glass-panel spotlight-card step-card-dark"
                  style={{
                    width: '44%',
                    padding: '2.5rem',
                    position: 'relative',
                    background: 'linear-gradient(135deg, #1b2751 0%, #243168 60%, #1e2d5a 100%)',
                    border: '1px solid rgba(255, 222, 66, 0.18)',
                    borderLeft: '5px solid #FFDE42',
                    boxShadow: '0 15px 45px rgba(27, 39, 81, 0.25), inset 0 1px 0 rgba(255, 222, 66, 0.08)',
                  }}
                >
                  {/* Subtle gold glow in corner */}
                  <div style={{
                    position: 'absolute',
                    top: '-20px',
                    right: '-20px',
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(255, 222, 66, 0.08) 0%, transparent 70%)',
                    pointerEvents: 'none',
                  }} />

                  {/* Step Number Tag */}
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '3rem',
                      fontWeight: 800,
                      color: 'rgba(255, 222, 66, 0.15)',
                      position: 'absolute',
                      top: '1.2rem',
                      right: '2rem',
                      lineHeight: 1,
                      pointerEvents: 'none',
                    }}
                  >
                    {step.num}
                  </div>

                  <h3
                    style={{
                      fontSize: '1.35rem',
                      fontWeight: 700,
                      marginBottom: '1rem',
                      maxWidth: '80%',
                      color: '#FFFFFF',
                    }}
                  >
                    {step.title}
                  </h3>
                  
                  <p style={{ fontSize: '0.98rem', color: '#CBD5E1', lineHeight: 1.6 }}>
                    {step.desc}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .step-card-dark:hover {
          box-shadow: 0 20px 60px rgba(27, 39, 81, 0.4), 0 0 30px rgba(255, 222, 66, 0.08) !important;
          border-color: rgba(255, 222, 66, 0.35) !important;
          transform: translateY(-4px);
        }
        @media (max-width: 900px) {
          .svg-line-desktop {
            display: none !important;
          }
          .svg-line-mobile {
            display: block !important;
          }
          .step-row {
            justify-content: flex-end !important;
            padding-left: 45px !important;
          }
          .timeline-dot {
            left: 20px !important;
            transform: translateX(-50%) !important;
          }
          .step-row .glass-panel {
            width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
