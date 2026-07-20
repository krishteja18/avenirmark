import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, BookOpen, Share2, Check, MessageSquare, Tag, ArrowRight, User } from 'lucide-react';

export default function BlogDetail({ slug, playSound }) {
  const [blog, setBlog] = useState(null);
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
      month: 'long',
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
          href="#blogs" 
          onClick={handleClick}
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
        maxWidth: '1400px',
        height: '600px',
        background: 'radial-gradient(ellipse at 50% 0%, rgba(255, 222, 66, 0.05), transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* TOP HERO CONTAINER (Wide 1240px Container) */}
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '7.5rem 1.5rem 2rem 1.5rem', position: 'relative', zIndex: 1 }}>
        
        {/* Navigation & Action Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '2.5rem'
        }}>
          <a
            href="#blogs"
            onClick={handleClick}
            onMouseEnter={handleHover}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--text-secondary)',
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
              background: 'var(--bg-secondary)',
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

        {/* Title & Excerpt Header Block */}
        <div style={{ maxWidth: '950px', marginBottom: '2.5rem' }}>
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
            fontSize: 'clamp(2.2rem, 5.5vw, 3.8rem)',
            lineHeight: 1.12,
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
              fontSize: '1.2rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              margin: 0
            }}>
              {blog.shortDescription}
            </p>
          )}
        </div>

        {/* MAIN 2-COLUMN LAYOUT (Content Left 68% + Sticky Sidebar Right 32%) */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) 340px',
            gap: '3.5rem',
            alignItems: 'start',
            marginTop: '2rem'
          }}
          className="blog-detail-grid"
        >
          {/* LEFT COLUMN: Main Banner Image & Article Body */}
          <div>
            {/* Banner Image */}
            {blog.bannerImage && (
              <div style={{
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-md)',
                border: '1px solid var(--border)',
                marginBottom: '3rem',
                width: '100%',
                maxHeight: '520px',
                background: '#1b2751'
              }}>
                <img
                  src={blog.bannerImage}
                  alt={blog.bannerImageAlt || blog.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    maxHeight: '520px',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              </div>
            )}

            {/* Render Content */}
            <div 
              className="blog-content-body"
              dangerouslySetInnerHTML={renderContent(blog.content)}
              style={{
                fontSize: '1.1rem',
                lineHeight: 1.75,
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
                href="#blogs"
                onClick={handleClick}
                onMouseEnter={handleHover}
                className="btn-premium-outline"
                style={{ padding: '0.65rem 1.4rem', fontSize: '0.85rem' }}
              >
                <ArrowLeft size={14} /> Back to All Posts
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: Sticky Interactive Sidebar */}
          <div style={{ position: 'sticky', top: '100px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Author Profile Card */}
            <div style={{
              background: 'var(--bg-secondary)',
              borderRadius: '24px',
              padding: '2rem',
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

            {/* Consultation CTA Widget */}
            <div style={{
              background: 'linear-gradient(135deg, #1b2751 0%, #0F172A 100%)',
              borderRadius: '24px',
              padding: '2rem',
              color: '#FFFFFF',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 15px 35px rgba(27,39,81,0.15)'
            }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--accent)' }}>
                Growth Opportunity
              </span>
              <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FFFFFF', margin: '0.5rem 0 0.8rem 0', fontFamily: 'var(--font-display)' }}>
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

          </div>

        </div>

      </div>

      {/* Global CSS for Blog Typography Parsing */}
      <style>{`
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
        @media (max-width: 900px) {
          .blog-detail-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </article>
  );
}
