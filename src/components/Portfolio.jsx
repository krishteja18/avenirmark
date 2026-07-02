import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, ChevronLeft, ChevronRight, Briefcase } from 'lucide-react';
import gsap from 'gsap';

export default function Portfolio({ playSound }) {
  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'luxury', label: 'Luxury Brand' },
    { id: 'web', label: 'High-End Web' },
    { id: 'social', label: 'Social Media' },
    { id: 'brochures', label: 'Brochures' },
    { id: 'branding', label: 'Branding' },
  ];

  const projects = [
    {
      id: 101,
      category: 'luxury',
      title: 'Stand Out Creative Campaign',
      img: '/portfolio_1.png',
      aspect: '1/1',
    },
    {
      id: 102,
      category: 'web',
      title: 'Creative Website Portal',
      img: '/portfolio_2.png',
      aspect: '1/1',
    },
    {
      id: 103,
      category: 'social',
      title: 'Ekam Sustainable Ad Campaign',
      img: '/portfolio_3.jpg',
      aspect: '16/9',
    },
    {
      id: 104,
      category: 'brochures',
      title: 'Sustainable Living Brochure Set',
      img: '/portfolio_4.jpg',
      aspect: '4/3',
    },
    {
      id: 105,
      category: 'luxury',
      title: 'GAGA Luxury Branding & Signage',
      img: '/portfolio_5.png',
      aspect: '16/9',
    },
    // Luxury Brand
    {
      id: 1,
      category: 'luxury',
      title: 'Avenir Gold Identity',
      img: '/wp-content/uploads/2025/07/4-4-1024x576-1.png',
      aspect: '16/9',
    },
    {
      id: 2,
      category: 'luxury',
      title: 'Premium Brand Guideline',
      img: '/wp-content/uploads/2025/07/2-4-1024x576-1.png',
      aspect: '16/9',
    },
    {
      id: 3,
      category: 'luxury',
      title: 'Luxury Typography Set',
      img: '/wp-content/uploads/2025/07/3-3-1024x576-1.png',
      aspect: '16/9',
    },
    {
      id: 4,
      category: 'luxury',
      title: 'Minimalist Package Showcase',
      img: '/wp-content/uploads/2025/07/8684a163-4c6f-46e7-9595-656da2880040-1024x682-1.webp',
      aspect: '3/2',
    },
    {
      id: 5,
      category: 'luxury',
      title: 'Monochrome Editorial Card',
      img: '/wp-content/uploads/2025/07/28557a6d-bc18-4a3c-9461-14f5f8c107cc-1024x682-1.webp',
      aspect: '3/2',
    },
    {
      id: 6,
      category: 'luxury',
      title: 'Elite Stationery Blueprint',
      img: '/wp-content/uploads/2025/07/1-6-1024x576-1.png',
      aspect: '16/9',
    },
    // Web Design
    {
      id: 7,
      category: 'web',
      title: 'Aesthetic Web Grid',
      img: '/wp-content/uploads/2025/07/11-8-1024x576-1.png',
      aspect: '16/9',
    },
    {
      id: 8,
      category: 'web',
      title: 'High-Performance Dashboard',
      img: '/wp-content/uploads/2025/07/Your-paragraph-text-19-1024x576-1.png',
      aspect: '16/9',
    },
    {
      id: 9,
      category: 'web',
      title: 'Responsive Portal Frame',
      img: '/wp-content/uploads/2025/07/10-7-1024x576-1.png',
      aspect: '16/9',
    },
    // Social Media
    {
      id: 10,
      category: 'social',
      title: 'Instagram Creative Grid',
      img: '/wp-content/uploads/2025/07/Your-paragraph-text-20-1024x576-1.png',
      aspect: '16/9',
    },
    {
      id: 11,
      category: 'social',
      title: 'Social Engagement Template',
      img: '/wp-content/uploads/2025/07/Your-paragraph-text-22-1-1024x576-1.png',
      aspect: '16/9',
    },
    {
      id: 12,
      category: 'social',
      title: 'High-Impact Banner set',
      img: '/wp-content/uploads/2025/07/7-2-1024x576-1.png',
      aspect: '16/9',
    },
    {
      id: 13,
      category: 'social',
      title: 'Campaign Media Poster',
      img: '/wp-content/uploads/2025/07/8-2-1024x576-1.png',
      aspect: '16/9',
    },
    // Brochures
    {
      id: 14,
      category: 'brochures',
      title: 'Corporate Catalog Cover',
      img: '/wp-content/uploads/2025/07/1-7.png',
      aspect: '3/2',
    },
    {
      id: 15,
      category: 'brochures',
      title: 'Luxury Product Pamphlet',
      img: '/wp-content/uploads/2025/07/8152b52a-c676-444c-b052-2f2667c00226-1024x682-1.webp',
      aspect: '3/2',
    },
    {
      id: 16,
      category: 'brochures',
      title: 'Landscape Branding Book',
      img: '/wp-content/uploads/2025/07/asdasd-1024x768-1.jpg',
      aspect: '4/3',
    },
    {
      id: 17,
      category: 'brochures',
      title: 'Creative Editorial Mockup',
      img: '/wp-content/uploads/2025/07/Mock1-1024x683-1.jpg',
      aspect: '3/2',
    },
    // Branding
    {
      id: 200,
      category: 'branding',
      title: 'Avenirmark Brand Identity - Slide 1',
      img: '/branding/IMG-20260701-WA0000.jpg',
      aspect: '16/9',
    },
    {
      id: 201,
      category: 'branding',
      title: 'Avenirmark Brand Identity - Slide 2',
      img: '/branding/IMG-20260701-WA0001.jpg',
      aspect: '16/9',
    },
    {
      id: 202,
      category: 'branding',
      title: 'Avenirmark Brand Identity - Slide 3',
      img: '/branding/IMG-20260701-WA0002.jpg',
      aspect: '16/9',
    },
    {
      id: 203,
      category: 'branding',
      title: 'Avenirmark Brand Identity - Slide 4',
      img: '/branding/IMG-20260701-WA0003.jpg',
      aspect: '16/9',
    },
    {
      id: 204,
      category: 'branding',
      title: 'Avenirmark Brand Identity - Slide 5',
      img: '/branding/IMG-20260701-WA0004.jpg',
      aspect: '16/9',
    },
    {
      id: 205,
      category: 'branding',
      title: 'Avenirmark Brand Identity - Slide 6',
      img: '/branding/IMG-20260701-WA0005.jpg',
      aspect: '16/9',
    },
    {
      id: 206,
      category: 'branding',
      title: 'Avenirmark Brand Identity - Slide 7',
      img: '/branding/IMG-20260701-WA0006.jpg',
      aspect: '16/9',
    },
    {
      id: 207,
      category: 'branding',
      title: 'Avenirmark Brand Identity - Slide 8',
      img: '/branding/IMG-20260701-WA0007.jpg',
      aspect: '16/9',
    },
    {
      id: 208,
      category: 'branding',
      title: 'Avenirmark Brand Identity - Slide 9',
      img: '/branding/IMG-20260701-WA0008.jpg',
      aspect: '16/9',
    },
    {
      id: 209,
      category: 'branding',
      title: 'Avenirmark Brand Identity - Slide 10',
      img: '/branding/IMG-20260701-WA0009.jpg',
      aspect: '16/9',
    },
    {
      id: 210,
      category: 'branding',
      title: 'Avenirmark Brand Identity - Slide 11',
      img: '/branding/IMG-20260701-WA0010.jpg',
      aspect: '16/9',
    },
    {
      id: 211,
      category: 'branding',
      title: 'Avenirmark Brand Identity - Slide 12',
      img: '/branding/IMG-20260701-WA0011.jpg',
      aspect: '16/9',
    },
    {
      id: 212,
      category: 'branding',
      title: 'Avenirmark Brand Identity - Slide 13',
      img: '/branding/IMG-20260701-WA0012.jpg',
      aspect: '16/9',
    },
    {
      id: 213,
      category: 'branding',
      title: 'Avenirmark Brand Identity - Slide 14',
      img: '/branding/IMG-20260701-WA0013.jpg',
      aspect: '16/9',
    },
    {
      id: 214,
      category: 'branding',
      title: 'Avenirmark Brand Identity - Slide 15',
      img: '/branding/IMG-20260701-WA0014.jpg',
      aspect: '16/9',
    },
    {
      id: 215,
      category: 'branding',
      title: 'Avenirmark Brand Identity - Slide 16',
      img: '/branding/IMG-20260701-WA0015.jpg',
      aspect: '16/9',
    },
    {
      id: 216,
      category: 'branding',
      title: 'Avenirmark Brand Identity - Slide 17',
      img: '/branding/IMG-20260701-WA0016.jpg',
      aspect: '16/9',
    },
    {
      id: 217,
      category: 'branding',
      title: 'Avenirmark Brand Identity - Slide 18',
      img: '/branding/IMG-20260701-WA0017.jpg',
      aspect: '16/9',
    },
    {
      id: 218,
      category: 'branding',
      title: 'Avenirmark Brand Identity - Slide 19',
      img: '/branding/IMG-20260701-WA0018.jpg',
      aspect: '16/9',
    },
    {
      id: 219,
      category: 'branding',
      title: 'Avenirmark Brand Identity - Slide 20',
      img: '/branding/IMG-20260701-WA0019.jpg',
      aspect: '16/9',
    },
    {
      id: 220,
      category: 'branding',
      title: 'Avenirmark Brand Identity - Slide 21',
      img: '/branding/IMG-20260701-WA0020.jpg',
      aspect: '16/9',
    },
    {
      id: 221,
      category: 'branding',
      title: 'Avenirmark Brand Identity - Slide 22',
      img: '/branding/IMG-20260701-WA0021.jpg',
      aspect: '16/9',
    },
    {
      id: 222,
      category: 'branding',
      title: 'Avenirmark Brand Identity - Slide 23',
      img: '/branding/IMG-20260701-WA0022.jpg',
      aspect: '16/9',
    },
    {
      id: 223,
      category: 'branding',
      title: 'Avenirmark Brand Identity - Slide 24',
      img: '/branding/IMG-20260701-WA0023.jpg',
      aspect: '16/9',
    },
    {
      id: 224,
      category: 'branding',
      title: 'Avenirmark Brand Identity - Slide 25',
      img: '/branding/IMG-20260701-WA0024.jpg',
      aspect: '16/9',
    },
    {
      id: 225,
      category: 'branding',
      title: 'Avenirmark Brand Identity - Slide 26',
      img: '/branding/IMG-20260701-WA0025.jpg',
      aspect: '16/9',
    },
    {
      id: 226,
      category: 'branding',
      title: 'Avenirmark Brand Identity - Slide 27',
      img: '/branding/IMG-20260701-WA0026.jpg',
      aspect: '16/9',
    },
    {
      id: 227,
      category: 'branding',
      title: 'Avenirmark Brand Identity - Slide 28',
      img: '/branding/IMG-20260701-WA0027.jpg',
      aspect: '16/9',
    },
    {
      id: 228,
      category: 'branding',
      title: 'Avenirmark Brand Identity - Slide 29',
      img: '/branding/IMG-20260701-WA0028.jpg',
      aspect: '16/9',
    },
    {
      id: 229,
      category: 'branding',
      title: 'Avenirmark Brand Identity - Slide 30',
      img: '/branding/IMG-20260701-WA0029.jpg',
      aspect: '16/9',
    },
    {
      id: 230,
      category: 'branding',
      title: 'Avenirmark Brand Identity - Slide 31',
      img: '/branding/IMG-20260701-WA0030.jpg',
      aspect: '16/9',
    },
    {
      id: 231,
      category: 'branding',
      title: 'Avenirmark Brand Identity - Slide 32',
      img: '/branding/IMG-20260701-WA0031.jpg',
      aspect: '16/9',
    },
    {
      id: 232,
      category: 'branding',
      title: 'Avenirmark Brand Identity - Slide 33',
      img: '/branding/IMG-20260701-WA0032.jpg',
      aspect: '16/9',
    },
    {
      id: 233,
      category: 'branding',
      title: 'Avenirmark Brand Identity - Slide 34',
      img: '/branding/IMG-20260701-WA0033.jpg',
      aspect: '16/9',
    },
    {
      id: 234,
      category: 'branding',
      title: 'Avenirmark Brand Identity - Slide 35',
      img: '/branding/IMG-20260701-WA0034.jpg',
      aspect: '16/9',
    },
    {
      id: 235,
      category: 'branding',
      title: 'Avenirmark Brand Identity - Slide 36',
      img: '/branding/IMG-20260701-WA0035.jpg',
      aspect: '16/9',
    },
    {
      id: 236,
      category: 'branding',
      title: 'Avenirmark Brand Identity - Slide 37',
      img: '/branding/IMG-20260701-WA0036.jpg',
      aspect: '16/9',
    },
    {
      id: 237,
      category: 'branding',
      title: 'Avenirmark Brand Identity - Slide 38',
      img: '/branding/IMG-20260701-WA0037.jpg',
      aspect: '16/9',
    },
    {
      id: 238,
      category: 'branding',
      title: 'Avenirmark Brand Identity - Slide 39',
      img: '/branding/IMG-20260701-WA0038.jpg',
      aspect: '16/9',
    },
    {
      id: 239,
      category: 'branding',
      title: 'Avenirmark Brand Identity - Slide 40',
      img: '/branding/IMG-20260701-WA0039.jpg',
      aspect: '16/9',
    },
    {
      id: 240,
      category: 'branding',
      title: 'Avenirmark Brand Identity - Slide 41',
      img: '/branding/IMG-20260701-WA0040.jpg',
      aspect: '16/9',
    },
    {
      id: 241,
      category: 'branding',
      title: 'Avenirmark Brand Identity - Slide 42',
      img: '/branding/IMG-20260701-WA0041.jpg',
      aspect: '16/9',
    },
  ];

  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const cardRefs = useRef([]);

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    if (playSound) playSound('click');
  };

  const handleHover = () => {
    if (playSound) playSound('hover');
  };

  const openLightbox = (index) => {
    setLightboxIndex(index);
    if (playSound) playSound('click');
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    if (playSound) playSound('click');
  };

  const navigateLightbox = (direction) => {
    if (playSound) playSound('click');
    let nextIdx = lightboxIndex + direction;
    if (nextIdx < 0) nextIdx = filteredProjects.length - 1;
    if (nextIdx >= filteredProjects.length) nextIdx = 0;
    setLightboxIndex(nextIdx);
  };

  // Image hover skew and zoom animations via GSAP
  const handleCardMouseMove = (e, index) => {
    const card = cardRefs.current[index];
    if (!card) return;
    const img = card.querySelector('.portfolio-img');
    const overlay = card.querySelector('.portfolio-overlay');
    if (!img || !overlay) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(img, {
      scale: 1.12,
      x: x * 0.08,
      y: y * 0.08,
      rotationY: x * 0.05,
      rotationX: y * -0.05,
      duration: 0.4,
      ease: 'power2.out',
    });

    gsap.to(overlay, {
      background: `radial-gradient(circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(212, 175, 55, 0.25) 0%, transparent 60%)`,
      duration: 0.2,
    });
  };

  const handleCardMouseLeave = (index) => {
    const card = cardRefs.current[index];
    if (!card) return;
    const img = card.querySelector('.portfolio-img');
    const overlay = card.querySelector('.portfolio-overlay');
    if (!img || !overlay) return;

    gsap.to(img, {
      scale: 1.0,
      x: 0,
      y: 0,
      rotationY: 0,
      rotationX: 0,
      duration: 0.6,
      ease: 'power2.out',
    });

    gsap.to(overlay, {
      background: 'rgba(0,0,0,0.45)',
      duration: 0.4,
    });
  };

  return (
    <section id="portfolio" className="section" style={{ position: 'relative' }}>
      
      {/* Headings */}
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
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
          Project Highlights
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ marginBottom: '1.2rem' }}
        >
          Selected Works & Highlights
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ maxWidth: '600px', margin: '0 auto', marginBottom: '2rem' }}
        >
          Explore a showcase of luxury branding identity campaigns, high-performance websites, engagement templates, and corporate publications.
        </motion.p>

        {/* Download Portfolio PDF Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ marginTop: '1.8rem' }}
        >
          <a
            href="/AvenirMark_Portfolio_Updated.pdf"
            download="AvenirMark_Portfolio_Updated.pdf"
            className="btn-premium glow-accent"
            onMouseEnter={handleHover}
            onClick={() => {
              if (playSound) playSound('click');
            }}
            style={{ cursor: 'none' }}
          >
            <Briefcase size={18} />
            Download Complete Portfolio PDF
          </a>
        </motion.div>
      </div>

      {/* Categories Filter Tabs */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '0.8rem',
          marginBottom: '4rem',
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat.id)}
            onMouseEnter={handleHover}
            style={{
              background: activeCategory === cat.id ? 'var(--accent)' : 'rgba(15, 23, 42, 0.03)',
              border: activeCategory === cat.id ? '1px solid var(--accent)' : '1px solid var(--border)',
              color: activeCategory === cat.id ? '#050505' : 'var(--text-secondary)',
              padding: '0.7rem 1.6rem',
              borderRadius: '50px',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '0.9rem',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
              boxShadow: activeCategory === cat.id ? 'var(--shadow-glow)' : 'none',
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid gallery layout with exit/enter animated frames */}
      <motion.div
        layout
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '2rem',
          perspective: 1000,
        }}
        className="portfolio-grid"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              ref={(el) => (cardRefs.current[idx] = el)}
              onMouseMove={(e) => handleCardMouseMove(e, idx)}
              onMouseLeave={() => handleCardMouseLeave(idx)}
              onClick={() => openLightbox(idx)}
              onMouseEnter={handleHover}
              style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                aspectRatio: '16/10',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                boxShadow: 'var(--shadow-sm)',
                transformStyle: 'preserve-3d',
              }}
              className="portfolio-card"
            >
              {/* Project Image */}
              <img
                src={project.img}
                alt={project.title}
                className="portfolio-img"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.4s ease',
                  transformOrigin: 'center center',
                }}
              />

              {/* Glowing Overlay */}
              <div
                className="portfolio-overlay"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(0,0,0,0.45)',
                  zIndex: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '2rem',
                  opacity: 0,
                  transition: 'opacity 0.4s ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 800 }}>
                      {project.category === 'luxury' ? 'Luxury Identity' : project.category === 'web' ? 'Web Design' : project.category === 'social' ? 'Social Media' : project.category === 'branding' ? 'Brand Identity' : 'Publication'}
                    </span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '0.2rem' }}>
                      {project.title}
                    </h3>
                  </div>
                  
                  {/* Plus Zoom Icon */}
                  <div
                    style={{
                      width: '45px',
                      height: '45px',
                      borderRadius: '50%',
                      background: 'var(--accent)',
                      color: '#050505',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: 'var(--shadow-glow)',
                    }}
                  >
                    <Plus size={22} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox full-screen modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
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
              backgroundColor: 'rgba(3,3,3,0.95)',
              backdropFilter: 'blur(15px)',
              WebkitBackdropFilter: 'blur(15px)',
              zIndex: 100000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              onMouseEnter={handleHover}
              style={{
                position: 'absolute',
                top: '2rem',
                right: '2rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
              }}
              className="lightbox-btn"
            >
              <X size={24} />
            </button>

            {/* Left Nav Arrow */}
            <button
              onClick={() => navigateLightbox(-1)}
              onMouseEnter={handleHover}
              style={{
                position: 'absolute',
                left: '2rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
              }}
              className="lightbox-btn"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Content Container */}
            <div
              style={{
                maxWidth: '900px',
                width: '90%',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                alignItems: 'center',
              }}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  width: '100%',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: 'var(--shadow-lg)',
                }}
              >
                <img
                  src={filteredProjects[lightboxIndex].img}
                  alt={filteredProjects[lightboxIndex].title}
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '70vh',
                    objectFit: 'contain',
                    display: 'block',
                    margin: '0 auto',
                    backgroundColor: '#0a0a0c',
                  }}
                />
              </motion.div>
              
              <div style={{ textAlign: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 800 }}>
                  Project {lightboxIndex + 1} of {filteredProjects.length}
                </span>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '0.4rem', fontFamily: 'var(--font-display)' }}>
                  {filteredProjects[lightboxIndex].title}
                </h2>
              </div>
            </div>

            {/* Right Nav Arrow */}
            <button
              onClick={() => navigateLightbox(1)}
              onMouseEnter={handleHover}
              style={{
                position: 'absolute',
                right: '2rem',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                width: '50px',
                height: '50px',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
              }}
              className="lightbox-btn"
            >
              <ChevronRight size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .portfolio-card:hover .portfolio-overlay {
          opacity: 1 !important;
        }
        .lightbox-btn:hover {
          background-color: var(--accent) !important;
          color: #050505 !important;
          box-shadow: var(--shadow-glow) !important;
        }
      `}</style>
    </section>
  );
}
