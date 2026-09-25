import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HomeHighlights from './components/HomeHighlights';
import About from './components/About';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

const VALID_TABS = ['home', 'about', 'services', 'gallery', 'contact'];

function App() {
  const [activeTab, setActiveTab] = useState(() => {
    const hash = window.location.hash.replace('#', '').toLowerCase();
    return VALID_TABS.includes(hash) ? hash : 'home';
  });

  const [selectedService, setSelectedService] = useState('');

  // Handle browser back and forward button navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (VALID_TABS.includes(hash)) {
        setActiveTab(hash);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleTabChange = (tabId) => {
    if (VALID_TABS.includes(tabId)) {
      setActiveTab(tabId);
      window.location.hash = tabId;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectService = (serviceName) => {
    setSelectedService(serviceName);
    handleTabChange('contact');
  };

  const handleInquireStyle = (styleName) => {
    setSelectedService(styleName);
    handleTabChange('contact');
  };

  return (
    <div className="portfolio-app-root">
      {/* Sticky Glassmorphic Navbar with Tab Navigation */}
      <Navbar 
        activeTab={activeTab} 
        onSelectTab={handleTabChange} 
      />

      {/* Main Tabbed Content Area */}
      <main className="tab-viewport">
        {activeTab === 'home' && (
          <div className="tab-pane-container animate-fade-in" key="tab-home">
            <Hero 
              onExploreGallery={() => handleTabChange('gallery')} 
              onBookSession={() => handleTabChange('contact')} 
              onExploreAbout={() => handleTabChange('about')}
            />
            <HomeHighlights 
              onNavigateTab={handleTabChange}
              onSelectService={handleSelectService}
            />
          </div>
        )}

        {activeTab === 'about' && (
          <div className="tab-pane-container page-view-offset animate-fade-in" key="tab-about">
            <About 
              onBookConsultation={() => handleTabChange('contact')}
              onViewGallery={() => handleTabChange('gallery')}
            />
          </div>
        )}

        {activeTab === 'services' && (
          <div className="tab-pane-container page-view-offset animate-fade-in" key="tab-services">
            <Services 
              onSelectService={handleSelectService}
              onNavigateToContact={() => handleTabChange('contact')}
            />
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="tab-pane-container page-view-offset animate-fade-in" key="tab-gallery">
            <Gallery 
              onInquireStyle={handleInquireStyle}
              onNavigateToContact={() => handleTabChange('contact')}
            />
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="tab-pane-container page-view-offset animate-fade-in" key="tab-contact">
            <Contact 
              preselectedService={selectedService} 
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer 
        onSelectTab={handleTabChange} 
        onSelectService={handleSelectService}
      />
    </div>
  );
}

export default App;
