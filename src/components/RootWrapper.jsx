import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Splash } from './Splash';
import { Onboarding } from './Onboarding';

export const RootWrapper = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showSplash, setShowSplash] = useState(true);
  
  const [showOnboarding, setShowOnboarding] = useState(() => {
    if (typeof window !== "undefined") {
      return !window.localStorage.getItem('eudaimix_onboarded');
    }
    return true;
  });

  // Watch for auth state changes and enforce workflow
  useEffect(() => {
    if (!showSplash && !showOnboarding) {
      const isAuth = window.localStorage.getItem('eudaimix_auth');
      const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
      
      if (!isAuth && !isAuthPage) {
        navigate('/login');
      } else if (isAuth && isAuthPage) {
        navigate('/');
      }
    }
  }, [showSplash, showOnboarding, location.pathname, navigate]);

  const handleOnboardingComplete = () => {
    window.localStorage.setItem('eudaimix_onboarded', 'true');
    setShowOnboarding(false);
    navigate('/register'); // Typically onboarding leads to sign up
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
