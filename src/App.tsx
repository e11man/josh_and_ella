import React, { useState } from 'react';
import NavBar from './components/NavBar/NavBar';
import './App.css';

function App() {
  const [currentPage] = useState('home');

  return (
    <div className="App">
      <NavBar currentPage={currentPage} />
      
      {/* Hero Section */}
      <section id="hero" className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Josh & Ella</h1>
          <p className="hero-subtitle">are getting married</p>
          <p className="hero-date">March 14, 2026</p>
        </div>
      </section>

      {/* Demo Sections for Navigation */}
      <section id="our-story" className="content-section">
        <div className="container">
          <h2>Our Story</h2>
          <p>This is where our beautiful love story would be told...</p>
        </div>
      </section>

      <section id="wedding-details" className="content-section">
        <div className="container">
          <h2>Wedding Details</h2>
          <p>All the important details about our special day...</p>
        </div>
      </section>

      <section id="rsvp" className="content-section">
        <div className="container">
          <h2>RSVP</h2>
          <p>Please let us know if you can join us...</p>
        </div>
      </section>

      <section id="photos" className="content-section">
        <div className="container">
          <h2>Photos</h2>
          <p>A collection of our favorite memories...</p>
        </div>
      </section>

      <section id="wedding-party" className="content-section">
        <div className="container">
          <h2>Wedding Party</h2>
          <p>Meet the amazing people standing with us...</p>
        </div>
      </section>

      <section id="registry" className="content-section">
        <div className="container">
          <h2>Registry</h2>
          <p>If you'd like to celebrate with a gift...</p>
        </div>
      </section>
    </div>
  );
}

export default App;
