import React, { useState, useEffect, useCallback } from 'react';
import { 
  Images, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  MapPin, 
  Sliders, 
  Calendar,
  Info
} from 'lucide-react';
import { GALLERY_ITEMS } from '../data/photographyData';
import './Gallery.css';

const CATEGORIES = ['All', 'Weddings', 'Pre-Wedding', 'Engagement', 'Bridal', 'Maternity', 'Baby Shoot', 'Birthday'];

const Gallery = ({ onInquireStyle, onNavigateToContact }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null); // null means closed
  const [isZoomed, setIsZoomed] = useState(false);
  const [showInfoSidebar, setShowInfoSidebar] = useState(true);

  // Filter items
  const filteredItems = activeCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category.toLowerCase() === activeCategory.toLowerCase());

  // Prevent background scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [lightboxIndex]);

  // Lightbox navigation
  const openLightbox = (index) => {
    setLightboxIndex(index);
    setIsZoomed(false);
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    setIsZoomed(false);
  }, []);

  const nextLightbox = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev + 1) % filteredItems.length);
      setIsZoomed(false);
    }
  }, [lightboxIndex, filteredItems.length]);

  const prevLightbox = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
      setIsZoomed(false);
    }
  }, [lightboxIndex, filteredItems.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, closeLightbox, nextLightbox, prevLightbox]);

  const activePhoto = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  const handleInquireFromLightbox = (photo) => {
    closeLightbox();
    if (onInquireStyle) {
      onInquireStyle(`${photo.category} - ${photo.title}`);
    }
    if (onNavigateToContact) {
      onNavigateToContact();
    }
  };

  return (
    <section id="gallery" className="gallery-section section-spacing" aria-label="Portfolio Gallery">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Images size={13} />
            <span>CURATED ARCHIVE</span>
          </div>
          <h2 className="section-title">
            The Living Portfolio
          </h2>
          <p className="section-subtitle">
            Explore a curated selection of our recent commissions. Click any photograph to enter high-resolution exhibition mode with technical lens specifications.
          </p>
        </div>

        {/* Category Filter Buttons */}
        <div className="gallery-filter-bar" role="tablist" aria-label="Filter gallery by category">
          {CATEGORIES.map((cat) => {
            const count = cat === 'All' 
              ? GALLERY_ITEMS.length 
              : GALLERY_ITEMS.filter((i) => i.category.toLowerCase() === cat.toLowerCase()).length;
            const isActive = activeCategory === cat;

            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                className={`gallery-filter-btn ${isActive ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
                id={`filter-btn-${cat.toLowerCase()}`}
              >
                <span>{cat}</span>
                <span className="filter-count-pill">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Masonry / Grid Gallery */}
        <div className="gallery-grid" id="portfolio-masonry-grid">
          {filteredItems.map((item, index) => {
            return (
              <div
                key={item.id}
                className={`gallery-card aspect-${item.aspect}`}
                onClick={() => openLightbox(index)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(index);
                  }
                }}
                aria-label={`View ${item.title}, ${item.category}`}
                id={`gallery-item-${item.id}`}
              >
                <div className="gallery-image-wrapper">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="gallery-thumb-img"
                    loading="lazy"
                    width="800"
                    height={item.aspect === 'portrait' ? '1100' : item.aspect === 'square' ? '800' : '550'}
                  />
                  <div className="gallery-card-overlay" />
                  
                  {/* Hover Details */}
                  <div className="gallery-hover-content">
                    <span className="gallery-hover-category">{item.category}</span>
                    <h3 className="gallery-hover-title">{item.title}</h3>
                    
                    <div className="gallery-hover-meta">
                      <span className="hover-location">
                        <MapPin size={12} />
                        <span>{item.location}</span>
                      </span>
                      <span className="hover-exif">{item.exif}</span>
                    </div>

                    <div className="gallery-zoom-badge">
                      <Maximize2 size={16} />
                      <span>Examine</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Gallery Footer Note */}
        <div className="gallery-bottom-cta">
          <p className="gallery-archive-note">
            Showing {filteredItems.length} of {GALLERY_ITEMS.length} featured works. Our private physical archive contains over 10,000 heirloom frames.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => onNavigateToContact && onNavigateToContact()}
            id="gallery-request-full-archive-btn"
          >
            <span>Request Full Archive Catalog</span>
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && activePhoto && (
        <div 
          className="lightbox-overlay" 
          role="dialog" 
          aria-modal="true" 
          aria-label={activePhoto.title}
          id="gallery-lightbox-modal"
        >
          {/* Top Bar Controls */}
          <div className="lightbox-topbar">
            <div className="lightbox-counter">
              <span className="counter-current">0{lightboxIndex + 1}</span>
              <span className="counter-sep">/</span>
              <span className="counter-total">0{filteredItems.length}</span>
              <span className="lightbox-cat-badge">{activePhoto.category}</span>
            </div>

            <div className="lightbox-actions">
              <button
                className={`lightbox-action-btn ${isZoomed ? 'active' : ''}`}
                onClick={() => setIsZoomed(!isZoomed)}
                title={isZoomed ? 'Zoom Out' : 'Zoom In'}
                aria-label="Toggle image zoom"
                id="lightbox-zoom-toggle"
              >
                {isZoomed ? <ZoomOut size={18} /> : <ZoomIn size={18} />}
              </button>

              <button
                className={`lightbox-action-btn ${showInfoSidebar ? 'active' : ''}`}
                onClick={() => setShowInfoSidebar(!showInfoSidebar)}
                title="Toggle Photo Details"
                aria-label="Toggle details panel"
                id="lightbox-info-toggle"
              >
                <Info size={18} />
              </button>

              <button
                className="lightbox-action-btn close-btn"
                onClick={closeLightbox}
                title="Close Lightbox (Esc)"
                aria-label="Close Lightbox"
                id="lightbox-close-btn"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Lightbox Main Stage */}
          <div className="lightbox-stage">
            {/* Previous Navigation Button */}
            <button
              className="lightbox-nav-btn prev-btn"
              onClick={prevLightbox}
              aria-label="Previous photograph"
              id="lightbox-prev-btn"
            >
              <ChevronLeft size={28} />
            </button>

            {/* Image Viewer Frame */}
            <div className={`lightbox-image-container ${isZoomed ? 'zoomed' : ''}`}>
              <img
                src={activePhoto.image}
                alt={activePhoto.title}
                className="lightbox-main-img"
              />
            </div>

            {/* Next Navigation Button */}
            <button
              className="lightbox-nav-btn next-btn"
              onClick={nextLightbox}
              aria-label="Next photograph"
              id="lightbox-next-btn"
            >
              <ChevronRight size={28} />
            </button>

            {/* Collapsible Info Sidebar */}
            {showInfoSidebar && (
              <aside className="lightbox-sidebar">
                <div className="sidebar-header">
                  <span className="sidebar-category-pill">{activePhoto.category}</span>
                  <h3 className="sidebar-photo-title">{activePhoto.title}</h3>
                </div>

                {/* Location & Year */}
                <div className="sidebar-meta-row">
                  <div className="meta-item">
                    <MapPin size={14} className="meta-icon" />
                    <span>{activePhoto.location}</span>
                  </div>
                  <div className="meta-item">
                    <Calendar size={14} className="meta-icon" />
                    <span>{activePhoto.year}</span>
                  </div>
                </div>

                {/* Story narrative */}
                <div className="sidebar-narrative">
                  <h4 className="narrative-label">Curator&apos;s Field Note:</h4>
                  <p className="narrative-text">{activePhoto.story}</p>
                </div>

                {/* Technical EXIF Specifications */}
                <div className="sidebar-exif-card">
                  <div className="exif-title">
                    <Sliders size={13} />
                    <span>CAMERA & OPTICS DATA</span>
                  </div>
                  <div className="exif-grid">
                    <div className="exif-field">
                      <span className="exif-lbl">Body</span>
                      <span className="exif-val">{activePhoto.camera}</span>
                    </div>
                    <div className="exif-field">
                      <span className="exif-lbl">Optics</span>
                      <span className="exif-val">{activePhoto.lens}</span>
                    </div>
                    <div className="exif-field">
                      <span className="exif-lbl">Exposure</span>
                      <span className="exif-val">{activePhoto.exif}</span>
                    </div>
                    <div className="exif-field">
                      <span className="exif-lbl">Client</span>
                      <span className="exif-val">{activePhoto.client}</span>
                    </div>
                  </div>
                </div>

                {/* Direct Action */}
                <div className="sidebar-cta-wrap">
                  <button
                    className="btn btn-primary btn-block"
                    onClick={() => handleInquireFromLightbox(activePhoto)}
                    id="lightbox-inquire-btn"
                  >
                    <span>Inquire About This Style</span>
                  </button>
                </div>
              </aside>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
