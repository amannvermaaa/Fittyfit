import React, { useEffect, useState } from 'react';
import './SplashLogo11D.css';

export const SplashLogo11D = () => {
  const [startAnim, setStartAnim] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStartAnim(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const strokeW = 32;
  const gapW = 44; // Thick gap to create extremely clear cutouts
  const bgColor = "#F0F6F9";

  const pathTop = "M 66 80 L 66 66 A 34 34 0 0 1 134 66 L 134 80";
  const pathRight = "M 120 66 L 134 66 A 34 34 0 0 1 134 134 L 120 134";
  const pathBottom = "M 134 120 L 134 134 A 34 34 0 0 1 66 134 L 66 120";
  const pathLeft = "M 80 134 L 66 134 A 34 34 0 0 1 66 66 L 80 66";
  const pathLeftSnippet = "M 80 134 L 66 134 A 34 34 0 0 1 42 124"; 

  return (
    <div className={`logo-11d-container ${startAnim ? 'animate' : ''}`}>
      <svg viewBox="0 0 200 200" width="100%" height="100%" className="logo-11d-svg">
        <defs>
          {/* We keep the drop shadow but apply it VERY subtly to the container via CSS, not here, to keep lines crisp */}
          <linearGradient id="gradTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00E5FF" />
            <stop offset="100%" stopColor="#2A5298" />
          </linearGradient>
          <linearGradient id="gradRight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2A5298" />
            <stop offset="100%" stopColor="#4A237A" />
          </linearGradient>
          <linearGradient id="gradBottom" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#4A237A" />
            <stop offset="100%" stopColor="#00E5FF" />
          </linearGradient>
          <linearGradient id="gradLeft" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#00E5FF" />
            <stop offset="100%" stopColor="#00C4D6" />
          </linearGradient>
        </defs>

        {/* Left U */}
        <path d={pathLeft} fill="none" stroke={bgColor} strokeWidth={gapW} strokeLinecap="round" className="logo-path-gap p-left" />
        <path d={pathLeft} fill="none" stroke="url(#gradLeft)" strokeWidth={strokeW} strokeLinecap="round" className="logo-path p-left" />

        {/* Top U */}
        <path d={pathTop} fill="none" stroke={bgColor} strokeWidth={gapW} strokeLinecap="round" className="logo-path-gap p-top" />
        <path d={pathTop} fill="none" stroke="url(#gradTop)" strokeWidth={strokeW} strokeLinecap="round" className="logo-path p-top" />

        {/* Right U */}
        <path d={pathRight} fill="none" stroke={bgColor} strokeWidth={gapW} strokeLinecap="round" className="logo-path-gap p-right" />
        <path d={pathRight} fill="none" stroke="url(#gradRight)" strokeWidth={strokeW} strokeLinecap="round" className="logo-path p-right" />

        {/* Bottom U */}
        <path d={pathBottom} fill="none" stroke={bgColor} strokeWidth={gapW} strokeLinecap="round" className="logo-path-gap p-bottom" />
        <path d={pathBottom} fill="none" stroke="url(#gradBottom)" strokeWidth={strokeW} strokeLinecap="round" className="logo-path p-bottom" />

        {/* Left U Snippet to cover Bottom U */}
        <path d={pathLeftSnippet} fill="none" stroke={bgColor} strokeWidth={gapW} strokeLinecap="round" className="logo-path-gap p-snippet" />
        <path d={pathLeftSnippet} fill="none" stroke="url(#gradLeft)" strokeWidth={strokeW} strokeLinecap="round" className="logo-path p-snippet" />
      </svg>
      {/* Glare effect that sweeps across after drawing */}
      <div className="logo-glare-sweep"></div>
    </div>
  );
};
