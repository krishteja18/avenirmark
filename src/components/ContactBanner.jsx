import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';

export default function ContactBanner({ playSound }) {
  const [form, setForm] = useState({ name: '', email: '', service: 'web', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const submitBtnRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playSound) playSound('click');
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setForm({ name: '', email: '', service: 'web', message: '' });
    }, 4000);
  };

  const handleHover = () => {
    if (playSound) playSound('hover');
  };

  useEffect(() => {
    // Magnetic Send button
    const btn = submitBtnRef.current;
    if (!btn) return;

    const handleMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: x * 0.4,
        y: y * 0.4,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleLeave = () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    btn.addEventListener('mousemove', handleMove);
    btn.addEventListener('mouseleave', handleLeave);

    return () => {
      btn.removeEventListener('mousemove', handleMove);
      btn.removeEventListener('mouseleave', handleLeave);
    };
  }, [isSubmitted]);

  return (
    <section id="contact" className="section" style={{ position: 'relative' }}>
      
      {/* Background decoration */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          backgroundColor: 'rgba(212, 175, 55, 0.015)',
          filter: 'blur(150px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.1fr',
          gap: '5rem',
          alignItems: 'start',
          position: 'relative',
          zIndex: 1,
        }}
        className="contact-grid"
      >
        {/* Left Side: Copy and details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
              Get In Touch
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{ fontSize: 'clamp(2.2rem, 3.5vw, 3.5rem)', lineHeight: 1.1 }}
            >
              We are crafting exceptional experiences for every customer.
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ fontSize: '1.15rem', color: 'var(--text-secondary)' }}
          >
            We create experiences your customers will remember. Let’s build yours. Feel free to reach out via phone, email, or by filling out our project brief form.
          </motion.p>

          {/* Staggered Contact details list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginTop: '1.5rem' }}>
            
            {/* Address */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              onMouseEnter={handleHover}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.2rem',
                padding: '1rem',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255,255,255,0.04)',
                transition: 'border-color 0.3s ease',
              }}
              className="info-item"
            >
              <div style={{ color: 'var(--accent)', background: 'rgba(212,175,55,0.06)', padding: '0.8rem', borderRadius: '50%' }}>
                <MapPin size={22} />
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-secondary)' }}>Our Head Office</div>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.1rem' }}>HIG IX Phase H-No: 76, Hyderabad, India</div>
              </div>
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              onMouseEnter={handleHover}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.2rem',
                padding: '1rem',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255,255,255,0.04)',
                transition: 'border-color 0.3s ease',
              }}
              className="info-item"
            >
              <div style={{ color: 'var(--accent)', background: 'rgba(212,175,55,0.06)', padding: '0.8rem', borderRadius: '50%' }}>
                <Mail size={22} />
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-secondary)' }}>Email Us</div>
                <a href="mailto:contact@avenirmark.com" style={{ fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none', display: 'block', marginTop: '0.1rem', cursor: 'none' }}>
                  contact@avenirmark.com
                </a>
              </div>
            </motion.div>

            {/* Phone */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              onMouseEnter={handleHover}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.2rem',
                padding: '1rem',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255,255,255,0.04)',
                transition: 'border-color 0.3s ease',
              }}
              className="info-item"
            >
              <div style={{ color: 'var(--accent)', background: 'rgba(212,175,55,0.06)', padding: '0.8rem', borderRadius: '50%' }}>
                <Phone size={22} />
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-secondary)' }}>Call Our Experts</div>
                <a href="tel:+919666525444" style={{ fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none', display: 'block', marginTop: '0.1rem', cursor: 'none' }}>
                  +91 96665 25444
                </a>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Right Side: Dynamic glassmorphic project builder form */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass-panel"
          style={{
            padding: '3.5rem',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          {isSubmitted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1.5rem',
                minHeight: '350px',
              }}
            >
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(212, 175, 55, 0.1)',
                  color: 'var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--shadow-glow)',
                }}
              >
                <Send size={32} />
              </div>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Project Submitted!</h3>
              <p style={{ maxWidth: '350px', margin: '0 auto', color: 'var(--text-secondary)' }}>
                Thank you for reaching out. An Avenirmark digital strategist will contact you within the next 24 business hours. Let's create something extraordinary.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.5rem', fontFamily: 'var(--font-display)' }}>
                Let's Build Something Exceptional
              </h3>

              {/* Name field */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', position: 'relative' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)' }}>
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  onMouseEnter={handleHover}
                  placeholder="Enter your name"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '10px',
                    padding: '1rem 1.2rem',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    cursor: 'none',
                  }}
                  className="contact-input"
                />
              </div>

              {/* Email field */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)' }}>
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleInputChange}
                  onMouseEnter={handleHover}
                  placeholder="Enter your email"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '10px',
                    padding: '1rem 1.2rem',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    cursor: 'none',
                  }}
                  className="contact-input"
                />
              </div>

              {/* Service selection dropdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)' }}>
                  Select Service
                </label>
                <select
                  name="service"
                  value={form.service}
                  onChange={handleInputChange}
                  onMouseEnter={handleHover}
                  style={{
                    background: '#0d0d0f',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '10px',
                    padding: '1rem 1.2rem',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    cursor: 'none',
                  }}
                  className="contact-input"
                >
                  <option value="seo">Search Engine Optimization</option>
                  <option value="content">Content Marketing</option>
                  <option value="web">Website Design & Dev</option>
                  <option value="brand">Brand Strategy</option>
                  <option value="social">Social Media Marketing</option>
                </select>
              </div>

              {/* Message field */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-secondary)' }}>
                  Message / Brief
                </label>
                <textarea
                  required
                  rows={4}
                  name="message"
                  value={form.message}
                  onChange={handleInputChange}
                  onMouseEnter={handleHover}
                  placeholder="Tell us about your brand and goals..."
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '10px',
                    padding: '1.2rem',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    outline: 'none',
                    resize: 'none',
                    transition: 'all 0.3s ease',
                    cursor: 'none',
                  }}
                  className="contact-input"
                />
              </div>

              {/* Submit Button */}
              <div style={{ display: 'inline-block', marginTop: '0.5rem' }}>
                <button
                  ref={submitBtnRef}
                  type="submit"
                  onMouseEnter={handleHover}
                  className="btn-premium"
                  style={{
                    border: 'none',
                    outline: 'none',
                    padding: '1.1rem 2.8rem',
                    fontSize: '1rem',
                    boxShadow: 'var(--shadow-glow)',
                    width: '100%',
                    justifyContent: 'center',
                  }}
                >
                  Launch Project <ArrowUpRight size={18} />
                </button>
              </div>

            </form>
          )}
        </motion.div>
      </div>

      <style>{`
        .contact-input:focus {
          border-color: var(--accent) !important;
          background: rgba(255, 255, 255, 0.04) !important;
          box-shadow: 0 0 15px rgba(212, 175, 55, 0.1);
        }
        .info-item:hover {
          border-color: var(--accent) !important;
          background: rgba(140, 255, 0, 0.01) !important;
        }
        @media (max-width: 1024px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 4rem !important;
          }
          .glass-panel {
            padding: 2.2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
