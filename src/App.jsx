import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Experience from './components/Experience';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [selectedService, setSelectedService] = useState('');

  const handleSelectService = (serviceName) => {
    setSelectedService(serviceName);
  };

  const handleInquireStyle = (styleName) => {
    setSelectedService(styleName);
  };

  const handleOpenBooking = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="portfolio-app-root">
      {/* Sticky Glassmorphic Navbar */}
      <Navbar onOpenBooking={handleOpenBooking} />

      {/* Main Content Sections */}
      <main>
        {/* 1. Fullscreen Hero Section */}
        <Hero 
          onExploreGallery={() => {}} 
          onBookSession={handleOpenBooking} 
        />

        {/* 2. Studio Story & Photographer Bio */}
        <About 
          onBookConsultation={handleOpenBooking} 
        />

        {/* 3. Photography Collections & Services */}
        <Services 
          onSelectService={handleSelectService} 
        />

        {/* 4. Filterable Masonry Gallery & Exhibition Lightbox */}
        <Gallery 
          onInquireStyle={handleInquireStyle} 
        />

        {/* 5. Creative Workflow & Common Questions */}
        <Experience 
          onBookSession={handleOpenBooking} 
        />

        {/* 6. Client Praises & Press Mentions */}
        <Testimonials />

        {/* 7. Reservation Contact Form & Studio Map */}
        <Contact 
          preselectedService={selectedService} 
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
