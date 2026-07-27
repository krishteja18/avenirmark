import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, BookOpen, Share2, Check, MessageSquare, Tag, ArrowRight, User, Layers } from 'lucide-react';
import { navigateTo } from '../App';

export default function BlogDetail({ slug, playSound }) {
  const [blog, setBlog] = useState(null);
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Fetch blogs from API
    fetch('/api/blogs.php')
      .then((res) => {
        if (!res.ok) throw new Error('HTTP status not OK');
        return res.json();
      })
      .then((resData) => {
        if (resData && resData.success && Array.isArray(resData.data)) {
          setAllBlogs(resData.data);
          const found = resData.data.find((b) => b.slug === slug);
          setBlog(found || null);
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
            setAllBlogs(list);
            const found = list.find((b) => b.slug === slug);
            setBlog(found || null);
            setLoading(false);
          })
          .catch((jsonErr) => {
            console.error('Error fetching fallback json for detail:', jsonErr);
            setLoading(false);
          });
      });
  }, [slug]);

  const handleHover = () => {
    if (playSound) playSound('hover');
  };

  const handleClick = () => {
    if (playSound) playSound('click');
  };

  const handleShare = () => {
    handleClick();
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Safe and clean Markdown/HTML content parser
  const renderContent = (content) => {
    if (!content) return '';

    const isHtml = /<[a-z][\s\S]*>/i.test(content);
    if (isHtml) {
      return { __html: content };
    }

    let html = content
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/^### (.*?)$/gm, '<h3 class="blog-h3">$1</h3>')
      .replace(/^## (.*?)$/gm, '<h2 class="blog-h2">$1</h2>')
      .replace(/^# (.*?)$/gm, '<h1 class="blog-h1">$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^> (.*?)$/gm, '<blockquote class="blog-blockquote">$1</blockquote>')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="blog-link" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/^\s*[\*\-]\s+(.*?)$/gm, '<li class="blog-li">$1</li>')
      .replace(/\r\n/g, '\n')
      .replace(/\n\n+/g, '</p><p class="blog-p">')
      .replace(/\n/g, '<br />');

    if (!html.startsWith('<h')) {
      html = '<p class="blog-p">' + html + '</p>';
    }

    html = html.replace(/<p class="blog-p"><\/p>/g, '');
    html = html.replace(/(<li class="blog-li">.*?<\/li>)+/gs, '<ul class="blog-ul">$0</ul>');

    return { __html: html };
  };

  const getReadTime = (text) => {
    if (!text) return '3 min read';
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 225);
    return `${minutes} min read`;
  };

  // Other blogs excluding current post
  const existingBlogs = allBlogs.filter((b) => b.slug !== slug);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '10rem 2rem', color: 'var(--text-secondary)', minHeight: '80vh' }}>
        <div className="spinner" style={{
          width: '44px',
          height: '44px',
          border: '3px solid var(--border)',
          borderTop: '3px solid var(--accent)',
          borderRadius: '50%',
          margin: '0 auto 1.5rem auto',
          animation: 'spin 1s linear infinite'
        }} />
        <p style={{ fontWeight: 600 }}>Loading article...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '10rem 2rem', 
        maxWidth: '650px', 
        margin: '0 auto',
        minHeight: '80vh' 
      }}>
        <BookOpen size={48} style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', opacity: 0.4 }} />
        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>Article Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.8rem', marginBottom: '2.5rem', lineHeight: 1.6 }}>
          The article you are looking for does not exist, has been removed, or is currently saved as a draft.
        </p>
        <a 
          href="/blogs" 
          onClick={(e) => { e.preventDefault(); handleClick(); navigateTo('/blogs'); }}
          className="btn-premium"
          style={{ cursor: 'none' }}
        >
          <ArrowLeft size={16} /> Return to Journal
        </a>
      </div>
    );
  }

  return (
    <article style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', position: 'relative', paddingBottom: '6rem' }}>
      
      {/* Dynamic backdrop glow */}
      <div style={{
        position: 'absolute',
        top: 0, left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '1440px',
        height: '600px',
        background: 'radial-gradient(ellipse at 50% 0%, rgba(255, 222, 66, 0.05), transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* TOP CONTAINER */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '7rem 1.5rem 2rem 1.5rem', position: 'relative', zIndex: 1 }}>
        
        {/* Navigation & Action Header (Sticky) */}
        <div 
          style={{ 
            position: 'sticky',
            top: '98px',
            zIndex: 40,
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '0.85rem 1.6rem',
            marginBottom: '2.5rem',
            background: 'var(--bg-primary)',
            borderRadius: '50px',
            border: '1px solid var(--border)',
            boxShadow: '0 8px 30px rgba(27, 39, 81, 0.08)',
            transition: 'all 0.3s ease'
          }}
          className="blog-top-sticky-nav"
        >
          <a
            href="/blogs"
            onClick={(e) => { e.preventDefault(); handleClick(); navigateTo('/blogs'); }}
            onMouseEnter={handleHover}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--text-primary)',
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: '0.9rem',
              transition: 'color 0.2s',
              cursor: 'none'
            }}
            className="back-link"
          >
            <ArrowLeft size={16} style={{ color: 'var(--accent)' }} /> Back to Journal
          </a>

          <button
            onClick={handleShare}
            onMouseEnter={handleHover}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'var(--bg-primary)',
              border: '1px solid var(--border)',
              padding: '0.5rem 1.2rem',
              borderRadius: '50px',
              color: 'var(--text-primary)',
              fontWeight: 700,
              fontSize: '0.85rem',
              transition: 'all 0.2s',
              cursor: 'none'
            }}
          >
            {copied ? (
              <>
                <Check size={15} style={{ color: '#10B981' }} /> Link Copied!
              </>
            ) : (
              <>
                <Share2 size={15} /> Share Article
              </>
            )}
          </button>
        </div>

        {/* 3-COLUMN RESPONSIVE LAYOUT (Left Sticky: Existing Blogs | Center: Main Scrollable Article | Right Sticky: Sidebar Cards) */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: '270px minmax(0, 1fr) 320px',
            gap: '2.5rem',
            alignItems: 'start',
            marginTop: '1.5rem'
          }}
          className="blog-detail-3col-grid"
        >
          {/* LEFT COLUMN: Sticky Existing Blogs List */}
          <aside 
            style={{ 
              position: 'sticky', 
              top: '135px', 
              alignSelf: 'start',
              display: 'flex', 
              flexDirection: 'column', 
              gap: '1.2rem',
              maxHeight: 'calc(100vh - 150px)',
              overflowY: 'auto',
              paddingBottom: '3rem'
            }} 
            className="blog-sticky-sidebar left-sidebar"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0 0.4rem 0.2rem 0.4rem' }}>
              <Layers size={15} style={{ color: 'var(--accent)' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--accent)' }}>
                Existing Blogs
              </span>
            </div>

            {existingBlogs.length === 0 ? (
              <div style={{
                background: 'var(--bg-secondary)',
                borderRadius: '20px',
                padding: '1.4rem',
                border: '1px solid var(--border)',
                color: 'var(--text-muted)',
                fontSize: '0.85rem'
              }}>
                No other published articles yet.
              </div>
            ) : (
              existingBlogs.map((item) => (
                <a
                  key={item.id}
                  href={`/blog/${item.slug}`}
                  onClick={(e) => { e.preventDefault(); handleClick(); navigateTo(`/blog/${item.slug}`); }}
                  onMouseEnter={handleHover}
                  style={{
                    textDecoration: 'none',
                    display: 'block',
                    padding: '1.1rem',
                    borderRadius: '20px',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'all 0.25s ease',
                  }}
                  className="existing-blog-item"
                >
                  {item.bannerImage && (
                    <div style={{ width: '100%', height: '100px', borderRadius: '12px', overflow: 'hidden', marginBottom: '0.7rem', background: '#1b2751' }}>
                      <img 
                        src={item.bannerImage} 
                        alt={item.title} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      />
                    </div>
                  )}
                  <h4 style={{
                    fontSize: '0.92rem',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    lineHeight: 1.35,
                    margin: '0 0 0.4rem 0',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    fontFamily: 'var(--font-display)'
                  }}>
                    {item.title}
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                      {formatDate(item.createdAt)}
                    </span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                      Read <ArrowRight size={12} />
                    </span>
                  </div>
                </a>
              ))
            )}
          </aside>

          {/* CENTER COLUMN: Scrollable Main Article Content */}
          <main style={{ width: '100%' }}>
            
            {/* Title & Excerpt Header */}
            <div style={{ marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.2rem', fontWeight: 600 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
                  <Tag size={14} /> Insights &amp; Strategy
                </span>
                <span>•</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Calendar size={14} /> {formatDate(blog.createdAt)}
                </span>
                <span>•</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Clock size={14} /> {getReadTime(blog.content)}
                </span>
              </div>

              <h1 style={{
                fontSize: 'clamp(2rem, 4.5vw, 3.4rem)',
                lineHeight: 1.15,
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                color: 'var(--text-primary)',
                letterSpacing: '-0.03em',
                marginBottom: '1.2rem'
              }}>
                {blog.title}
              </h1>

              {blog.shortDescription && (
                <p style={{
                  fontSize: '1.15rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  margin: 0
                }}>
                  {blog.shortDescription}
                </p>
              )}
            </div>

            {/* Banner Image */}
            {blog.bannerImage && (
              <div style={{
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--border)',
                marginBottom: '3rem',
                width: '100%',
                maxHeight: '500px',
                background: '#1b2751'
              }}>
                <img
                  src={blog.bannerImage}
                  alt={blog.bannerImageAlt || blog.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    maxHeight: '500px',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </div>
            )}

            {/* Main Rendered Text Content */}
            <div 
              className="blog-content-body"
              dangerouslySetInnerHTML={renderContent(blog.content)}
              style={{
                fontSize: '1.1rem',
                lineHeight: 1.78,
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)',
              }}
            />

            {/* Bottom Author Sign-off Footer */}
            <div style={{
              marginTop: '4rem',
              paddingTop: '2rem',
              borderTop: '1px solid var(--border)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #1b2751, #0F172A)',
                  color: 'var(--accent)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: '1rem',
                  border: '2px solid var(--border)'
                }}>
                  AM
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>Written by Avenirmark Editorial</h4>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Digital Strategy &amp; Brand Systems Specialists</span>
                </div>
              </div>

              <a
                href="/blogs"
                onClick={(e) => { e.preventDefault(); handleClick(); navigateTo('/blogs'); }}
                onMouseEnter={handleHover}
                className="btn-premium-outline"
                style={{ padding: '0.65rem 1.4rem', fontSize: '0.85rem' }}
              >
                <ArrowLeft size={14} /> Back to All Posts
              </a>
            </div>

            {/* WhatsApp Contact Banner */}
            <div style={{
              marginTop: '2rem',
              padding: '1.5rem 1.8rem',
              borderRadius: '24px',
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, var(--bg-secondary) 100%)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.2rem',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: '#10B981',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
                  flexShrink: 0
                }}>
                  <MessageSquare size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                    Have questions about this article?
                  </h4>
                  <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                    For more details, contact us directly on WhatsApp.
                  </span>
                </div>
              </div>

              <a
                href={`https://wa.me/919966093777?text=Hi%20AvenirMark,%20I%20read%20your%20blog%20post%20"${encodeURIComponent(blog.title)}"%20and%20would%20like%20more%20details.`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClick}
                onMouseEnter={handleHover}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  background: '#10B981',
                  color: '#FFFFFF',
                  padding: '0.75rem 1.6rem',
                  borderRadius: '50px',
                  fontWeight: 800,
                  fontSize: '0.88rem',
                  textDecoration: 'none',
                  boxShadow: '0 4px 15px rgba(16, 185, 129, 0.25)',
                  transition: 'all 0.25s ease',
                  cursor: 'none'
                }}
                className="whatsapp-contact-btn"
              >
                <MessageSquare size={16} /> Contact on WhatsApp
              </a>
            </div>
          </main>

          {/* RIGHT COLUMN: Sticky Sidebar Cards */}
          <aside 
            style={{ 
              position: 'sticky', 
              top: '135px', 
              alignSelf: 'start',
              display: 'flex', 
              flexDirection: 'column', 
              gap: '1.4rem',
              maxHeight: 'calc(100vh - 150px)',
              overflowY: 'auto',
              paddingBottom: '3rem'
            }}
            className="blog-sticky-sidebar right-sidebar"
          >
            {/* Publisher Profile Card */}
            <div style={{
              background: 'var(--bg-secondary)',
              borderRadius: '24px',
              padding: '1.8rem',
              border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--accent)', display: 'block', marginBottom: '0.8rem' }}>
                Published By
              </span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, fontFamily: 'var(--font-display)' }}>
                Avenirmark Agency
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginTop: '0.5rem', marginBottom: '1.5rem' }}>
                Banjara Hills digital growth agency specializing in branding, high-conversion web portals, and AI systems.
              </p>
              
              <a
                href="https://wa.me/919966093777?text=Hi%20AvenirMark,%20I%20read%20your%20blog%20post%20and%20want%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClick}
                onMouseEnter={handleHover}
                className="btn-premium"
                style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem', padding: '0.8rem' }}
              >
                <MessageSquare size={15} /> Talk to Strategist
              </a>
            </div>

            {/* Growth Consultation Widget */}
            <div style={{
              background: 'linear-gradient(135deg, #1b2751 0%, #0F172A 100%)',
              borderRadius: '24px',
              padding: '1.8rem',
              color: '#FFFFFF',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 15px 35px rgba(27,39,81,0.15)'
            }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--accent)' }}>
                Growth Opportunity
              </span>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', margin: '0.5rem 0 0.8rem 0', fontFamily: 'var(--font-display)' }}>
                Need help scaling your brand?
              </h4>
              <p style={{ fontSize: '0.85rem', color: '#CBD5E1', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                Book a 1-on-1 strategy session to audit your digital funnel and deploy high-converting campaigns.
              </p>

              <a
                href="#contact"
                onClick={handleClick}
                onMouseEnter={handleHover}
                className="btn-premium"
                style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem', padding: '0.8rem', background: '#FFFFFF', color: '#1b2751', border: '1px solid #FFFFFF' }}
              >
                Schedule Briefing <ArrowRight size={14} />
              </a>
            </div>
          </aside>

        </div>

      </div>

      {/* Global CSS & Responsive Media Queries */}
      <style>{`
        .existing-blog-item:hover {
          border-color: var(--accent) !important;
          transform: translateY(-3px);
        }
        .blog-sticky-sidebar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .blog-sticky-sidebar::-webkit-scrollbar {
          display: none;
        }
        .blog-content-body .blog-h1 {
          font-family: var(--font-display);
          font-size: 2.2rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 2.5rem 0 1rem 0;
          line-height: 1.25;
        }
        .blog-content-body .blog-h2 {
          font-family: var(--font-display);
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 2.2rem 0 1rem 0;
          line-height: 1.3;
        }
        .blog-content-body .blog-h3 {
          font-family: var(--font-display);
          font-size: 1.4rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 1.8rem 0 0.8rem 0;
        }
        .blog-content-body .blog-p {
          margin-bottom: 1.5rem;
          color: var(--text-secondary);
        }
        .blog-content-body .blog-blockquote {
          border-left: 4px solid var(--accent);
          padding: 1rem 1.5rem;
          margin: 2rem 0;
          background: var(--bg-secondary);
          border-radius: 0 16px 16px 0;
          font-style: italic;
          color: var(--text-primary);
          font-size: 1.15rem;
        }
        .blog-content-body .blog-ul {
          margin: 1.5rem 0;
          padding-left: 1.8rem;
        }
        .blog-content-body .blog-li {
          margin-bottom: 0.6rem;
          color: var(--text-secondary);
        }
        .blog-content-body .blog-link {
          color: var(--accent);
          text-decoration: underline;
          font-weight: 700;
        }
        @media (max-width: 1180px) {
          .blog-detail-3col-grid {
            grid-template-columns: minmax(0, 1fr) 300px !important;
            gap: 2rem !important;
          }
          .left-sidebar {
            display: none !important;
          }
        }
        @media (max-width: 768px) {
          .blog-detail-3col-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .right-sidebar {
            position: relative !important;
            top: 0 !important;
            max-height: none !important;
          }
        }
      `}</style>
    </article>
  );
}
