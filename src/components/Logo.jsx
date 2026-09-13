import React from 'react';

export const LogoMark = ({ size = 24 }) => (
  <img 
    src="/logo.png" 
    alt="Fitty Fit Logo"
    style={{ 
      width: size, 
      height: size, 
      objectFit: 'contain',
      filter: 'drop-shadow(0px 4px 6px rgba(0,0,0,0.15))'
    }} 
  />
);
