import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, ArrowUpRight, X, MessageCircle } from 'lucide-react';
import gsap from 'gsap';

export default function ContactBanner({ playSound }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: 'web', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showWhatsappModal, setShowWhatsappModal] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const submitBtnRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playSound) playSound('click');

    const serviceLabels = {
      seo: "Search Engine Optimization",
      content: "Content Marketing",
      web: "Website Design & Dev",
      app: "App Development",
      brand: "Brand Strategy",
      social: "360° Social Media Marketing",
      aiVoice: "AI Voice Agents",
      logoDesign: "Logo Design & Identity",
      productPhotography: "Product Photography",
      digitalMarketing: "Digital Marketing & Growth"
    };

    const serviceName = serviceLabels[form.service] || form.service;
    const text = `*New Lead from AvenirMark website*\n\n` +
                 `*Name:* ${form.name}\n` +
                 `*Phone:* ${form.phone}\n` +
                 `*Email:* ${form.email || 'Not Shared'}\n` +
                 `*Selected Service:* ${serviceName}\n` +
                 `*Project Scope:* ${form.message || 'Not Shared'}`;

    const encodedText = encodeURIComponent(text);
    const url = `https://wa.me/919966093777?text=${encodedText}`;
    setWhatsappUrl(url);

    // Call backend API
    fetch('/api/send-email.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        phone: form.phone,
        email: form.email,
        service: serviceName,
        message: form.message,
      }),
    })
      .then((res) => {
        const contentType = res.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return res.json();
        }
        return res.text().then((text) => ({ success: false, rawText: text }));
      })
      .then((data) => {
        console.log("Contact form email sent:", data);
      })
      .catch((err) => {
        console.error("Error sending contact email:", err);
      });

    // Reset Form and show popup
    setForm({ name: '', email: '', phone: '', service: 'web', message: '' });
    setIsSubmitted(true);
    setShowWhatsappModal(true);

    setTimeout(() => {
      setIsSubmitted(false);
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
              Let’s Make Something Great
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{ fontSize: 'clamp(2.2rem, 3.5vw, 3.5rem)', lineHeight: 1.1 }}
            >
              Your next breakthrough starts with one conversation.
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ fontSize: '1.15rem', color: 'var(--text-secondary)' }}
          >
            Whether you’re launching something new or scaling something great, we want to hear about it. Tell us your ambition — we’ll tell you exactly how to win.
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
                background: 'rgba(84, 120, 255, 0.03)',
                border: '1px solid rgba(84, 120, 255, 0.12)',
                transition: 'all 0.3s ease',
              }}
              className="info-item address-item"
            >
              <div style={{ color: 'var(--accent-cyan)', background: 'rgba(84,120,255,0.08)', padding: '0.8rem', borderRadius: '50%' }}>
                <MapPin size={22} />
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-secondary)' }}>Our Head Office</div>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.1rem', fontSize: '0.95rem', lineHeight: 1.4 }}>
                  AvenirMark India Pvt. Ltd. <br />
                  #A2, President Banjara Apartment, Road No. 2, Sagar Society, Banjara Hills, Hyderabad, Telangana 500034.
                </div>
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
                background: 'rgba(83, 203, 243, 0.03)',
                border: '1px solid rgba(83, 203, 243, 0.12)',
                transition: 'all 0.3s ease',
              }}
              className="info-item email-item"
            >
              <div style={{ color: 'var(--accent-sky)', background: 'rgba(83,203,243,0.08)', padding: '0.8rem', borderRadius: '50%' }}>
                <Mail size={22} />
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-secondary)' }}>Email Us</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <a href="mailto:info@avenirmark.com" style={{ fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none', display: 'block', marginTop: '0.1rem', cursor: 'none' }}>
                    info@avenirmark.com
                  </a>
                  <a href="mailto:avenirmak.official@gmail.com" style={{ fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none', display: 'block', cursor: 'none' }}>
                    avenirmak.official@gmail.com
                  </a>
                </div>
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
                background: 'rgba(255, 222, 66, 0.02)',
                border: '1px solid rgba(255, 222, 66, 0.12)',
                transition: 'all 0.3s ease',
              }}
              className="info-item phone-item"
            >
              <div style={{ color: 'var(--accent)', background: 'rgba(255,222,66,0.06)', padding: '0.8rem', borderRadius: '50%' }}>
                <Phone size={22} />
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-secondary)' }}>Call Our Experts</div>
                <a href="tel:+919966093777" style={{ fontWeight: 600, color: 'var(--text-primary)', textDecoration: 'none', display: 'block', marginTop: '0.1rem', cursor: 'none' }}>
                  +91 99660 93777
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
            boxShadow: '0 20px 50px rgba(27, 39, 81, 0.3)',
            background: '#1b2751',
            border: '1px solid rgba(255, 222, 66, 0.15)',
            borderRadius: '16px',
            overflow: 'hidden',
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
                  backgroundColor: 'rgba(255, 222, 66, 0.1)',
                  color: 'var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--shadow-glow)',
                }}
              >
                <Send size={32} />
              </div>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FFFFFF' }}>Brief Received. We’re On It.</h3>
              <p style={{ maxWidth: '350px', margin: '0 auto', color: '#CBD5E1' }}>
                An Avenirmark strategist will be in touch within 24 hours. Get ready — your brand’s next chapter is about to begin.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.5rem', fontFamily: 'var(--font-display)', color: '#FFFFFF' }}>
                Brief Us. We’re Ready.
              </h3>

              {/* Name field */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', position: 'relative' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#CBD5E1' }}>
                  Full Name *
                </label>
                <input
                  required
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  onMouseEnter={handleHover}
                  placeholder="Your full name"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '10px',
                    padding: '1rem 1.2rem',
                    color: '#FFFFFF',
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
                <label style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#CBD5E1' }}>
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleInputChange}
                  onMouseEnter={handleHover}
                  placeholder="Your work email"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '10px',
                    padding: '1rem 1.2rem',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-body)',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    cursor: 'none',
                  }}
                  className="contact-input"
                />
              </div>

              {/* Mobile Number field */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#CBD5E1' }}>
                  Mobile Number *
                </label>
                <input
                  required
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleInputChange}
                  onMouseEnter={handleHover}
                  placeholder="Your mobile number"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '10px',
                    padding: '1rem 1.2rem',
                    color: '#FFFFFF',
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
                <label style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#CBD5E1' }}>
                  Select Service *
                </label>
                <select
                  required
                  name="service"
                  value={form.service}
                  onChange={handleInputChange}
                  onMouseEnter={handleHover}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '10px',
                    padding: '1rem 1.2rem',
                    color: '#FFFFFF',
                    fontFamily: 'var(--font-body)',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    cursor: 'none',
                  }}
                  className="contact-input"
                >
                  <option value="seo" style={{ background: '#1b2751', color: '#FFFFFF' }}>Search Engine Optimization</option>
                  <option value="content" style={{ background: '#1b2751', color: '#FFFFFF' }}>Content Marketing</option>
                  <option value="web" style={{ background: '#1b2751', color: '#FFFFFF' }}>Website Design & Dev</option>
                  <option value="app" style={{ background: '#1b2751', color: '#FFFFFF' }}>App Development</option>
                  <option value="brand" style={{ background: '#1b2751', color: '#FFFFFF' }}>Brand Strategy</option>
                  <option value="social" style={{ background: '#1b2751', color: '#FFFFFF' }}>360° Social Media Marketing</option>
                  <option value="aiVoice" style={{ background: '#1b2751', color: '#FFFFFF' }}>AI Voice Agents</option>
                  <option value="logoDesign" style={{ background: '#1b2751', color: '#FFFFFF' }}>Logo Design & Identity</option>
                  <option value="productPhotography" style={{ background: '#1b2751', color: '#FFFFFF' }}>Product Photography</option>
                  <option value="digitalMarketing" style={{ background: '#1b2751', color: '#FFFFFF' }}>Digital Marketing & Growth</option>
                </select>
              </div>

              {/* Message field */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#CBD5E1' }}>
                  Project Scope (Optional)
                </label>
                <textarea
                  rows={4}
                  name="message"
                  value={form.message}
                  onChange={handleInputChange}
                  onMouseEnter={handleHover}
                  placeholder="Describe your brand, goals, and what success looks like to you..."
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '10px',
                    padding: '1.2rem',
                    color: '#FFFFFF',
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
                  Submit
                </button>
              </div>

            </form>
          )}

          {/* WhatsApp Direct Connect Modal Popup */}
          <AnimatePresence>
            {showWhatsappModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'rgba(27, 39, 81, 0.3)',
                  backdropFilter: 'blur(15px)',
                  WebkitBackdropFilter: 'blur(15px)',
                  zIndex: 999999,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <motion.div
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  style={{
                    width: '95%',
                    maxWidth: '460px',
                    padding: '2.5rem',
                    borderRadius: '24px',
                    background: 'rgba(255, 255, 255, 0.96)',
                    border: '1px solid rgba(27, 39, 81, 0.12)',
                    boxShadow: '0 25px 60px rgba(27, 39, 81, 0.15), var(--shadow-glow)',
                    textAlign: 'center',
                    position: 'relative',
                  }}
                >
                  <button
                    onClick={() => setShowWhatsappModal(false)}
                    onMouseEnter={handleHover}
                    style={{
                      position: 'absolute',
                      top: '1.2rem',
                      right: '1.2rem',
                      background: 'rgba(27, 39, 81, 0.05)',
                      border: '1px solid rgba(27, 39, 81, 0.08)',
                      borderRadius: '50%',
                      width: '36px',
                      height: '36px',
                      color: 'var(--text-secondary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'none',
                    }}
                  >
                    <X size={18} />
                  </button>

                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      background: 'rgba(212, 175, 55, 0.1)',
                      border: '1px solid var(--accent)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-primary)',
                      margin: '0 auto 1.5rem auto',
                    }}
                  >
                    <MessageCircle size={28} />
                  </div>

                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.8rem', fontFamily: 'var(--font-display)' }}>
                    Chat on WhatsApp?
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '2.2rem' }}>
                    Your project brief has been compiled and emailed to our strategists. Would you also like to connect with us directly on WhatsApp to expedite your consultation?
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      onMouseEnter={handleHover}
                      onClick={() => {
                        if (playSound) playSound('click');
                        setShowWhatsappModal(false);
                      }}
                      style={{
                        background: '#25D366',
                        color: '#FFFFFF',
                        textDecoration: 'none',
                        padding: '1rem 2rem',
                        borderRadius: '50px',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.6rem',
                        boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        cursor: 'none',
                      }}
                    >
                      <MessageCircle size={20} />
                      Chat on WhatsApp
                    </a>
                    <button
                      onClick={() => setShowWhatsappModal(false)}
                      onMouseEnter={handleHover}
                      style={{
                        background: 'rgba(27, 39, 81, 0.05)',
                        border: '1px solid rgba(27, 39, 81, 0.08)',
                        color: 'var(--text-secondary)',
                        padding: '1rem 2rem',
                        borderRadius: '50px',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        cursor: 'none',
                        outline: 'none',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      No, Thank You
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <style>{`
        .contact-input:focus {
          border-color: var(--accent) !important;
          background: rgba(255, 255, 255, 0.08) !important;
          box-shadow: 0 0 15px rgba(255, 222, 66, 0.15);
        }
        .contact-input::placeholder {
          color: rgba(255, 255, 255, 0.4) !important;
        }
        .address-item:hover {
          border-color: var(--accent-cyan) !important;
          background: rgba(84, 120, 255, 0.08) !important;
        }
        .email-item:hover {
          border-color: var(--accent-sky) !important;
          background: rgba(83, 203, 243, 0.08) !important;
        }
        .phone-item:hover {
          border-color: var(--accent) !important;
          background: rgba(255, 222, 66, 0.06) !important;
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
