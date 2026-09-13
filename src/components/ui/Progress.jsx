import React from 'react';

export const ProgressBar = ({ progress, color = 'var(--color-brand-mid)', height = '8px', trackColor = 'rgba(0,0,0,0.05)' }) => {
  const clamped = Math.min(Math.max(progress, 0), 100);
  return (
    <div style={{ width: '100%', height, background: trackColor, borderRadius: '4px', overflow: 'hidden' }}>
      <div style={{ 
        height: '100%', 
        width: `${clamped}%`, 
        background: color, 
        transition: 'width 0.5s ease-out',
        borderRadius: '4px'
      }} />
    </div>
  );
};

export const ProgressRing = ({ progress, size = 120, strokeWidth = 10, color = 'var(--color-brand-mid)', trackColor = 'rgba(0,0,0,0.05)', children }) => {
  const clamped = Math.min(Math.max(progress, 0), 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)', position: 'absolute', top: 0, left: 0 }}>
        {/* Track */}
        <circle 
          stroke={trackColor} 
          fill="transparent" 
          strokeWidth={strokeWidth} 
          r={radius} 
          cx={size / 2} 
          cy={size / 2} 
        />
        {/* Progress */}
        <circle 
          stroke={color} 
          fill="transparent" 
          strokeWidth={strokeWidth} 
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          r={radius} 
          cx={size / 2} 
          cy={size / 2} 
          style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
        />
      </svg>
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </div>
    </div>
  );
};
