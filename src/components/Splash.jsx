import React, { useEffect, useState } from 'react';
import { LogoMark } from './Logo';
import './Splash.css';

export const Splash = ({ onComplete }) => {
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // 3 seconds total duration for the splash screen
    const timer = setTimeout(() => {
      setIsLeaving(true);
      setTimeout(onComplete, 600); // 600ms fade out
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  // The wordmark arrays
  const wordmark = "FittyFit".split('');

  return (
    <div className={`splash-container ${isLeaving ? 'splash-exit' : ''}`}>
      {/* Background Mesh Blobs */}
      <div className="splash-blob blob-1"></div>
      <div className="splash-blob blob-2"></div>
      
      {/* Particles */}
      <div className="particles-container">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i} 
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${3 + Math.random() * 4}s`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="splash-content">
        {/* Simple Fitted Logo Image */}
        <div className="splash-logo-simple">
          <img 
            src="/fittyfit_logo.png" 
            alt="FittyFit Logo" 
            style={{ width: '160px', height: '160px', objectFit: 'contain' }}
          />
        </div>

        {/* Wordmark (Staggered fade/slide up) */}
        <h1 className="splash-wordmark-text" style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>
          {wordmark.map((char, index) => (
            <span 
              key={index} 
              className="wordmark-char"
              style={{ animationDelay: `${1.5 + (index * 0.05)}s` }}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Tagline */}
        <div className="splash-tagline" style={{ marginTop: '1rem', textTransform: 'none', letterSpacing: '0.1em', fontSize: '0.85rem' }}>powered by <span style={{ fontWeight: 600, color: 'var(--color-brand-navy)' }}>EudaiMix</span></div>
        
        {/* Micro Tagline */}
        <div className="splash-micro-tagline">Your health, in flight toward wellness</div>
      </div>
    </div>
  );
};
