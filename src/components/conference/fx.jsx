import { motion } from 'framer-motion';

/* ============================================================
   Performance-first FX library.
   All heavy effects (particle canvas, aurora blobs, tilt,
   spotlight, magnetic, scramble, scroll reveals) are stripped
   to static, zero-cost equivalents. Component APIs are kept
   so the page markup doesn't change.
============================================================ */

/* Particle network — removed for performance. */
export function NeuralCanvas() {
  return null;
}

/* Aurora gradient blobs — removed for performance. */
export function Aurora() {
  return null;
}

/* Text scramble — renders the final text directly. */
export function ScrambleText({ text, style, className, as: Tag = 'span' }) {
  return <Tag className={className} style={style}>{text}</Tag>;
}

/* Kinetic per-letter title — renders plain text. */
export function KineticTitle({ text, style }) {
  return <span style={style}>{text}</span>;
}

/* Scroll reveal — plain passthrough, no animation. */
export function Reveal({ children, style, className }) {
  return <div className={className} style={style}>{children}</div>;
}

/* 3D tilt card — plain container, no listeners. */
export function TiltCard({ children, max, glare, style, className, ...rest }) {
  return (
    <div className={className} style={{ position: 'relative', ...style }} {...rest}>
      {children}
    </div>
  );
}

/* Spotlight card — plain container, no listeners. */
export function SpotlightCard({ children, color, style, className, ...rest }) {
  return (
    <div className={className} style={{ position: 'relative', overflow: 'hidden', ...style }} {...rest}>
      <div style={{ position: 'relative', zIndex: 2 }}>{children}</div>
    </div>
  );
}

/* Magnetic hover — plain wrapper. */
export function Magnetic({ children, strength, style }) {
  return <div style={{ display: 'inline-block', ...style }}>{children}</div>;
}

/* Count up — renders the final number statically. */
export function CountUp({ end, suffix = '', prefix = '', style, className }) {
  return <span className={className} style={style}>{prefix}{end.toLocaleString()}{suffix}</span>;
}

/* Countdown unit — static digits, no flip animation. */
export function FlipUnit({ value, label }) {
  const padded = String(value).padStart(2, '0');
  return (
    <div className="flip-unit">
      <div className="flip-unit-digits">
        {padded.split('').map((d, i) => (
          <div key={i} className="flip-digit-window">
            <div className="flip-digit">{d}</div>
          </div>
        ))}
      </div>
      <div className="flip-unit-label">{label}</div>
    </div>
  );
}

/* Marquee — kept: a single compositor-friendly CSS transform. */
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

/* Section heading — static. */
export function SectionHeading({ kicker, title, ghost, align = 'center', style }) {
  return (
    <div style={{ position: 'relative', textAlign: align, marginBottom: '4.5rem', ...style }}>
      {ghost && (
        <div aria-hidden="true" className="section-ghost">{ghost}</div>
      )}
      <div>
        {kicker && (
          <span className="section-kicker">
            <span className="section-kicker-dot" />
            {kicker}
          </span>
        )}
        <h2 className="section-title">{title}</h2>
      </div>
    </div>
  );
}

/* Scroll progress bar — removed for performance. */
export function ScrollProgress() {
  return null;
}

/* Animated success check — kept (only runs after a form submit). */
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
        stroke="#059669"
        strokeWidth="3"
        variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1 } }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      />
      <circle cx="36" cy="36" r="32" fill="rgba(5, 150, 105, 0.08)" stroke="none" />
      <motion.path
        d="M22 37 L32 47 L51 27"
        fill="none"
        stroke="#059669"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1 } }}
        transition={{ duration: 0.45, delay: 0.4, ease: 'easeOut' }}
      />
    </motion.svg>
  );
}

/* Parallax — plain passthrough. */
export function ParallaxFloat({ children, distance, style }) {
  return <div style={style}>{children}</div>;
}

/* Typing caret — static. */
export function Caret({ color = 'var(--accent)' }) {
  return (
    <span style={{ display: 'inline-block', width: '0.55em', height: '1em', background: color, verticalAlign: 'text-bottom', marginLeft: '4px' }} />
  );
}
