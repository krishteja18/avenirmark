import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';

/* ============================================================
   NEURAL CONSTELLATION CANVAS
   Mouse-reactive particle network — nodes drift, link within
   range, and are gently repelled by the cursor. Gold / cyan /
   magenta node hues over deep space.
============================================================ */
export function NeuralCanvas({ density = 11000, maxSpeed = 0.22, linkDist = 130, hue = 'mixed', style }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let particles = [];
    let W = 0, H = 0;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    const COLORS = hue === 'mixed'
      ? ['255, 222, 66', '83, 203, 243', '255, 91, 132', '139, 92, 246']
      : ['255, 222, 66'];

    const build = () => {
      const parent = canvas.parentElement;
      W = parent.clientWidth;
      H = parent.clientHeight;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      canvas.style.width = W + 'px';
      canvas.style.height = H + 'px';
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      const count = Math.min(140, Math.floor((W * H) / density));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * maxSpeed * 2,
        vy: (Math.random() - 0.5) * maxSpeed * 2,
        r: Math.random() * 1.6 + 0.6,
        c: COLORS[Math.floor(Math.random() * COLORS.length)],
        pulse: Math.random() * Math.PI * 2,
      }));
    };
    build();

    const onResize = () => build();
    window.addEventListener('resize', onResize);

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseout', onLeave);

    let frame = 0;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, W, H);
      const m = mouseRef.current;

      for (const p of particles) {
        // cursor repulsion field
        const dx = p.x - m.x;
        const dy = p.y - m.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < 22500) {
          const dist = Math.sqrt(distSq) || 1;
          const force = (150 - dist) / 150;
          p.vx += (dx / dist) * force * 0.06;
          p.vy += (dy / dist) * force * 0.06;
        }

        p.vx *= 0.985;
        p.vy *= 0.985;
        // keep a minimum drift
        p.vx += (Math.random() - 0.5) * 0.008;
        p.vy += (Math.random() - 0.5) * 0.008;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -20) p.x = W + 20;
        if (p.x > W + 20) p.x = -20;
        if (p.y < -20) p.y = H + 20;
        if (p.y > H + 20) p.y = -20;

        const twinkle = 0.55 + Math.sin(frame * 0.02 + p.pulse) * 0.3;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.c}, ${twinkle})`;
        ctx.fill();
      }

      // link nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < linkDist) {
            const alpha = (1 - d / linkDist) * 0.16;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${a.c}, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // links from cursor to nearby nodes — the "conductor" effect
      if (m.x > -999) {
        for (const p of particles) {
          const dx = p.x - m.x, dy = p.y - m.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 190) {
            const alpha = (1 - d / 190) * 0.35;
            ctx.beginPath();
            ctx.moveTo(m.x, m.y);
            ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = `rgba(255, 222, 66, ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseout', onLeave);
      cancelAnimationFrame(raf);
    };
  }, [density, maxSpeed, linkDist, hue]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', ...style }}
    />
  );
}

/* ============================================================
   AURORA — drifting blurred gradient orbs behind the hero
============================================================ */
export function Aurora() {
  const blobs = [
    { c: 'rgba(112, 32, 192, 0.35)', size: 520, x: '8%', y: '12%', dur: 19, dx: 90, dy: 60 },
    { c: 'rgba(83, 203, 243, 0.22)', size: 460, x: '68%', y: '8%', dur: 23, dx: -80, dy: 90 },
    { c: 'rgba(255, 91, 132, 0.16)', size: 420, x: '55%', y: '55%', dur: 26, dx: 70, dy: -70 },
    { c: 'rgba(255, 222, 66, 0.10)', size: 480, x: '20%', y: '60%', dur: 21, dx: -60, dy: -50 },
  ];
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }} aria-hidden="true">
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          animate={{ x: [0, b.dx, 0], y: [0, b.dy, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: b.dur, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            left: b.x,
            top: b.y,
            width: b.size,
            height: b.size,
            borderRadius: '50%',
            background: `radial-gradient(circle at center, ${b.c} 0%, transparent 65%)`,
            filter: 'blur(70px)',
          }}
        />
      ))}
    </div>
  );
}

