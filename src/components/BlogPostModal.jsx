import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Upload, Check, AlertCircle } from 'lucide-react';

export default function BlogPostModal({ 
  isOpen, 
  onClose, 
  onSave, 
  editPost, 
  csrfToken, 
  playSound 
}) {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [bannerImage, setBannerImage] = useState('');
  const [bannerImageAlt, setBannerImageAlt] = useState('');
  const [content, setContent] = useState('');
  const [contentTab, setContentTab] = useState('markdown'); // 'markdown' | 'html'
  const [published, setPublished] = useState(false);
  
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editPost) {
      setTitle(editPost.title || '');
      setSlug(editPost.slug || '');
      setShortDescription(editPost.shortDescription || '');
      setBannerImage(editPost.bannerImage || '');
      setBannerImageAlt(editPost.bannerImageAlt || '');
      setContent(editPost.content || '');
      setPublished(editPost.published || false);
      // Detect if content is html
      if (editPost.content && /<[a-z][\s\S]*>/i.test(editPost.content)) {
        setContentTab('html');
      } else {
        setContentTab('markdown');
      }
    } else {
      // Reset form
      setTitle('');
      setSlug('');
      setShortDescription('');
      setBannerImage('');
      setBannerImageAlt('');
      setContent('');
      setContentTab('markdown');
      setPublished(false);
    }
    setError('');
  }, [editPost, isOpen]);

  if (!isOpen) return null;

  const handleHover = () => {
    if (playSound) playSound('hover');
  };

  const handleClick = () => {
    if (playSound) playSound('click');
  };

  // Auto-generate slug from title
  const handleTitleChange = (e) => {
    const val = e.target.value;
    setTitle(val);
    if (!editPost) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // remove special chars
        .replace(/\s+/g, '-')         // replace spaces with dashes
        .replace(/-+/g, '-');        // collapse multiple dashes
      setSlug(generatedSlug);
    }
  };

  // Handle banner image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('Image exceeds maximum file size limit of 10MB.');
      return;
    }

    // Validate type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('Only JPG, PNG, and WebP images are allowed.');
      return;
    }

    setError('');
    setUploading(true);
    handleClick();

    const formData = new FormData();
    formData.append('bannerImage', file);

    fetch('/api/upload.php', {
      method: 'POST',
      headers: {
        'X-CSRF-Token': csrfToken
      },
      body: formData
    })
      .then((res) => res.json())
      .then((data) => {
        setUploading(false);
        if (data.success) {
          setBannerImage(data.url);
        } else {
          setError(data.message || 'Failed to upload image.');
        }
      })
      .catch((err) => {
        setUploading(false);
        console.error('Upload error:', err);
        setError('A server error occurred during image upload.');
      });
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    handleClick();
    setError('');

    if (!title.trim()) {
      setError('Post Title is required.');
      return;
    }
    if (!slug.trim()) {
      setError('URL Slug is required.');
      return;
    }

    setSaving(true);

    const postData = {
      title: title.trim(),
      slug: slug.trim(),
      shortDescription: shortDescription.trim(),
      bannerImage,
      bannerImageAlt: bannerImageAlt.trim(),
      content: content.trim(),
      published
    };

    if (editPost) {
      postData.id = editPost.id;
    }

    const method = editPost ? 'PUT' : 'POST';

    fetch('/api/blogs.php', {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken
      },
      body: JSON.stringify(postData)
    })
      .then((res) => res.json())
      .then((data) => {
        setSaving(false);
        if (data.success) {
          onSave(data.data, method === 'PUT');
          onClose();
        } else {
          setError(data.message || 'Failed to save blog post.');
        }
      })
      .catch((err) => {
        setSaving(false);
        console.error('Error saving post:', err);
        setError('A server error occurred while saving.');
      });
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(27, 39, 81, 0.45)',
        backdropFilter: 'blur(8px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
      }}
    >
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, cubicBezier: [0.16, 1, 0.3, 1] }}
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          background: '#FFFFFF',
          borderRadius: '24px',
          boxShadow: '0 25px 50px rgba(27, 39, 81, 0.25)',
          border: '1px solid rgba(27, 39, 81, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '1.8rem 2.2rem',
            borderBottom: '1px solid rgba(27, 39, 81, 0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.6rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              margin: 0
            }}
          >
            {editPost ? 'Edit Blog Post' : 'New Blog Post'}
          </h2>
          <button
            onClick={() => {
              handleClick();
              onClose();
            }}
            onMouseEnter={handleHover}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'none',
              display: 'flex',
              alignItems: 'center',
              padding: '0.4rem',
              borderRadius: '50%',
              transition: 'background 0.2s',
            }}
            className="modal-close-btn"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form 
          onSubmit={handleSubmit}
          data-lenis-prevent
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '2.2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.8rem'
          }}
          className="modal-form-scroll"
        >
          {error && (
            <div
              style={{
                background: 'rgba(239, 68, 68, 0.08)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: '12px',
                padding: '1rem',
                color: '#EF4444',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
              }}
            >
              <AlertCircle size={18} style={{ flexShrink: 0 }} />
              <span>{error}</span>
            </div>
          )}

          {/* Post Title */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label className="modal-label">
              Post Title <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <input
              required
              type="text"
              placeholder="e.g. How to reduce OTA commissions by 40%"
              value={title}
              onChange={handleTitleChange}
              onMouseEnter={handleHover}
              style={{
                padding: '0.9rem 1.2rem',
                borderRadius: '12px',
                border: '1px solid var(--border)',
                outline: 'none',
                fontSize: '0.95rem',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)',
                cursor: 'none',
                transition: 'all 0.3s ease'
              }}
              className="modal-input"
            />
          </div>

          {/* URL Slug */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label className="modal-label">
              URL Slug <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <input
              required
              type="text"
              placeholder="e.g. reduce-ota-commissions"
              value={slug}
              onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
              onMouseEnter={handleHover}
              style={{
                padding: '0.9rem 1.2rem',
                borderRadius: '12px',
                border: '1px solid var(--border)',
                outline: 'none',
                fontSize: '0.95rem',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)',
                cursor: 'none',
                transition: 'all 0.3s ease'
              }}
              className="modal-input"
            />
          </div>

          {/* Short Description */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label className="modal-label">
              Short Description (shown on blog list)
            </label>
            <textarea
              placeholder="Write a concise 1-2 sentence description of this article..."
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              onMouseEnter={handleHover}
              rows={3}
              style={{
                padding: '0.9rem 1.2rem',
                borderRadius: '12px',
                border: '1px solid var(--border)',
                outline: 'none',
                fontSize: '0.95rem',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)',
                resize: 'vertical',
                cursor: 'none',
                transition: 'all 0.3s ease'
              }}
              className="modal-textarea"
            />
          </div>

          {/* Banner Image Upload */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <label className="modal-label">Banner Image</label>
            
            <div 
              style={{
                border: '2px dashed var(--border)',
                borderRadius: '16px',
                padding: '2.5rem 1.5rem',
                textAlign: 'center',
                background: 'var(--bg-tertiary)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                transition: 'border-color 0.3s ease',
              }}
              className="image-upload-zone"
            >
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageChange}
                onMouseEnter={handleHover}
                style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0, bottom: 0,
                  opacity: 0,
                  cursor: 'none',
                  zIndex: 2
                }}
              />
              
              {uploading ? (
                <div style={{ color: 'var(--text-secondary)' }}>
                  <div className="spinner" style={{
                    width: '30px', height: '30px',
                    border: '3px solid var(--border)',
                    borderTop: '3px solid var(--accent)',
                    borderRadius: '50%',
                    margin: '0 auto 0.8rem auto',
                    animation: 'spin 1s linear infinite'
                  }} />
                  <p style={{ fontSize: '0.9rem' }}>Uploading banner image...</p>
                </div>
              ) : bannerImage ? (
                <div style={{ width: '100%', position: 'relative', zIndex: 1 }}>
                  <img
                    src={bannerImage}
                    alt="Upload Preview"
                    style={{
                      maxHeight: '160px',
                      maxWidth: '100%',
                      objectFit: 'cover',
                      borderRadius: '10px',
                      border: '1px solid var(--border)'
                    }}
                  />
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: '#10B981',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    marginTop: '0.8rem',
                    background: 'rgba(16,185,129,0.06)',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '20px'
                  }}>
                    <Check size={14} /> Image Uploaded Successfully
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{
                    width: '45px', height: '45px',
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    color: 'var(--text-muted)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    <Upload size={20} />
                  </div>
                  <p style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginTop: '0.4rem' }}>
                    Click to upload banner image
                  </p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    JPG, PNG, WebP — max 10 MB
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Banner Image Alt Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label className="modal-label">
              Banner Image Alt Text
            </label>
            <input
              type="text"
              placeholder="e.g. A hotel manager reviewing revenue analytics on laptop"
              value={bannerImageAlt}
              onChange={(e) => setBannerImageAlt(e.target.value)}
              onMouseEnter={handleHover}
              style={{
                padding: '0.9rem 1.2rem',
                borderRadius: '12px',
                border: '1px solid var(--border)',
                outline: 'none',
                fontSize: '0.95rem',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-body)',
                cursor: 'none',
                transition: 'all 0.3s ease'
              }}
              className="modal-input"
            />
          </div>

          {/* Content Area */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="modal-label">CONTENT</label>
              
              {/* HTML/Markdown tabs matching mockup */}
              <div 
                style={{ 
                  display: 'inline-flex', 
                  background: 'var(--bg-tertiary)', 
                  padding: '3px', 
                  borderRadius: '8px',
                  border: '1px solid var(--border)'
                }}
              >
                {['markdown', 'html'].map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => {
                      handleClick();
                      setContentTab(tab);
                    }}
                    onMouseEnter={handleHover}
                    style={{
                      padding: '0.4rem 0.9rem',
                      borderRadius: '6px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      textTransform: 'capitalize',
                      border: 'none',
                      background: contentTab === tab ? '#FFFFFF' : 'transparent',
                      color: contentTab === tab ? 'var(--text-primary)' : 'var(--text-secondary)',
                      boxShadow: contentTab === tab ? 'var(--shadow-sm)' : 'none',
                      transition: 'all 0.2s',
                      cursor: 'none'
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              required
              placeholder={
                contentTab === 'markdown' 
                  ? "# Heading\n\nWrite your full blog post in **Markdown** here...\n\n## Section Title\n\nParagraph text goes here.\n\n* Bullet one\n* Bullet two"
                  : "<h1>Heading</h1>\n<p>Write your full blog post in <strong>HTML</strong> here...</p>\n<h2>Section Title</h2>\n<p>Paragraph text goes here.</p>\n<ul>\n  <li>Bullet one</li>\n  <li>Bullet two</li>\n</ul>"
              }
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onMouseEnter={handleHover}
              rows={8}
              style={{
                padding: '1.2rem',
                borderRadius: '12px',
                border: '1px solid var(--border)',
                outline: 'none',
                fontSize: '0.95rem',
                color: 'var(--text-primary)',
                fontFamily: 'Consolas, Monaco, monospace', // monospaced editor font
                lineHeight: 1.5,
                resize: 'vertical',
                cursor: 'none',
                transition: 'all 0.3s ease'
              }}
              className="modal-textarea"
            />
          </div>

          {/* Publish Checkbox */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.5rem 0' }}>
            <input
              type="checkbox"
              id="publishCheckbox"
              checked={published}
              onChange={(e) => {
                handleClick();
                setPublished(e.target.checked);
              }}
              onMouseEnter={handleHover}
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '4px',
                border: '1px solid var(--border)',
                accentColor: 'var(--accent)',
                cursor: 'none'
              }}
            />
            <label 
              htmlFor="publishCheckbox"
              style={{ 
                fontSize: '0.95rem', 
                fontWeight: 600, 
                color: 'var(--text-primary)',
                userSelect: 'none',
                cursor: 'none'
              }}
              onMouseEnter={handleHover}
            >
              Publish this post <span style={{ 
                fontSize: '0.8rem', 
                fontWeight: 400, 
                color: 'var(--text-secondary)',
                marginLeft: '0.4rem'
              }}>
                {published ? 'Published - visible to everyone' : 'Draft - not visible'}
              </span>
            </label>
          </div>

          {/* Submit Actions Bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '1rem',
              marginTop: '1rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid rgba(27, 39, 81, 0.08)'
            }}
          >
            <button
              type="button"
              onClick={() => {
                handleClick();
                onClose();
              }}
              onMouseEnter={handleHover}
              style={{
                padding: '0.8rem 1.6rem',
                background: 'transparent',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
                borderRadius: '50px',
                fontSize: '0.9rem',
                fontWeight: 700,
                cursor: 'none',
                transition: 'all 0.3s'
              }}
              className="modal-cancel-btn"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              onMouseEnter={handleHover}
              style={{
                padding: '0.8rem 1.8rem',
                background: 'var(--text-primary)', // Slate Navy color matching screenshots
                color: '#FFFFFF',
                borderRadius: '50px',
                fontSize: '0.9rem',
                fontWeight: 700,
                cursor: 'none',
                border: '1px solid var(--text-primary)',
                transition: 'all 0.3s',
              }}
              className="modal-submit-btn"
            >
              {saving ? 'Saving...' : editPost ? 'Save Changes' : 'Create Post'}
            </button>
          </div>
        </form>
      </motion.div>

      <style>{`
        .modal-input:focus, .modal-textarea:focus {
          border-color: var(--accent) !important;
          box-shadow: 0 0 10px rgba(255, 222, 66, 0.2) !important;
        }
        .modal-label {
          font-size: 0.8rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-secondary);
        }
        .modal-close-btn:hover {
          background: rgba(27, 39, 81, 0.05) !important;
        }
        .modal-cancel-btn:hover {
          border-color: var(--text-primary) !important;
          color: var(--text-primary) !important;
        }
        .modal-submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-sm);
        }
        .modal-form-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .modal-form-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .modal-form-scroll::-webkit-scrollbar-thumb {
          background: rgba(27, 39, 81, 0.15);
          border-radius: 3px;
        }
        .modal-form-scroll::-webkit-scrollbar-thumb:hover {
          background: var(--text-muted);
        }
      `}</style>
    </div>
  );
}
