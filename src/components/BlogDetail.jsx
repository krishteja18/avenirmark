import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, BookOpen, Share2, Check } from 'lucide-react';

export default function BlogDetail({ slug, playSound }) {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch('/api/blogs.php')
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && Array.isArray(resData.data)) {
          const found = resData.data.find((b) => b.slug === slug);
          setBlog(found || null);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching blog detail:', err);
        setLoading(false);
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

    // If it contains HTML tags, render it as-is (trusted content from admin)
    const isHtml = /<[a-z][\s\S]*>/i.test(content);
    if (isHtml) {
      return { __html: content };
    }

    // Otherwise, parse basic Markdown rules to HTML
    let html = content
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      // Headings
      .replace(/^### (.*?)$/gm, '<h3 class="blog-h3">$1</h3>')
      .replace(/^## (.*?)$/gm, '<h2 class="blog-h2">$1</h2>')
      .replace(/^# (.*?)$/gm, '<h1 class="blog-h1">$1</h1>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Italics
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Blockquotes
      .replace(/^> (.*?)$/gm, '<blockquote class="blog-blockquote">$1</blockquote>')
      // Links [text](url)
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="blog-link" target="_blank" rel="noopener noreferrer">$1</a>')
      // List items * or -
      .replace(/^\s*[\*\-]\s+(.*?)$/gm, '<li class="blog-li">$1</li>')
      // Newlines / Paragraphs
      .replace(/\r\n/g, '\n')
      .replace(/\n\n+/g, '</p><p class="blog-p">')
      .replace(/\n/g, '<br />');

    // Wrap in initial paragraph if it doesn't start with heading
    if (!html.startsWith('<h')) {
      html = '<p class="blog-p">' + html + '</p>';
    }

    // Clean up empty paragraphs
    html = html.replace(/<p class="blog-p"><\/p>/g, '');
    
    // Group lists: wrap sibling <li> elements in <ul>
    html = html.replace(/(<li class="blog-li">.*?<\/li>)+/gs, '<ul class="blog-ul">$0</ul>');

    return { __html: html };
  };

  // Estimate read time
  const getReadTime = (text) => {
    if (!text) return '1 min read';
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / 225); // average reading speed
    return `${minutes} min read`;
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '10rem 2rem', color: 'var(--text-secondary)' }}>
        <div className="spinner" style={{
          width: '40px',
          height: '40px',
          border: '3px solid var(--border)',
          borderTop: '3px solid var(--accent)',
          borderRadius: '50%',
          margin: '0 auto 1.5rem auto',
          animation: 'spin 1s linear infinite'
        }} />
        <p>Loading article...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '10rem 2rem', 
        maxWidth: '600px', 
        margin: '0 auto' 
      }}>
        <BookOpen size={48} style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', opacity: 0.5 }} />
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)' }}>Article Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.8rem', marginBottom: '2rem' }}>
          The article you are looking for does not exist, has been removed, or is currently saved as a draft.
        </p>
        <a 
          href="#blogs" 
          onClick={handleClick}
          className="btn-premium"
          style={{ cursor: 'none' }}
        >
          <ArrowLeft size={16} /> Back to Blogs
        </a>
      </div>
    );
  }

  return (
    <article style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh', position: 'relative' }}>
      
      {/* Decorative backdrop glow */}
      <div style={{
        position: 'absolute',
        top: 0, left: '50%',
        transform: 'translateX(-50%)',
        width: '100%',
        maxWidth: '1400px',
        height: '600px',
        background: 'radial-gradient(circle at 50% 0%, rgba(255,222,66,0.035), transparent 70%)',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '8rem 1.5rem 6rem 1.5rem', position: 'relative', zIndex: 1 }}>
        
        {/* Navigation / Actions Bar */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '3rem'
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
              fontSize: '0.95rem',
              transition: 'color 0.3s ease',
              cursor: 'none'
            }}
            className="back-link"
          >
            <ArrowLeft size={16} style={{ color: 'var(--accent)' }} /> Back to Blogs
          </a>

          <button
            onClick={handleShare}
            onMouseEnter={handleHover}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              fontWeight: 600,
              fontSize: '0.9rem',
              transition: 'color 0.3s ease',
              cursor: 'none'
            }}
            className="share-btn"
          >
            {copied ? (
              <>
                <Check size={16} style={{ color: 'var(--accent)' }} /> Link Copied!
              </>
            ) : (
              <>
                <Share2 size={16} /> Share Link
              </>
            )}
          </button>
        </div>

        {/* Article Meta */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '1.5rem', 
          color: 'var(--text-secondary)',
          fontSize: '0.9rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={15} style={{ color: 'var(--text-muted)' }} />
            <span>{formatDate(blog.createdAt)}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Clock size={15} style={{ color: 'var(--text-muted)' }} />
            <span>{getReadTime(blog.content)}</span>
          </div>
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: 'clamp(2rem, 5vw, 3.2rem)',
          lineHeight: 1.15,
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          color: 'var(--text-primary)',
          marginBottom: '2rem'
        }}>
          {blog.title}
        </h1>

        {/* Banner Image */}
        {blog.bannerImage && (
          <div style={{
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid var(--border)',
            marginBottom: '3rem',
            width: '100%'
          }}>
            <img
              src={blog.bannerImage}
              alt={blog.bannerImageAlt || blog.title}
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                maxHeight: '500px',
                objectFit: 'cover'
              }}
            />
          </div>
        )}

        {/* Article Content Area */}
        <div 
          dangerouslySetInnerHTML={renderContent(blog.content)}
          className="blog-content-body"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.15rem',
            lineHeight: '1.8',
            color: 'var(--text-secondary)',
          }}
        />

      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .back-link:hover, .share-btn:hover {
          color: var(--text-primary) !important;
        }
        
        /* Rich Typography styles for blog body */
        .blog-content-body .blog-p {
          margin-bottom: 1.8rem;
        }
        .blog-content-body .blog-h1 {
          font-family: var(--font-display);
          font-size: 2.2rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 2.8rem 0 1.2rem 0;
          line-height: 1.2;
        }
        .blog-content-body .blog-h2 {
          font-family: var(--font-display);
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--text-primary);
          margin: 2.5rem 0 1.1rem 0;
          line-height: 1.2;
        }
        .blog-content-body .blog-h3 {
          font-family: var(--font-display);
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--text-primary);
          margin: 2.2rem 0 1rem 0;
          line-height: 1.2;
        }
        .blog-content-body .blog-blockquote {
          border-left: 4px solid var(--accent);
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: var(--text-primary);
          font-size: 1.25rem;
          background: var(--bg-tertiary);
          padding-top: 1rem;
          padding-bottom: 1rem;
          border-radius: 0 12px 12px 0;
        }
        .blog-content-body .blog-ul {
          margin-bottom: 1.8rem;
          padding-left: 1.5rem;
        }
        .blog-content-body .blog-li {
          margin-bottom: 0.6rem;
          list-style-type: square;
        }
        .blog-content-body .blog-link {
          color: var(--text-muted);
          text-decoration: underline;
          text-underline-offset: 3px;
          font-weight: 600;
          cursor: none;
        }
        .blog-content-body .blog-link:hover {
          color: var(--text-primary);
        }
        .blog-content-body strong {
          color: var(--text-primary);
          font-weight: 700;
        }
      `}</style>
    </article>
  );
}
