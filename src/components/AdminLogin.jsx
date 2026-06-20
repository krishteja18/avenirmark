import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, AlertCircle, HelpCircle, X } from 'lucide-react';

export default function AdminLogin({ onLoginSuccess, playSound }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);

  const handleHover = () => {
    if (playSound) playSound('hover');
  };

  const handleClick = () => {
    if (playSound) playSound('click');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClick();
    setError('');
    setLoading(true);

    fetch('/api/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.success) {
          onLoginSuccess(data.csrfToken, data.username);
        } else {
          setError(data.message || 'Login failed. Please check your credentials.');
        }
      })
      .catch((err) => {
        setLoading(false);
        console.error('Error logging in:', err);
        setError('A server error occurred. Please try again.');
      });
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at center, #1e2e60 0%, #111a36 100%)',
        padding: '2rem 1.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative background blurs */}
      <div style={{
        position: 'absolute',
        top: '-10%', left: '-10%',
        width: '50vw', height: '50vw',
        borderRadius: '50%',
        background: 'rgba(255, 222, 66, 0.02)',
        filter: 'blur(120px)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-10%', right: '-10%',
        width: '50vw', height: '50vw',
        borderRadius: '50%',
        background: 'rgba(84, 120, 255, 0.03)',
        filter: 'blur(120px)',
        pointerEvents: 'none'
      }} />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          width: '100%',
          maxWidth: '450px',
          background: 'rgba(27, 39, 81, 0.65)',
          border: '1px solid rgba(255, 222, 66, 0.15)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: '3rem 2.5rem',
          boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4)',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Brand Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <img
            src="/logo.png"
            alt="Avenirmark Logo"
            style={{
              height: '4rem',
              width: 'auto',
              marginBottom: '1rem',
              filter: 'brightness(1.1)',
            }}
          />
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.8rem',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
            }}
          >
            Admin Portal
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '0.9rem', marginTop: '0.4rem' }}>
            Avenirmark Growth Platform Engine
          </p>
        </div>

        {/* Error Alert */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '12px',
                padding: '0.8rem 1rem',
                color: '#FCA5A5',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                marginBottom: '1.5rem',
                overflow: 'hidden',
              }}
            >
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Username */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#CBD5E1' }}>
              Username
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <User size={18} style={{ position: 'absolute', left: '1.2rem', color: '#94A3B8' }} />
              <input
                required
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onMouseEnter={handleHover}
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '12px',
                  padding: '1rem 1rem 1rem 3rem',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  cursor: 'none',
                }}
                className="login-input"
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#CBD5E1' }}>
              Password
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Lock size={18} style={{ position: 'absolute', left: '1.2rem', color: '#94A3B8' }} />
              <input
                required
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onMouseEnter={handleHover}
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '12px',
                  padding: '1rem 1rem 1rem 3rem',
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.95rem',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  cursor: 'none',
                }}
                className="login-input"
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            onMouseEnter={handleHover}
            className="btn-premium"
            style={{
              width: '100%',
              justifyContent: 'center',
              padding: '1rem',
              marginTop: '0.5rem',
              cursor: 'none',
              border: 'none',
              boxShadow: 'var(--shadow-glow)',
            }}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>

          {/* Help / Forgot password */}
          <button
            type="button"
            onClick={() => {
              handleClick();
              setShowForgotModal(true);
            }}
            onMouseEnter={handleHover}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94A3B8',
              fontSize: '0.85rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              justifyContent: 'center',
              marginTop: '0.5rem',
              textDecoration: 'underline',
              cursor: 'none',
            }}
            className="help-link"
          >
            <HelpCircle size={14} /> Forgot Password?
          </button>

        </form>
      </motion.div>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {showForgotModal && (
          <div
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: 'rgba(10, 16, 35, 0.85)',
              backdropFilter: 'blur(8px)',
              zIndex: 99999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{
                width: '100%',
                maxWidth: '420px',
                background: '#1b2751',
                border: '1px solid rgba(255, 222, 66, 0.2)',
                borderRadius: '20px',
                padding: '2rem',
                position: 'relative',
                boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  handleClick();
                  setShowForgotModal(false);
                }}
                onMouseEnter={handleHover}
                style={{
                  position: 'absolute',
                  top: '1.2rem',
                  right: '1.2rem',
                  background: 'transparent',
                  border: 'none',
                  color: '#94A3B8',
                  cursor: 'none',
                }}
              >
                <X size={20} />
              </button>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.3rem',
                  fontWeight: 800,
                  color: '#FFFFFF',
                  marginBottom: '1rem',
                }}
              >
                Reset Password Instructions
              </h3>
              
              <div style={{ color: '#CBD5E1', fontSize: '0.95rem', lineHeight: '1.6' }}>
                <p style={{ marginBottom: '1rem' }}>
                  For security reasons, database-free email resets are not supported to avoid SMTP server failures.
                </p>
                <div 
                  style={{ 
                    background: 'rgba(255, 222, 66, 0.05)', 
                    border: '1px dashed rgba(255, 222, 66, 0.3)', 
                    borderRadius: '10px',
                    padding: '1rem',
                    color: '#FFE066'
                  }}
                >
                  <strong>How to Reset:</strong>
                  <ol style={{ marginLeft: '1.2rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <li>Log in to your Hostinger Control Panel.</li>
                    <li>Open the <strong>File Manager</strong>.</li>
                    <li>Navigate to <code>public/api/config.php</code>.</li>
                    <li>Update the <code>ADMIN_PASSWORD_HASH</code> value with your new password hash.</li>
                  </ol>
                </div>
              </div>
              
              <button
                onClick={() => {
                  handleClick();
                  setShowForgotModal(false);
                }}
                onMouseEnter={handleHover}
                className="btn-premium"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  padding: '0.8rem',
                  marginTop: '1.5rem',
                  cursor: 'none',
                }}
              >
                I Understand
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .login-input:focus {
          border-color: var(--accent) !important;
          background: rgba(255, 255, 255, 0.05) !important;
          box-shadow: 0 0 15px rgba(255, 222, 66, 0.1) !important;
        }
        .help-link:hover {
          color: #FFE066 !important;
        }
      `}</style>
    </div>
  );
}
