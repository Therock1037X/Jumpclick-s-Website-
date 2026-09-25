import React from 'react';
import { ArrowRight, Images, Sparkles, User, ChevronRight } from 'lucide-react';
import { SERVICES, GALLERY_ITEMS, ABOUT_DETAILS } from '../data/photographyData';
import './HomeHighlights.css';

const HomeHighlights = ({ onNavigateTab, onSelectService }) => {
  const featuredWorks = GALLERY_ITEMS.slice(0, 3);
  const featuredServices = SERVICES.slice(0, 3);

  const handleServiceSelect = (title) => {
    if (onSelectService) onSelectService(title);
    if (onNavigateTab) onNavigateTab('contact');
  };

  return (
    <div className="home-highlights-wrapper">
      {/* 1. Curated Portfolio Teaser Strip */}
      <section className="highlights-section section-spacing">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <Images size={13} />
              <span>SELECTED PREVIEWS</span>
            </div>
            <h2 className="section-title">
              Crafting Legacies Through Light
            </h2>
            <p className="section-subtitle">
              A brief glimpse into our recent fine-art commissions across weddings, editorial portraits, and luxury campaigns.
            </p>
          </div>

          <div className="home-preview-grid">
            {featuredWorks.map((item) => (
              <div 
                key={item.id} 
                className="home-preview-card glass-card"
                onClick={() => onNavigateTab('gallery')}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') onNavigateTab('gallery');
                }}
              >
                <div className="preview-image-wrap">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="preview-img"
                    loading="lazy"
                  />
                  <div className="preview-overlay" />
                  <div className="preview-badge-cat">{item.category}</div>
                </div>
                <div className="preview-info">
                  <span className="preview-loc">{item.location}</span>
                  <h3 className="preview-title">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="highlights-center-action">
            <button
              className="btn btn-primary btn-lg"
              onClick={() => onNavigateTab('gallery')}
              id="home-view-full-gallery-btn"
            >
              <span>Explore Complete Gallery (16 Works)</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 2. Meet The Artist Teaser Banner */}
      <section className="highlights-artist-banner">
        <div className="container">
          <div className="artist-banner-card glass-card">
            <div className="artist-banner-visual">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600"
                alt="Alexandros Rivera"
                className="artist-banner-avatar"
                loading="lazy"
              />
            </div>
            <div className="artist-banner-content">
              <span className="artist-banner-badge">FOUNDER & MASTER OF LIGHT</span>
              <h3 className="artist-banner-title">
                &ldquo;Every frame we click is a pact between shadow and light.&rdquo;
              </h3>
              <p className="artist-banner-desc">
                {ABOUT_DETAILS.bio.slice(0, 240)}...
              </p>
              <div className="artist-banner-action">
                <button
                  className="btn btn-outline"
                  onClick={() => onNavigateTab('about')}
                  id="home-read-story-btn"
                >
                  <User size={15} />
                  <span>Read Alexandros&apos; Full Story</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Signature Collections Overview Teaser */}
      <section className="highlights-services-section section-spacing">
        <div className="container">
          <div className="section-header">
            <div className="section-badge">
              <Sparkles size={13} />
              <span>COLLECTIONS</span>
            </div>
            <h2 className="section-title">
              Signature Offerings
            </h2>
            <p className="section-subtitle">
              Tailored creative packages designed with comprehensive coverage, rapid turnaround, and archival heirloom products.
            </p>
          </div>

          <div className="home-services-teaser-grid">
            {featuredServices.map((srv) => (
              <div key={srv.id} className="home-srv-card glass-card">
                <div className="home-srv-header">
                  <span className="home-srv-price">{srv.price}</span>
                  <span className="home-srv-pill">{srv.badge || srv.category}</span>
                </div>
                <h3 className="home-srv-title">{srv.title}</h3>
                <p className="home-srv-desc">{srv.description}</p>
                <div className="home-srv-footer">
                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleServiceSelect(srv.title)}
                  >
                    <span>Reserve Collection</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="highlights-center-action">
            <button
              className="btn btn-outline"
              onClick={() => onNavigateTab('services')}
              id="home-view-all-services-btn"
            >
              <span>View All 6 Signature Collections & Inclusions</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeHighlights;
