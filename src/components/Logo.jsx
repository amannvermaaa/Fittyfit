import React from 'react';

export const LogoMark = ({ size = 24 }) => (
  <img 
    src="/fittyfit_logo.png" 
    alt="Fitty Fit Logo"
    style={{ 
      width: size, 
      height: size, 
      objectFit: 'contain'
    }} 
  />
);
