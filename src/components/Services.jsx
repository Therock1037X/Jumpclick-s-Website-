import React from 'react';
import { Sparkles, Check, ArrowRight, Heart, User, Briefcase, Calendar, Scissors, Building2, Clock } from 'lucide-react';
import { SERVICES } from '../data/photographyData';
import './Services.css';

const serviceIcons = {
  weddings: <Heart size={20} />,
  portraits: <User size={20} />,
  commercial: <Briefcase size={20} />,
  events: <Calendar size={20} />,
  editorial: <Scissors size={20} />,
  architecture: <Building2 size={20} />
};

const Services = ({ onSelectService, onNavigateToContact }) => {

  const handleBookService = (service) => {
    if (onSelectService) {
      onSelectService(service.title);
    }
    if (onNavigateToContact) {
      onNavigateToContact();
    }
  };

  return (
    <section id="services" className="services-section section-spacing" aria-label="Photography Services">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Sparkles size={13} />
            <span>BESPOKE PACKAGES</span>
          </div>
          <h2 className="section-title">
            Signature Services & Collections
          </h2>
          <p className="section-subtitle">
            Every assignment receives white-glove creative direction, bespoke color science, and meticulous attention to narrative nuance.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {SERVICES.map((service) => (
            <div 
              key={service.id} 
              className="service-card glass-card"
              id={`service-card-${service.id}`}
            >
                {/* Image Cover Header */}
                <div className="service-card-image-wrap">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="service-card-img"
                    loading="lazy"
                    width="600"
                    height="380"
                  />
                  <div className="service-image-overlay" />
                  
                  {/* Badge */}
                  {service.badge && (
                    <span className="service-badge-pill">{service.badge}</span>
                  )}

                  {/* Icon */}
                  <div className="service-icon-bubble">
                    {serviceIcons[service.id] || <Sparkles size={20} />}
                  </div>
                </div>

                {/* Card Body */}
                <div className="service-card-body">
                  <div className="service-pricing-header">
                    <span className="service-price-tag">{service.price}</span>
                    <span className="service-turnaround-tag">
                      <Clock size={12} />
                      <span>{service.turnaround}</span>
                    </span>
                  </div>

                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-tagline-text">{service.tagline}</p>
                  <p className="service-description">{service.description}</p>

                  {/* Features Inclusions List */}
                  <div className="service-features-list">
                    <h4 className="features-subheading">Collection Inclusions:</h4>
                    <ul>
                      {service.features.map((feature, i) => (
                        <li key={i} className="feature-item">
                          <Check size={14} className="feature-check" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Service Card Actions */}
                  <div className="service-card-footer">
                    <button
                      className="btn btn-primary btn-block service-book-btn"
                      onClick={() => handleBookService(service)}
                      id={`book-service-${service.id}`}
                    >
                      <span>Inquire About This Service</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              </div>
          ))}
        </div>

        {/* Custom Project Callout Banner */}
        <div className="services-bespoke-callout glass-card">
          <div className="bespoke-callout-content">
            <h3 className="bespoke-title">Require a Custom Commission or Worldwide Production?</h3>
            <p className="bespoke-subtitle">
              We frequently produce multi-day destination campaigns, private family documentaries, and international advertising lookbooks with custom logistical riders.
            </p>
          </div>
          <button
            className="btn btn-outline bespoke-btn"
            onClick={() => handleBookService({ title: 'Bespoke Production / Custom Commission' })}
            id="services-custom-commission-btn"
          >
            <span>Request Custom Proposal</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
