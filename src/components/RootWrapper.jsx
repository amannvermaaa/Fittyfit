import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Splash } from './Splash';
import { Onboarding } from './Onboarding';

export const RootWrapper = () => {
  const [showSplash, setShowSplash] = useState(true);
  
  const [showOnboarding, setShowOnboarding] = useState(() => {
    if (typeof window !== "undefined") {
      return !window.localStorage.getItem('eudaimix_onboarded');
    }
    return true;
  });

  const handleOnboardingComplete = () => {
    window.localStorage.setItem('eudaimix_onboarded', 'true');
    setShowOnboarding(false);
  };

  return (
    <>
      {showSplash && <Splash onComplete={() => setShowSplash(false)} />}
      
      {!showSplash && showOnboarding && <Onboarding onComplete={handleOnboardingComplete} />}

      <div style={{ opacity: (showSplash || showOnboarding) ? 0 : 1, transition: 'opacity 0.5s ease', minHeight: '100vh' }}>
        <Outlet />
      </div>
    </>
  );
};
