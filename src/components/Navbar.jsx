import React, { useState, useEffect } from 'react';
import { Camera, Menu, X, Phone, Mail, ChevronRight } from 'lucide-react';
import { InstagramIcon } from './SocialIcons';
import { STUDIO_INFO } from '../data/photographyData';
import './Navbar.css';

const NAV_TABS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Us' },
  { id: 'services', label: 'Services' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'contact', label: 'Contact Us' },
];

const Navbar = ({ activeTab, onSelectTab }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
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

  const handleTabClick = (tabId) => {
    setMobileMenuOpen(false);
    onSelectTab(tabId);
  };

  return (
    <header className={`navbar-header ${isScrolled || activeTab !== 'home' ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Brand Logo - clicks to Home Tab */}
        <button 
          className="brand-logo btn-clean" 
          onClick={() => handleTabClick('home')}
          aria-label="Jump Click's Photography Home"
          id="nav-brand-logo"
        >
          <div className="brand-icon-wrap">
            <Camera className="brand-camera-icon" size={20} />
            <div className="brand-icon-lens-ring"></div>
          </div>
          <div className="brand-text-wrap">
            <span className="brand-title">JUMP CLICK&apos;S</span>
            <span className="brand-subtitle">PHOTOGRAPHY STUDIO</span>
          </div>
        </button>

        {/* Desktop Tab Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            {NAV_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <li key={tab.id} className="nav-item">
                  <button
                    className={`nav-link-btn ${isActive ? 'active' : ''}`}
                    onClick={() => handleTabClick(tab.id)}
                    id={`nav-tab-${tab.id}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span>{tab.label}</span>
                    {isActive && <span className="active-dot" />}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Desktop Action Buttons */}
        <div className="navbar-actions">
          <button
            className="btn btn-primary btn-sm nav-cta-btn"
            onClick={() => handleTabClick('contact')}
            id="nav-book-session-btn"
          >
            <span>Book a Session</span>
            <ChevronRight size={15} />
          </button>

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
            <span className="brand-title">JUMP CLICK&apos;S</span>
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
            {NAV_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <li key={tab.id} className="mobile-nav-item">
                  <button
                    className={`mobile-nav-link-btn ${isActive ? 'active' : ''}`}
                    onClick={() => handleTabClick(tab.id)}
                    id={`mobile-tab-${tab.id}`}
                  >
                    <span>{tab.label}</span>
                    <ChevronRight size={16} className="mobile-link-arrow" />
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mobile-drawer-footer">
          <button
            className="btn btn-primary btn-block mobile-cta"
            onClick={() => handleTabClick('contact')}
            id="mobile-nav-cta-btn"
          >
            <span>Book Your Consultation</span>
          </button>

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
