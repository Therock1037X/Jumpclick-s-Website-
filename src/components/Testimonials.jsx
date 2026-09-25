import React from 'react';
import { Star, Quote, Award } from 'lucide-react';
import { CLIENT_TESTIMONIALS } from '../data/photographyData';
import './Testimonials.css';

const PRESS_BADGES = [
  "VOGUE WEDDINGS",
  "HARPER'S BAZAAR",
  "ARCHITECTURAL DIGEST",
  "RANGEFINDER AWARDS",
  "NEW YORK TIMES STYLE"
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="testimonials-section section-spacing" aria-label="Client Praise & Reviews">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Award size={13} />
            <span>UNFILTERED PRAISE</span>
          </div>
          <h2 className="section-title">
            Words From Our Clients
          </h2>
          <p className="section-subtitle">
            From intimate mountain vow renewals to high-fashion commercial sets, hear what our collaborators cherish about working with Jump Click&apos;s.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="testimonials-grid">
          {CLIENT_TESTIMONIALS.map((item) => (
            <div 
              key={item.id} 
              className="testimonial-card glass-card"
            >
              <div className="testimonial-stars-row">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={15} className="star-filled" fill="currentColor" />
                ))}
              </div>

              <div className="testimonial-quote-wrap">
                <Quote size={28} className="quote-icon-decor" />
                <p className="testimonial-quote-text">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              <div className="testimonial-author-row">
                <img
                  src={item.image}
                  alt={item.client}
                  className="testimonial-avatar-img"
                  loading="lazy"
                />
                <div className="testimonial-author-meta">
                  <h4 className="author-name">{item.client}</h4>
                  <span className="author-role">{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Press Mentions Bar */}
        <div className="press-strip glass-card">
          <span className="press-label">AS FEATURED & RECOGNIZED IN:</span>
          <div className="press-badges-list">
            {PRESS_BADGES.map((press, i) => (
              <span key={i} className="press-badge-item">
                {press}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
