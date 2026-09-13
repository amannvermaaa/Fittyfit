import React, { useEffect, useState } from 'react';
import { LogoMark } from './Logo';
import './Splash.css';

export const Splash = ({ onComplete }) => {
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // The total animation sequence takes about 3.2 seconds.
    // We start the exit animation at 3.2s
    const exitTimer = setTimeout(() => {
      setIsLeaving(true);
    }, 3200);

    // Completely unmount the splash after the exit animation finishes (3.8s)
    const unmountTimer = setTimeout(() => {
      onComplete();
    }, 3800);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(unmountTimer);
    };
  }, [onComplete]);

  const wordmark = "Fitty Fit".split('');

  return (
    <div className={`splash-container ${isLeaving ? 'splash-exit' : ''}`}>
      {/* Background Mesh Blobs */}
      <div className="splash-blob blob-1"></div>
      <div className="splash-blob blob-2"></div>
      
      {/* Particles/Sparkles */}
      <div className="particles-container">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 3}s`
          }}></div>
        ))}
      </div>

      <div className="splash-content">
        {/* Logo Container with 3D Flight/Tilt Animation */}
        <div className="splash-logo-3d-wrapper">
          
          <div style={{ position: 'relative', width: 120, height: 120 }}>
            {/* 1. SVG Draws the strokes first */}
            <svg 
              className="splash-svg-logo"
              width="120" 
              height="120" 
              viewBox="0 0 100 100" 
              xmlns="http://www.w3.org/2000/svg"
              style={{ position: 'absolute', inset: 0 }}
            >
              <path className="svg-draw-path path-mid" d="M30 20 L85 30 L45 42 Q38 30 30 20 Z" />
              <path className="svg-draw-path path-sky" d="M15 45 L45 42 L35 70 Q22 60 15 45 Z" />
              <path className="svg-draw-path path-sky" d="M45 42 L85 30 L65 55 L45 50 Z" />
              <path className="svg-draw-path path-navy" d="M45 42 L70 35 L35 70 Q42 55 45 42 Z" />
            </svg>

            {/* 2. Cutout Image fades in seamlessly over it to fill */}
            <img 
              src="/logo.png" 
              className="splash-cutout-image"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain' }}
              alt="Logo"
            />
          </div>

        </div>

        {/* Wordmark (Staggered fade/slide up) */}
        <h1 className="splash-wordmark-text">
          {wordmark.map((char, index) => (
            <span 
              key={index} 
              className="wordmark-char"
              style={{ animationDelay: `${1.8 + (index * 0.05)}s` }}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Gold Progress Line */}
        <div className="gold-progress-line"></div>

        {/* Tagline */}
        <div className="splash-tagline" style={{ textTransform: 'none', letterSpacing: '0.1em', fontSize: '0.85rem' }}>powered by <span style={{ fontWeight: 600, color: 'var(--color-brand-navy)' }}>EudaiMix</span></div>
        
        {/* Micro Tagline */}
        <div className="splash-micro-tagline">Your health, in flight toward wellness</div>
      </div>
    </div>
  );
};