/* ============================================================
   TEXT SCRAMBLE — decodes into place like a cipher
============================================================ */
const GLYPHS = '!<>-_\\/[]{}—=+*^?#01';
export function ScrambleText({ text, delay = 0, speed = 28, style, className, as: Tag = 'span' }) {
  const [display, setDisplay] = useState('');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    let raf;
    let started = false;
    const total = text.length;

    const timeout = setTimeout(() => { started = true; }, delay);

    const tick = () => {
      if (started) {
        frame++;
        const progress = Math.floor(frame / (speed / 14));
        let out = '';
        for (let i = 0; i < total; i++) {
          if (i < progress) out += text[i];
          else if (text[i] === ' ') out += ' ';
          else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        setDisplay(out);
        if (progress >= total) { setDisplay(text); return; }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); clearTimeout(timeout); };
  }, [inView, text, delay, speed]);

  return <Tag ref={ref} className={className} style={style}>{display || ' '}</Tag>;
}

/* ============================================================
   KINETIC TITLE — per-letter staggered 3D rise
============================================================ */
export function KineticTitle({ text, style, delay = 0, stagger = 0.035 }) {
  const letters = text.split('');
  return (
    <span style={{ display: 'inline-block', perspective: '600px', ...style }} aria-label={text}>
      {letters.map((ch, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: '0.7em', rotateX: -85, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
          transition={{ delay: delay + i * stagger, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'inline-block', transformOrigin: '50% 100%', whiteSpace: 'pre' }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

/* ============================================================
   SCROLL REVEAL — blur + rise on enter
============================================================ */
export function Reveal({ children, delay = 0, y = 36, once = true, style, className }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, margin: '-60px' }}
      transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* ============================================================
   3D TILT CARD with holographic glare
============================================================ */
export function TiltCard({ children, max = 10, glare = true, style, className, ...rest }) {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 220, damping: 22 });
  const sry = useSpring(ry, { stiffness: 220, damping: 22 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, o: 0 });

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * max * 2);
    rx.set(-(py - 0.5) * max * 2);
    setGlarePos({ x: px * 100, y: py * 100, o: 1 });
  };
  const onLeave = () => {
    rx.set(0); ry.set(0);
    setGlarePos((g) => ({ ...g, o: 0 }));
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d', position: 'relative', ...style }}
      {...rest}
    >
      {children}
      {glare && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 'inherit',
            pointerEvents: 'none',
            opacity: glarePos.o,
            transition: 'opacity 0.4s',
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.14) 0%, rgba(255,222,66,0.05) 30%, transparent 60%)`,
            zIndex: 3,
          }}
        />
      )}
    </motion.div>
  );
}

/* ============================================================
   SPOTLIGHT CARD — radial glow tracks the cursor via CSS vars
============================================================ */
export function SpotlightCard({ children, color = '255, 222, 66', style, className, ...rest }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    ref.current.style.setProperty('--my', `${e.clientY - rect.top}px`);
    ref.current.style.setProperty('--spot-o', '1');
  };
  const onLeave = () => ref.current.style.setProperty('--spot-o', '0');
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ position: 'relative', overflow: 'hidden', '--spot-c': color, ...style }}
      {...rest}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: 'var(--spot-o, 0)',
          transition: 'opacity 0.45s',
          background: `radial-gradient(480px circle at var(--mx, 50%) var(--my, 50%), rgba(${color}, 0.09), transparent 45%)`,
          zIndex: 1,
        }}
      />
      <div style={{ position: 'relative', zIndex: 2 }}>{children}</div>
    </div>
  );
}

/* ============================================================
   MAGNETIC — element gravitates toward the cursor
============================================================ */
export function Magnetic({ children, strength = 0.35, style }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 16 });
  const sy = useSpring(y, { stiffness: 180, damping: 16 });

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ x: sx, y: sy, display: 'inline-block', ...style }}>
      {children}
    </motion.div>
  );
}

/* ============================================================
   COUNT UP — animated number when scrolled into view
============================================================ */
export function CountUp({ end, duration = 1800, suffix = '', prefix = '', style, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      setVal(Math.round(end * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration]);

  return <span ref={ref} className={className} style={style}>{prefix}{val.toLocaleString()}{suffix}</span>;
}

/* ============================================================
   FLIP COUNTDOWN UNIT — digits roll on change
============================================================ */
export function FlipUnit({ value, label }) {
  const padded = String(value).padStart(2, '0');
  return (
    <div className="flip-unit">
      <div className="flip-unit-digits">
        {padded.split('').map((d, i) => (
          <div key={i} className="flip-digit-window">
            <motion.div
              key={d + '-' + i}
              initial={{ y: '-100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flip-digit"
            >
              {d}
            </motion.div>
          </div>
        ))}
      </div>
      <div className="flip-unit-label">{label}</div>
    </div>
  );
}

/* ============================================================
   MARQUEE — infinite scrolling strip (duplicated content)
============================================================ */
export function Marquee({ children, speed = 32, reverse = false, style }) {
  return (
    <div className="fx-marquee" style={style}>
      <div
        className="fx-marquee-track"
        style={{ animationDuration: `${speed}s`, animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        <div className="fx-marquee-group">{children}</div>
        <div className="fx-marquee-group" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}

/* ============================================================
   SECTION HEADING — kicker chip + display title + ghost watermark
============================================================ */
export function SectionHeading({ kicker, title, ghost, align = 'center', style }) {
  return (
    <div style={{ position: 'relative', textAlign: align, marginBottom: '4.5rem', ...style }}>
      {ghost && (
        <div aria-hidden="true" className="section-ghost">{ghost}</div>
      )}
      <Reveal>
        {kicker && (
          <span className="section-kicker">
            <span className="section-kicker-dot" />
            {kicker}
          </span>
        )}
        <h2 className="section-title">{title}</h2>
      </Reveal>
    </div>
  );
}

/* ============================================================
   SCROLL PROGRESS BAR (fixed top)
============================================================ */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });
  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        transformOrigin: '0%',
        scaleX,
        background: 'linear-gradient(90deg, var(--accent), #53CBF3, #FF5B84)',
        zIndex: 10000,
        boxShadow: '0 0 12px rgba(255,222,66,0.5)',
      }}
    />
  );
}

/* ============================================================
   ANIMATED SUCCESS CHECK — SVG stroke draw
============================================================ */
export function SuccessCheck({ size = 72 }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 72 72"
      initial="hidden"
      animate="visible"
      style={{ display: 'block', margin: '0 auto' }}
    >
      <motion.circle
        cx="36" cy="36" r="32"
        fill="none"
        stroke="#10B981"
        strokeWidth="3"
        variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1 } }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
      <motion.circle
        cx="36" cy="36" r="32"
        fill="rgba(16,185,129,0.08)"
        stroke="none"
        variants={{ hidden: { scale: 0 }, visible: { scale: 1 } }}
        transition={{ duration: 0.4, delay: 0.15 }}
      />
      <motion.path
        d="M22 37 L32 47 L51 27"
        fill="none"
        stroke="#10B981"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1 } }}
        transition={{ duration: 0.45, delay: 0.5, ease: 'easeOut' }}
      />
    </motion.svg>
  );
}

/* ============================================================
   PARALLAX FLOAT — element drifts subtly against scroll
============================================================ */
export function ParallaxFloat({ children, distance = 60, style }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  return (
    <motion.div ref={ref} style={{ y, ...style }}>
      {children}
    </motion.div>
  );
}

/* ============================================================
   TYPING CURSOR CARET
============================================================ */
export function Caret({ color = 'var(--accent)' }) {
  return (
    <motion.span
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 1, repeat: Infinity }}
      style={{ display: 'inline-block', width: '0.55em', height: '1em', background: color, verticalAlign: 'text-bottom', marginLeft: '4px' }}
    />
  );
}
