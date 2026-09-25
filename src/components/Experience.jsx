import React, { useState } from 'react';
import { Compass, HelpCircle, ChevronDown, ArrowRight } from 'lucide-react';
import { WORKFLOW_STEPS, FAQ_ITEMS } from '../data/photographyData';
import './Experience.css';

const Experience = ({ onBookSession }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section id="experience" className="experience-section section-spacing" aria-label="The Jump Clicks Experience">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Compass size={13} />
            <span>HOW WE WORK</span>
          </div>
          <h2 className="section-title">
            The Jump Click&apos;s Experience
          </h2>
          <p className="section-subtitle">
            From the initial coffee conversation to the moment you unwrap your hand-bound Italian leather album, our process is designed around effortless ease and quiet confidence.
          </p>
        </div>

        {/* 4-Step Journey Grid */}
        <div className="workflow-steps-grid">
          {WORKFLOW_STEPS.map((stepItem, index) => (
            <div key={index} className="workflow-step-card glass-card">
              <div className="step-card-header">
                <span className="step-number-tag">{stepItem.step}</span>
                <span className="step-pill">Phase {index + 1}</span>
              </div>
              <h3 className="step-title">{stepItem.title}</h3>
              <p className="step-description">{stepItem.description}</p>
              
              <div className="step-card-decor-line" />
            </div>
          ))}
        </div>

        {/* Frequently Asked Questions Accordion */}
        <div className="faq-wrapper">
          <div className="faq-header">
            <div className="section-badge">
              <HelpCircle size={13} />
              <span>FREQUENT QUESTIONS</span>
            </div>
            <h3 className="faq-section-title">Everything You Need to Know</h3>
            <p className="faq-section-desc">
              Have questions regarding booking, travel, or deliverables? Here are answers to our most common inquiries:
            </p>
          </div>

          <div className="faq-accordion-list">
            {FAQ_ITEMS.map((faq, i) => {
              const isOpen = openFaqIndex === i;
              return (
                <div 
                  key={i} 
                  className={`faq-item glass-card ${isOpen ? 'open' : ''}`}
                  id={`faq-item-${i}`}
                >
                  <button
                    className="faq-question-btn"
                    onClick={() => toggleFaq(i)}
                    aria-expanded={isOpen}
                    id={`faq-question-btn-${i}`}
                  >
                    <span className="faq-question-text">{faq.question}</span>
                    <div className="faq-chevron-wrap">
                      <ChevronDown size={18} className="faq-chevron" />
                    </div>
                  </button>

                  <div className="faq-answer-collapse">
                    <p className="faq-answer-text">{faq.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick FAQ CTA */}
          <div className="faq-extra-help">
            <p>Still have a unique question not answered here?</p>
            <a
              href="#contact"
              className="faq-ask-link"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                if (onBookSession) onBookSession();
              }}
              id="faq-speak-with-artist-btn"
            >
              <span>Speak directly with Alex &bull; Get in touch</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
