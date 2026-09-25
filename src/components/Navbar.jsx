import React, { useState, useEffect } from 'react';
import { Camera, Menu, X, Phone, Mail, ChevronRight } from 'lucide-react';
import { InstagramIcon } from './SocialIcons';
import { STUDIO_INFO } from '../data/photographyData';
import './Navbar.css';

const Navbar = ({ onOpenBooking }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Determine active section for nav highlight
      const sections = ['home', 'about', 'services', 'gallery', 'experience', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Gallery', href: '#gallery', id: 'gallery' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Praise', href: '#testimonials', id: 'testimonials' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar-header ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Brand Logo */}
        <a 
          href="#home" 
          className="brand-logo" 
          onClick={(e) => handleNavClick(e, '#home')}
          aria-label="Jump Click's Photography Home"
          id="nav-brand-logo"
        >
          <div className="brand-icon-wrap">
            <Camera className="brand-camera-icon" size={20} />
            <div className="brand-icon-lens-ring"></div>
          </div>
          <div className="brand-text-wrap">
            <span className="brand-title">JUMP CLICK'S</span>
            <span className="brand-subtitle">PHOTOGRAPHY STUDIO</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.id} className="nav-item">
                <a
                  href={link.href}
                  className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                  id={`nav-link-${link.id}`}
                >
                  {link.label}
                  {activeSection === link.id && <span className="active-dot" />}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop Action Buttons */}
        <div className="navbar-actions">
          <a
            href="#contact"
            className="btn btn-primary btn-sm nav-cta-btn"
            onClick={(e) => {
              handleNavClick(e, '#contact');
              if (onOpenBooking) onOpenBooking();
            }}
            id="nav-book-session-btn"
          >
            <span>Book a Session</span>
            <ChevronRight size={15} />
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            aria-expanded={mobileMenuOpen}
            id="mobile-nav-toggle-btn"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div 
        className={`mobile-drawer-overlay ${mobileMenuOpen ? 'open' : ''}`} 
        onClick={() => setMobileMenuOpen(false)}
      />
      
      <div 
        className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}
        id="mobile-navigation-drawer"
      >
        <div className="mobile-drawer-header">
          <div className="brand-text-wrap">
            <span className="brand-title">JUMP CLICK'S</span>
            <span className="brand-subtitle">FINE ART & COMMERCIAL</span>
          </div>
          <button 
            className="mobile-close-btn" 
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close navigation drawer"
            id="mobile-nav-close-btn"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="mobile-nav" aria-label="Mobile Navigation">
          <ul className="mobile-nav-list">
            {navLinks.map((link) => (
              <li key={link.id} className="mobile-nav-item">
                <a
                  href={link.href}
                  className={`mobile-nav-link ${activeSection === link.id ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                  id={`mobile-link-${link.id}`}
                >
                  <span>{link.label}</span>
                  <ChevronRight size={16} className="mobile-link-arrow" />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mobile-drawer-footer">
          <a
            href="#contact"
            className="btn btn-primary btn-block mobile-cta"
            onClick={(e) => {
              handleNavClick(e, '#contact');
              if (onOpenBooking) onOpenBooking();
            }}
            id="mobile-nav-cta-btn"
          >
            <span>Book Your Consultation</span>
          </a>

          <div className="mobile-contact-strip">
            <a href={`tel:${STUDIO_INFO.phone}`} className="mobile-contact-pill">
              <Phone size={14} />
              <span>{STUDIO_INFO.phone}</span>
            </a>
            <a href={`mailto:${STUDIO_INFO.email}`} className="mobile-contact-pill">
              <Mail size={14} />
              <span>Email Studio</span>
            </a>
          </div>

          <div className="mobile-socials">
            <a href={STUDIO_INFO.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
              <InstagramIcon size={18} />
            </a>
            <span className="mobile-studio-location">New York &bull; Available Worldwide</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
