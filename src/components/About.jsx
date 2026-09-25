import React, { useState } from 'react';
import { Camera, Eye, Palette, HeartHandshake, ShieldCheck, Sliders, CheckCircle2, Award } from 'lucide-react';
import { ABOUT_DETAILS } from '../data/photographyData';
import './About.css';

const About = ({ onBookConsultation, onViewGallery }) => {
  const [activeTab, setActiveTab] = useState('philosophy');

  const traitIcons = [
    <Eye key="eye" size={24} className="trait-icon" />,
    <Palette key="pal" size={24} className="trait-icon" />,
    <HeartHandshake key="hh" size={24} className="trait-icon" />,
    <ShieldCheck key="sc" size={24} className="trait-icon" />
  ];

  return (
    <section id="about" className="about-section section-spacing" aria-label="About the Studio">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Camera size={13} />
            <span>THE ATELIER & ARTIST</span>
          </div>
          <h2 className="section-title">
            The Vision Behind the Lens
          </h2>
          <p className="section-subtitle">
            We believe the most profound photographs are not staged orchestrations, but honest, unrepeatable fragments of human emotion.
          </p>
        </div>

        {/* Lead Photographer Story Grid */}
        <div className="about-grid">
          {/* Left Column: Visual Showcase & Floating Quote */}
          <div className="about-visual-column">
            <div className="about-image-frame">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=900"
                alt="Alexandros Alex Rivera, Founder and Master Photographer"
                className="about-portrait-img"
                loading="lazy"
                width="600"
                height="750"
              />
              <div className="about-image-gradient" />

              {/* Floating Artist Tag */}
              <div className="about-artist-badge">
                <span className="artist-name">{ABOUT_DETAILS.founderName}</span>
                <span className="artist-title">{ABOUT_DETAILS.founderTitle}</span>
              </div>

              {/* Floating Award Pill */}
              <div className="about-award-tag">
                <Award size={18} className="award-star" />
                <div>
                  <span className="award-label">International Master of Light</span>
                  <span className="award-year">2024–2025</span>
                </div>
              </div>
            </div>

            {/* Studio Atelier secondary photo */}
            <div className="about-sub-image-card">
              <img
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=600"
                alt="Jump Click's Manhattan Studio Atelier"
                className="about-studio-img"
                loading="lazy"
              />
              <span className="sub-image-caption">Studio 4 Atelier • Manhattan, NY</span>
            </div>
          </div>

          {/* Right Column: Narrative, Experience & Philosophy */}
          <div className="about-narrative-column">
            <div className="about-story-card glass-card">
              <span className="story-origin-tag">ESTABLISHED 2012 &bull; NEW YORK CITY</span>
              
              <h3 className="story-heading">
                Crafting Photographs That Outlive the Trends of Today
              </h3>

              <p className="story-paragraph">
                {ABOUT_DETAILS.bio}
              </p>

              {/* Featured Quote Block */}
              <blockquote className="about-quote-block">
                <p className="quote-text">{ABOUT_DETAILS.philosophy}</p>
                <cite className="quote-author">— Alexandros Rivera, Founder</cite>
              </blockquote>

              {/* Interactive Tabs: Philosophy vs Gear & Tech */}
              <div className="about-tab-nav">
                <button
                  className={`about-tab-btn ${activeTab === 'philosophy' ? 'active' : ''}`}
                  onClick={() => setActiveTab('philosophy')}
                  id="about-tab-philosophy"
                >
                  <Eye size={15} />
                  <span>Artistic DNA</span>
                </button>
                <button
                  className={`about-tab-btn ${activeTab === 'gear' ? 'active' : ''}`}
                  onClick={() => setActiveTab('gear')}
                  id="about-tab-gear"
                >
                  <Sliders size={15} />
                  <span>Gear & Technology</span>
                </button>
              </div>

              {/* Tab Content 1: Artistic DNA */}
              {activeTab === 'philosophy' && (
                <div className="tab-pane-traits">
                  <div className="traits-grid">
                    {ABOUT_DETAILS.signatureTraits.map((trait, index) => (
                      <div key={index} className="trait-card">
                        <div className="trait-icon-wrap">
                          {traitIcons[index]}
                        </div>
                        <div className="trait-content">
                          <h4 className="trait-title">{trait.title}</h4>
                          <p className="trait-desc">{trait.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab Content 2: Master Equipment */}
              {activeTab === 'gear' && (
                <div className="tab-pane-gear">
                  <p className="gear-intro">
                    We bring uncompromised technical integrity to every assignment, pairing rangefinder optics with industrial-grade high-speed lighting systems:
                  </p>
                  <ul className="gear-list">
                    {ABOUT_DETAILS.gearHighlights.map((gear, i) => (
                      <li key={i} className="gear-item">
                        <CheckCircle2 size={16} className="gear-check-icon" />
                        <span>{gear}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="gear-note">
                    Dual redundant backups are maintained on-site with encrypted off-site RAID redundancy on the day of shoot.
                  </div>
                </div>
              )}

              {/* About Action Row */}
              <div className="about-actions-row">
                <button
                  className="btn btn-primary"
                  onClick={() => onBookConsultation && onBookConsultation()}
                  id="about-meet-photographer-btn"
                >
                  <span>Book Private Consultation</span>
                </button>

                <button
                  className="btn btn-outline"
                  onClick={() => onViewGallery && onViewGallery()}
                  id="about-view-selected-works-btn"
                >
                  <span>View Selected Works</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
