import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const innerDotRef = useRef(null);
  const [isHidden, setIsHidden] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Check if device is mobile/touch based
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      setIsHidden(true);
      return;
    }

    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let outer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      setIsHidden(false);
    };

    const onMouseLeave = () => {
      setIsHidden(true);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    // Setup GSAP ticker for elastic lag effect
    const ticker = () => {
      const cursor = cursorRef.current;
      const innerDot = innerDotRef.current;
      if (!cursor || !innerDot) return;

      // Outer ring follows mouse with easing/lag
      const dt = 0.15; // interpolation factor
      outer.x += (mouse.x - outer.x) * dt;
      outer.y += (mouse.y - outer.y) * dt;

      gsap.set(cursor, { x: outer.x, y: outer.y });

      // Inner dot moves within the boundary based on mouse velocity/offset
      const dx = mouse.x - outer.x;
      const dy = mouse.y - outer.y;
      const dist = Math.min(Math.sqrt(dx * dx + dy * dy), 12); // Max 12px shift
      const angle = Math.atan2(dy, dx);

      const innerX = Math.cos(angle) * dist;
      const innerY = Math.sin(angle) * dist;

      gsap.set(innerDot, { x: innerX, y: innerY });
    };

    gsap.ticker.add(ticker);

    // Hover state management
    const addHoverListeners = () => {
      const interactives = document.querySelectorAll(
        'a, button, [role="button"], input, select, textarea, .clickable, .spotlight-card'
      );

      interactives.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovered(true));
        el.addEventListener('mouseleave', () => setIsHovered(false));
      });
    };

    // Set up hover states
    addHoverListeners();

    // Since React renders dynamically, re-run listener binding on DOM changes
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      gsap.ticker.remove(ticker);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: isHovered ? '60px' : '36px',
        height: isHovered ? '60px' : '36px',
        border: isHovered ? '2px solid #8CFF00' : '2px solid rgba(255, 255, 255, 0.4)',
        borderRadius: '50%',
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isHidden ? 0 : 1,
        transition: 'width 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), height 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), border-color 0.3s ease, opacity 0.3s ease',
        mixBlendMode: 'difference',
      }}
    >
      <div
        ref={innerDotRef}
        style={{
          width: isHovered ? '12px' : '8px',
          height: isHovered ? '12px' : '8px',
          background: 'linear-gradient(135deg, #8CFF00, #00f0ff)',
          borderRadius: '50%',
          transition: 'width 0.3s ease, height 0.3s ease',
        }}
      />
    </div>
  );
}
