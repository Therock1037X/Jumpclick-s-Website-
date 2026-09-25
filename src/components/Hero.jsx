import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowDown, Sparkles, Award } from 'lucide-react';
import { HERO_SLIDES, STUDIO_INFO } from '../data/photographyData';
import './Hero.css';

const Hero = ({ onExploreGallery, onBookSession }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef(null);
  const slideDuration = 6000; // 6 seconds per slide

  const totalSlides = HERO_SLIDES.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    // Reset autoplay timer when manually clicked
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    autoPlayRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, slideDuration);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, totalSlides]);

  const activeSlide = HERO_SLIDES[currentSlide];

  return (
    <section id="home" className="hero-section" aria-label="Hero Showcase">
      {/* Background Slideshow Images */}
      <div className="hero-slideshow-container">
        {HERO_SLIDES.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`hero-slide-item ${isActive ? 'active' : ''}`}
              aria-hidden={!isActive}
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="hero-slide-image"
                // Performance rule: high fetchpriority for first slide (LCP)
                fetchPriority={index === 0 ? 'high' : 'low'}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
              <div className="hero-slide-overlay" />
            </div>
          );
        })}
      </div>

      {/* Cinematic Vignette Gradients */}
      <div className="hero-vignette-top" />
      <div className="hero-vignette-bottom" />

      {/* Main Content Box */}
      <div className="container hero-content-container">
        <div className="hero-text-block">
          {/* Studio Prestige Pill */}
          <div className="hero-prestige-badge animate-fade-in">
            <Sparkles size={14} className="badge-sparkle-icon" />
            <span>FINE ART & COMMERCIAL PHOTOGRAPHY STUDIO</span>
            <Award size={14} className="badge-award-icon" />
          </div>

          {/* Studio Title */}
          <h1 className="hero-studio-title animate-fade-in">
            JUMP CLICK&apos;S <span className="title-serif-accent">PHOTOGRAPHY</span>
          </h1>

          {/* Tagline */}
          <p className="hero-tagline animate-fade-in">
            {STUDIO_INFO.tagline}
          </p>

          <p className="hero-description animate-fade-in">
            Based in New York and traveling globally. We capture the unscripted poetry of luxury weddings, sculptural portraits, and high-impact commercial campaigns.
          </p>

          {/* Action CTAs */}
          <div className="hero-cta-group animate-fade-in">
            <a
              href="#gallery"
              className="btn btn-primary btn-lg"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('gallery');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                if (onExploreGallery) onExploreGallery();
              }}
              id="hero-explore-gallery-btn"
            >
              <span>Explore The Gallery</span>
            </a>

            <a
              href="#contact"
              className="btn btn-outline btn-lg"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                if (onBookSession) onBookSession();
              }}
              id="hero-book-session-btn"
            >
              <span>Reserve Your Date</span>
            </a>
          </div>

          {/* Active Slide Context Pill */}
          <div className="hero-slide-meta animate-fade-in">
            <span className="slide-counter-badge">
              0{currentSlide + 1} / 0{totalSlides}
            </span>
            <span className="slide-meta-divider">&bull;</span>
            <span className="slide-meta-category">{activeSlide.category}</span>
            <span className="slide-meta-divider">&bull;</span>
            <span className="slide-meta-location">{activeSlide.location}</span>
          </div>
        </div>
      </div>

      {/* Slideshow Controls Bar */}
      <div className="hero-controls-bar">
        <div className="hero-slide-indicators">
          {HERO_SLIDES.map((slide, index) => (
            <button
              key={slide.id}
              className={`hero-dot-btn ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}: ${slide.title}`}
              id={`hero-dot-${index}`}
            >
              <span className="dot-fill" />
            </button>
          ))}
        </div>

        <div className="hero-arrow-buttons">
          <button
            className="hero-arrow-btn"
            onClick={prevSlide}
            aria-label="Previous slide"
            id="hero-prev-slide-btn"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            className="hero-arrow-btn"
            onClick={nextSlide}
            aria-label="Next slide"
            id="hero-next-slide-btn"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Scroll Down Cue */}
      <a
        href="#about"
        className="hero-scroll-cue"
        aria-label="Scroll down to About Section"
        onClick={(e) => {
          e.preventDefault();
          const target = document.getElementById('about');
          if (target) target.scrollIntoView({ behavior: 'smooth' });
        }}
        id="hero-scroll-indicator"
      >
        <span className="scroll-cue-text">SCROLL TO DISCOVER</span>
        <div className="scroll-cue-icon-wrap">
          <ArrowDown size={14} className="scroll-cue-arrow" />
        </div>
      </a>

      {/* Floating Studio Stats Banner at bottom of hero */}
      <div className="hero-stats-banner">
        <div className="container hero-stats-container">
          {STUDIO_INFO.stats.map((stat, i) => (
            <div key={i} className="hero-stat-card">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
              <span className="stat-subtext">{stat.subtext}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
