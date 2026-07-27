import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Search, ArrowRight, BookOpen } from 'lucide-react';
import { navigateTo } from '../App';

export default function BlogList({ playSound }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    // Fetch blogs from API
    fetch('/api/blogs.php')
      .then((res) => {
        if (!res.ok) throw new Error('HTTP status not OK');
        return res.json();
      })
      .then((resData) => {
        if (resData && resData.success && Array.isArray(resData.data)) {
          setBlogs(resData.data);
          setLoading(false);
        } else {
          throw new Error('Invalid JSON structure');
        }
      })
      .catch((err) => {
        console.warn('PHP API not available or invalid, trying static fallback:', err);
        fetch('/api/blogs.json')
          .then((res) => res.json())
          .then((jsonData) => {
            const list = Array.isArray(jsonData) ? jsonData : (jsonData && Array.isArray(jsonData.data) ? jsonData.data : []);
            setBlogs(list);
            setLoading(false);
          })
          .catch((jsonErr) => {
            console.error('Error fetching fallback json:', jsonErr);
            setLoading(false);
          });
      });
  }, []);

  const handleHover = () => {
    if (playSound) playSound('hover');
  };

  const handleClick = () => {
    if (playSound) playSound('click');
  };

  const filteredBlogs = blogs.filter((blog) => {
    const term = searchTerm.toLowerCase();
    return (
      (blog.title || '').toLowerCase().includes(term) ||
      (blog.shortDescription || '').toLowerCase().includes(term)
    );
  });

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section 
      style={{ 
        padding: '8rem 2rem 5rem 2rem', 
        minHeight: '80vh',
        backgroundColor: 'var(--bg-primary)',
        position: 'relative'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header Block */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
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
            Insights & Ideas
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
              lineHeight: 1.1,
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              color: 'var(--text-primary)',
            }}
          >
            The Avenirmark Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ 
              marginTop: '1.2rem',
              fontSize: '1.15rem', 
              color: 'var(--text-secondary)',
              maxWidth: '600px',
              margin: '1.2rem auto 0 auto'
            }}
          >
            Stay ahead of the curve with our thoughts on marketing, design, tech, and building premium brands.
          </motion.p>
        </div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            maxWidth: '500px',
            margin: '0 auto 3.5rem auto',
            position: 'relative'
          }}
        >
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search 
              size={18} 
              style={{ 
                position: 'absolute', 
                left: '1.2rem', 
                color: 'var(--text-secondary)' 
              }} 
            />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onMouseEnter={handleHover}
              style={{
                width: '100%',
                padding: '1rem 1rem 1rem 3rem',
                borderRadius: '50px',
                border: '1px solid var(--border)',
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)',
                outline: 'none',
                fontSize: '1rem',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.3s ease',
                cursor: 'none'
              }}
              className="blog-search-input"
            />
          </div>
        </motion.div>

        {/* Blog Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--text-secondary)' }}>
            <div className="spinner" style={{
              width: '40px',
              height: '40px',
              border: '3px solid var(--border)',
              borderTop: '3px solid var(--accent)',
              borderRadius: '50%',
              margin: '0 auto 1.5rem auto',
              animation: 'spin 1s linear infinite'
            }} />
            <p>Loading premium insights...</p>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '5rem 2rem', 
            background: 'var(--bg-tertiary)',
            borderRadius: '20px',
            border: '1px solid var(--border)'
          }}>
            <BookOpen size={48} style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', opacity: 0.5 }} />
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>No Articles Found</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              We couldn't find any articles matching your search criteria.
            </p>
          </div>
        ) : (
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
              gap: '2.5rem',
            }}
            className="blog-grid"
          >
            {filteredBlogs.map((blog, index) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                onMouseEnter={() => {
                  setHoveredCard(blog.id);
                  handleHover();
                }}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  background: 'var(--bg-secondary)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '1px solid var(--border)',
                  boxShadow: hoveredCard === blog.id ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
                  transform: hoveredCard === blog.id ? 'translateY(-8px)' : 'translateY(0)',
                  transition: 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.4s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                {/* Banner Image Container */}
                <div 
                  style={{ 
                    position: 'relative', 
                    width: '100%', 
                    paddingBottom: '56.25%', // 16:9 aspect ratio
                    overflow: 'hidden',
                    background: '#1b2751',
                  }}
                >
                  <img
                    src={blog.bannerImage || '/hero-workspace.jpg'}
                    alt={blog.bannerImageAlt || blog.title}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transform: hoveredCard === blog.id ? 'scale(1.06)' : 'scale(1)',
                      transition: 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)',
                    }}
                  />
                  {!blog.bannerImage && (
                    <div style={{
                      position: 'absolute',
                      top: 0, left: 0, right: 0, bottom: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'rgba(255, 255, 255, 0.25)'
                    }}>
                      <BookOpen size={48} />
                    </div>
                  )}
                </div>

                {/* Article Info */}
                <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                  {/* Date & Category */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.6rem',
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '1rem'
                  }}>
                    <Calendar size={14} style={{ color: 'var(--text-muted)' }} />
                    <span>{formatDate(blog.createdAt)}</span>
                  </div>

                  {/* Title */}
                  <h3 style={{ 
                    fontSize: '1.4rem', 
                    fontWeight: 800, 
                    lineHeight: 1.2,
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-display)',
                    marginBottom: '1rem',
                  }}>
                    <a 
                      href={`/blog/${blog.slug}`} 
                      onClick={(e) => {
                        e.preventDefault();
                        handleClick();
                        navigateTo(`/blog/${blog.slug}`);
                      }}
                      style={{ 
                        color: 'inherit', 
                        textDecoration: 'none',
                        cursor: 'none'
                      }}
                    >
                      {blog.title}
                    </a>
                  </h3>

                  {/* Short Description */}
                  <p style={{ 
                    fontSize: '0.95rem', 
                    color: 'var(--text-secondary)',
                    lineHeight: 1.5,
                    marginBottom: '1.5rem',
                    flexGrow: 1,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {blog.shortDescription}
                  </p>

                  {/* Read More link */}
                  <div style={{ marginTop: 'auto' }}>
                    <a
                      href={`/blog/${blog.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleClick();
                        navigateTo(`/blog/${blog.slug}`);
                      }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        color: hoveredCard === blog.id ? 'var(--text-primary)' : 'var(--text-muted)',
                        textDecoration: 'none',
                        transition: 'color 0.3s ease',
                        cursor: 'none'
                      }}
                    >
                      Read Article 
                      <motion.span
                        animate={{ x: hoveredCard === blog.id ? 5 : 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      >
                        <ArrowRight size={16} style={{ color: 'var(--accent)' }} />
                      </motion.span>
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .blog-search-input:focus {
          border-color: var(--accent) !important;
          box-shadow: 0 0 15px rgba(255, 222, 66, 0.15) !important;
        }
        @media (max-width: 768px) {
          .blog-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
