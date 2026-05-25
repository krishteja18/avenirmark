import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MarqueeStrip() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const textElement = textRef.current;
    if (!container || !textElement) return;

    // Gentle cruising animation
    let baseSpeed = 1.0; 
    let currentX = 0;
    
    // We clone elements inside to make an infinite seamless loop
    const originalContent = textElement.innerHTML;
    // Triple it just to be fully safe for wide monitors
    textElement.innerHTML = originalContent + originalContent + originalContent;

    const items = textElement.children;
    const totalWidth = Array.from(items).slice(0, items.length / 3).reduce((acc, el) => acc + el.offsetWidth, 0);

    const animateMarquee = () => {
      currentX -= baseSpeed;
      // Loop back smoothly once we reach the total single copy width
      if (Math.abs(currentX) >= totalWidth) {
        currentX = 0;
      }
      gsap.set(textElement, { x: currentX });
    };

    const animTicker = gsap.ticker.add(animateMarquee);

    // Dynamic skew & speed linking via ScrollTrigger
    let proxy = { skew: 0 };
    let skewSetter = gsap.quickSetter(container, "skewX", "deg"); // fast setter
    let clamp = gsap.utils.clamp(-12, 12); // limit max skew to 12 degrees

    const scrollTriggerInstance = ScrollTrigger.create({
      onUpdate: (self) => {
        // self.getVelocity() returns the current scroll pixels-per-second
        const velocity = self.getVelocity();
        const skewAmount = clamp(velocity / -150);
        
        // Speed up the marquee based on scroll velocity
        baseSpeed = 1.0 + Math.abs(velocity / 400);

        // Animate skew to matching value
        gsap.to(proxy, {
          skew: skewAmount,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
          onUpdate: () => skewSetter(proxy.skew)
        });
      }
    });

    // Reset skew and return speed to base when scroll stops
    const handleScrollEnd = () => {
      gsap.to(proxy, {
        skew: 0,
        duration: 0.6,
        ease: "power3.out",
        overwrite: "auto",
        onUpdate: () => skewSetter(0)
      });
      gsap.to({ val: baseSpeed }, {
        val: 1.0,
        duration: 0.8,
        ease: "power2.out",
        onUpdate: function() { baseSpeed = this.targets()[0].val; }
      });
    };

    window.addEventListener('scrollend', handleScrollEnd);
    // Fallback debounced scroll listener for browsers that don't support scrollend fully yet
    let scrollTimeout;
    const scrollFallback = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScrollEnd, 150);
    };
    window.addEventListener('scroll', scrollFallback);

    return () => {
      gsap.ticker.remove(animateMarquee);
      scrollTriggerInstance.kill();
      window.removeEventListener('scrollend', handleScrollEnd);
      window.removeEventListener('scroll', scrollFallback);
    };
  }, []);

  const marqueeItems = [
    "Search Engine Optimization",
    "Content Marketing",
    "Website Design",
    "Brand Strategy",
    "Social Media Marketing"
  ];

  return (
    <div
      ref={containerRef}
      style={{
        backgroundColor: 'var(--accent)',
        color: '#050505',
        overflow: 'hidden',
        position: 'relative',
        height: '75px',
        display: 'flex',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        zIndex: 5,
        borderTop: '1px solid rgba(0,0,0,0.1)',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        transformOrigin: 'left center',
        userSelect: 'none',
      }}
    >
      <div
        ref={textRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '3rem',
          fontSize: '1.2rem',
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          textTransform: 'uppercase',
          letterSpacing: '1px',
        }}
      >
        {marqueeItems.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
            <span>{item}</span>
            {/* Inline SVG Asterisk Icon */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.8 }}>
              <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
