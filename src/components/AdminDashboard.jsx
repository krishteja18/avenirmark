import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Plus, Edit2, Trash2, Globe, FileText, CheckCircle, Eye, Settings } from 'lucide-react';
import BlogPostModal from './BlogPostModal';

export default function AdminDashboard({ csrfToken, username, onLogout, playSound }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    // Load all blogs (including drafts)
    fetch('/api/blogs.php', {
      headers: {
        'Cache-Control': 'no-cache'
      }
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && Array.isArray(resData.data)) {
          setBlogs(resData.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching blogs in admin:', err);
        setLoading(false);
      });
  }, []);

  const handleHover = () => {
    if (playSound) playSound('hover');
  };

  const handleClick = () => {
    if (playSound) playSound('click');
  };

  const handleSaveSuccess = (savedPost, isEdit) => {
    if (isEdit) {
      setBlogs((prev) => prev.map((b) => (b.id === savedPost.id ? savedPost : b)));
    } else {
      setBlogs((prev) => [savedPost, ...prev]);
    }
  };

  const handleDelete = (id) => {
    handleClick();
    setDeleting(true);
    
    fetch('/api/blogs.php', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken
      },
      body: JSON.stringify({ id })
    })
      .then((res) => res.json())
      .then((data) => {
        setDeleting(false);
        setDeleteConfirmId(null);
        if (data.success) {
          setBlogs((prev) => prev.filter((b) => b.id !== id));
        } else {
          alert(data.message || 'Failed to delete post.');
        }
      })
      .catch((err) => {
        setDeleting(false);
        setDeleteConfirmId(null);
        console.error('Error deleting post:', err);
        alert('A server error occurred during deletion.');
      });
  };

  // Stats calculation
  const totalPosts = blogs.length;
  const publishedPosts = blogs.filter(b => b.published).length;
  const draftPosts = totalPosts - publishedPosts;

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#F8FAFC',
        color: '#1E293B',
        paddingTop: '6rem', // clear floating header
      }}
    >
      {/* Top Banner Bar */}
      <div 
        style={{
          background: '#1b2751',
          padding: '1.5rem 2rem',
          color: '#FFFFFF',
          borderBottom: '1px solid rgba(255, 222, 66, 0.15)',
          display: 'flex',
          justifyContent: 'between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <Settings size={22} style={{ color: 'var(--accent)' }} />
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFFFFF', margin: 0, fontFamily: 'var(--font-display)' }}>
              AvenirMark Platform
            </h1>
            <span style={{ fontSize: '0.75rem', color: '#94A3B8', fontWeight: 600 }}>
              SUPER ADMIN PORTAL
            </span>
          </div>
        </div>

        {/* Admin info & Logout */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>Logged in as</div>
            <div style={{ fontSize: '0.75rem', color: '#CBD5E1' }}>{username}</div>
          </div>
          <button
            onClick={() => {
              handleClick();
              onLogout();
            }}
            onMouseEnter={handleHover}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.15)',
              background: 'transparent',
              color: '#FFFFFF',
              fontSize: '0.85rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              transition: 'all 0.3s',
              cursor: 'none'
            }}
            className="logout-btn"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem' }}>
        
        {/* Stats Dashboard Grid */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
            gap: '1.5rem',
            marginBottom: '3rem'
          }}
        >
          {/* Card 1: Total */}
          <div style={{ background: '#FFFFFF', padding: '1.8rem', borderRadius: '16px', border: '1px solid rgba(27,39,81,0.06)', boxShadow: 'var(--shadow-sm)' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-secondary)' }}>
              Blog Posts
            </span>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.5rem', fontFamily: 'var(--font-display)' }}>
              {totalPosts}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <FileText size={12} /> Total posts in database
            </div>
          </div>

          {/* Card 2: Active */}
          <div style={{ background: '#FFFFFF', padding: '1.8rem', borderRadius: '16px', border: '1px solid rgba(27,39,81,0.06)', boxShadow: 'var(--shadow-sm)' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-secondary)' }}>
              Published
            </span>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#10B981', marginTop: '0.5rem', fontFamily: 'var(--font-display)' }}>
              {publishedPosts}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Globe size={12} style={{ color: '#10B981' }} /> Publicly visible articles
            </div>
          </div>

          {/* Card 3: Drafts */}
          <div style={{ background: '#FFFFFF', padding: '1.8rem', borderRadius: '16px', border: '1px solid rgba(27,39,81,0.06)', boxShadow: 'var(--shadow-sm)' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-secondary)' }}>
              Drafts
            </span>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#F59E0B', marginTop: '0.5rem', fontFamily: 'var(--font-display)' }}>
              {draftPosts}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <FileText size={12} style={{ color: '#F59E0B' }} /> Saved drafts
            </div>
          </div>
        </div>

        {/* Section Header */}
        <div 
          style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '1.8rem',
            borderBottom: '1px solid rgba(27,39,81,0.08)',
            paddingBottom: '1.2rem'
          }}
        >
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Blog Posts
          </h2>
          <button
            onClick={() => {
              setEditingPost(null);
              setModalOpen(true);
              handleClick();
            }}
            onMouseEnter={handleHover}
            style={{
              padding: '0.8rem 1.6rem',
              borderRadius: '50px',
              background: '#1b2751', // matching brown/slate button in screenshot
              border: 'none',
              color: '#FFFFFF',
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: 'var(--shadow-sm)',
              transition: 'transform 0.2s',
              cursor: 'none'
            }}
            className="new-post-btn"
          >
            <Plus size={16} /> New Post
          </button>
        </div>

        {/* Posts Table/List */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--text-secondary)' }}>
            <div className="spinner" style={{
              width: '40px', height: '40px',
              border: '3px solid var(--border)',
              borderTop: '3px solid var(--accent)',
              borderRadius: '50%',
              margin: '0 auto 1rem auto',
              animation: 'spin 1s linear infinite'
            }} />
            <p>Loading database posts...</p>
          </div>
        ) : blogs.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '5rem 2rem', 
            background: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid rgba(27,39,81,0.06)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <FileText size={48} style={{ color: '#94A3B8', marginBottom: '1.2rem', opacity: 0.5 }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>No posts created yet</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '0.95rem' }}>
              Create your very first blog post by clicking the "+ New Post" button above.
            </p>
          </div>
        ) : (
          <div 
            style={{ 
              background: '#FFFFFF', 
              borderRadius: '16px', 
              border: '1px solid rgba(27,39,81,0.06)', 
              boxShadow: 'var(--shadow-sm)',
              overflow: 'hidden'
            }}
          >
            {/* List Row */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
                <thead>
                  <tr style={{ background: '#F8FAFC', borderBottom: '1px solid rgba(27,39,81,0.06)' }}>
                    <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Image</th>
                    <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Article Title</th>
                    <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Slug</th>
                    <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Status</th>
                    <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Created</th>
                    <th style={{ padding: '1.2rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)' }}><span style={{ display: 'block', textAlign: 'right' }}>Actions</span></th>
                  </tr>
                </thead>
                <tbody>
                  {blogs.map((blog) => (
                    <tr 
                      key={blog.id} 
                      style={{ borderBottom: '1px solid rgba(27,39,81,0.06)', transition: 'background 0.2s' }}
                      className="dashboard-tr"
                    >
                      {/* Image Thumbnail */}
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <div style={{ width: '60px', height: '40px', borderRadius: '6px', overflow: 'hidden', background: '#1b2751', border: '1px solid rgba(27,39,81,0.08)' }}>
                          {blog.bannerImage ? (
                            <img src={blog.bannerImage} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.2)' }}>
                              <FileText size={16} />
                            </div>
                          )}
                        </div>
                      </td>
                      
                      {/* Title */}
                      <td style={{ padding: '1rem 1.5rem', maxWidth: '300px' }}>
                        <div style={{ fontWeight: 700, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {blog.title}
                        </div>
                      </td>

                      {/* Slug */}
                      <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                        <code>/{blog.slug}</code>
                      </td>

                      {/* Status */}
                      <td style={{ padding: '1rem 1.5rem' }}>
                        {blog.published ? (
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            color: '#065F46',
                            background: '#D1FAE5',
                            padding: '0.25rem 0.65rem',
                            borderRadius: '20px'
                          }}>
                            <CheckCircle size={12} /> Published
                          </span>
                        ) : (
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.3rem',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            color: '#92400E',
                            background: '#FEF3C7',
                            padding: '0.25rem 0.65rem',
                            borderRadius: '20px'
                          }}>
                            <FileText size={12} /> Draft
                          </span>
                        )}
                      </td>

                      {/* Created Date */}
                      <td style={{ padding: '1rem 1.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                        {formatDate(blog.createdAt)}
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '1rem 1.5rem' }}>
                        <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'flex-end', alignItems: 'center' }}>
                          {/* Public View link */}
                          {blog.published && (
                            <a
                              href={`/blog/${blog.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onMouseEnter={handleHover}
                              onClick={handleClick}
                              style={{
                                width: '32px', height: '32px',
                                borderRadius: '6px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                border: '1px solid rgba(27,39,81,0.1)',
                                color: 'var(--text-secondary)',
                                transition: 'all 0.2s',
                                cursor: 'none'
                              }}
                              title="View Article"
                              className="dash-action-btn"
                            >
                              <Eye size={14} />
                            </a>
                          )}
                          
                          {/* Edit button */}
                          <button
                            onClick={() => {
                              setEditingPost(blog);
                              setModalOpen(true);
                              handleClick();
                            }}
                            onMouseEnter={handleHover}
                            style={{
                              width: '32px', height: '32px',
                              borderRadius: '6px',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              border: '1px solid rgba(27,39,81,0.1)',
                              background: 'transparent',
                              color: 'var(--text-secondary)',
                              transition: 'all 0.2s',
                              cursor: 'none'
                            }}
                            title="Edit Post"
                            className="dash-action-btn"
                          >
                            <Edit2 size={14} />
                          </button>

                          {/* Delete button / confirm */}
                          {deleteConfirmId === blog.id ? (
                            <div style={{ display: 'flex', gap: '0.3rem', alignItems: 'center' }}>
                              <button
                                onClick={() => handleDelete(blog.id)}
                                disabled={deleting}
                                style={{
                                  padding: '0.25rem 0.5rem',
                                  fontSize: '0.75rem',
                                  fontWeight: 700,
                                  background: '#EF4444',
                                  color: '#FFFFFF',
                                  border: 'none',
                                  borderRadius: '4px',
                                  cursor: 'none'
                                }}
                              >
                                {deleting ? '...' : 'Yes'}
                              </button>
                              <button
                                onClick={() => {
                                  handleClick();
                                  setDeleteConfirmId(null);
                                }}
                                style={{
                                  padding: '0.25rem 0.5rem',
                                  fontSize: '0.75rem',
                                  fontWeight: 700,
                                  background: 'var(--bg-tertiary)',
                                  color: 'var(--text-secondary)',
                                  border: '1px solid var(--border)',
                                  borderRadius: '4px',
                                  cursor: 'none'
                                }}
                              >
                                No
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                handleClick();
                                setDeleteConfirmId(blog.id);
                              }}
                              onMouseEnter={handleHover}
                              style={{
                                width: '32px', height: '32px',
                                borderRadius: '6px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                border: '1px solid rgba(239, 68, 68, 0.1)',
                                background: 'transparent',
                                color: '#EF4444',
                                transition: 'all 0.2s',
                                cursor: 'none'
                              }}
                              title="Delete Post"
                              className="dash-delete-btn"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* BlogPostModal Container */}
      <BlogPostModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSaveSuccess}
        editPost={editingPost}
        csrfToken={csrfToken}
        playSound={playSound}
      />

      <style>{`
        .logout-btn:hover {
          background: rgba(255,255,255,0.08) !important;
          border-color: #FFFFFF !important;
        }
        .new-post-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(27,39,81,0.2) !important;
        }
        .dashboard-tr:hover {
          background: #F8FAFC !important;
        }
        .dash-action-btn:hover {
          border-color: var(--text-primary) !important;
          color: var(--text-primary) !important;
          background: rgba(27,39,81,0.03) !important;
        }
        .dash-delete-btn:hover {
          background: rgba(239,68,68,0.06) !important;
          border-color: #EF4444 !important;
        }
      `}</style>
    </div>
  );
}
