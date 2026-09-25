import React, { useState } from 'react';
import { Camera, ArrowUp, Mail, CheckCircle2 } from 'lucide-react';
import { InstagramIcon, FacebookIcon } from './SocialIcons';
import { STUDIO_INFO, SERVICES } from '../data/photographyData';
import './Footer.css';

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim() && /\S+@\S+\.\S+/.test(newsletterEmail)) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSubscribed(false), 5000);
    }
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="studio-footer" aria-label="Footer">
      <div className="container">
        {/* Top Footer Grid */}
        <div className="footer-top-grid">
          {/* Brand Info Column */}
          <div className="footer-brand-column">
            <a 
              href="#home" 
              className="footer-brand"
              onClick={(e) => handleNavClick(e, '#home')}
              aria-label="Back to top"
            >
              <div className="footer-brand-icon-wrap">
                <Camera size={22} className="footer-camera-icon" />
              </div>
              <div className="footer-brand-text">
                <span className="footer-brand-title">JUMP CLICK&apos;S</span>
                <span className="footer-brand-sub">FINE ART PHOTOGRAPHY</span>
              </div>
            </a>

            <p className="footer-brand-desc">
              Dedicated to the art of capturing authentic vulnerability, editorial grandeur, and timeless human legacy. Available worldwide.
            </p>

            <div className="footer-social-strip">
              <a href={STUDIO_INFO.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="footer-social-link">
                <InstagramIcon size={17} />
              </a>
              <a href={STUDIO_INFO.socials.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="footer-social-link">
                <FacebookIcon size={17} />
              </a>
              <a href={`mailto:${STUDIO_INFO.email}`} aria-label="Email" className="footer-social-link">
                <Mail size={17} />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="footer-links-column">
            <h4 className="footer-col-title">Navigation</h4>
            <ul className="footer-link-list">
              <li>
                <a href="#home" onClick={(e) => handleNavClick(e, '#home')}>Home</a>
              </li>
              <li>
                <a href="#about" onClick={(e) => handleNavClick(e, '#about')}>About the Artist</a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleNavClick(e, '#services')}>Signature Services</a>
              </li>
              <li>
                <a href="#gallery" onClick={(e) => handleNavClick(e, '#gallery')}>Portfolio Gallery</a>
              </li>
              <li>
                <a href="#experience" onClick={(e) => handleNavClick(e, '#experience')}>Process & FAQ</a>
              </li>
              <li>
                <a href="#testimonials" onClick={(e) => handleNavClick(e, '#testimonials')}>Client Praise</a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>Book a Session</a>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="footer-links-column">
            <h4 className="footer-col-title">Collections</h4>
            <ul className="footer-link-list">
              {SERVICES.map((srv) => (
                <li key={srv.id}>
                  <a href="#services" onClick={(e) => handleNavClick(e, '#services')}>
                    {srv.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="footer-newsletter-column">
            <h4 className="footer-col-title">The Collector&apos;s Journal</h4>
            <p className="footer-newsletter-desc">
              Subscribe for exclusive announcements on seasonal travel destinations, studio mini-session drops, and archival print releases.
            </p>

            {newsletterSubscribed ? (
              <div className="newsletter-success-pill">
                <CheckCircle2 size={16} />
                <span>You are subscribed to private releases.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="footer-newsletter-form">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="newsletter-input"
                  required
                />
                <button type="submit" className="btn btn-primary btn-sm newsletter-btn">
                  Join
                </button>
              </form>
            )}

            <span className="newsletter-disclaimer">
              We respect your privacy. No spam, ever.
            </span>
          </div>
        </div>

        {/* Bottom Bar Divider & Copyright */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            &copy; {new Date().getFullYear()} Jump Click&apos;s Photography Studio. All rights reserved.
          </p>

          <p className="footer-made-with">
            Crafted with passion &bull; New York City
          </p>

          <button 
            className="back-to-top-btn" 
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            id="footer-back-to-top-btn"
          >
            <span>Back to Top</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
