import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Activity, Pill, LayoutDashboard, FileText, User, ShieldAlert, Dumbbell, Sparkles, Apple, Target, Menu, X } from 'lucide-react';
import { LogoMark } from './Logo';
import './Layout.css';
import './FloatingSOS.css';

const mainNavItems = [
  { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={24} /> },
  { name: 'Fitness', path: '/fitness', icon: <Dumbbell size={24} /> },
  { name: 'Fitty AI', path: '/fitty', icon: <Sparkles size={24} /> },
  { name: 'Medicines', path: '/medications', icon: <Pill size={24} /> },
];

const secondaryNavItems = [
  { name: 'Vitals', path: '/vitals', icon: <Activity size={24} /> },
  { name: 'Nutrition', path: '/nutrition', icon: <Apple size={24} /> },
  { name: 'Goals', path: '/goals', icon: <Target size={24} /> },
  { name: 'Reports', path: '/reports', icon: <FileText size={24} /> },
  { name: 'Profile', path: '/profile', icon: <User size={24} /> },
];

const allNavItems = [...mainNavItems, ...secondaryNavItems];

export const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  
  const [sosActive, setSosActive] = useState(() => {
    if (typeof window !== "undefined") {
      return window.localStorage.getItem('eudaimix_sos_active') === 'true';
    }
    return false;
  });

  useEffect(() => {
    const handleSOSChange = () => {
      setSosActive(window.localStorage.getItem('eudaimix_sos_active') === 'true');
    };
    window.addEventListener('sos_status_change', handleSOSChange);
    return () => window.removeEventListener('sos_status_change', handleSOSChange);
  }, []);

  // Close more menu when navigating
  useEffect(() => {
    setIsMoreOpen(false);
  }, [location.pathname]);

  return (
    <>
      {sosActive && (
        <div className="global-sos-banner" onClick={() => navigate('/emergency')}>
          <ShieldAlert size={18} />
          Help is on the way — ETA 8 min
        </div>
      )}
      <div className="app-container">
        <div className="brand-pin-top-right">
          <LogoMark size={36} />
        </div>

        <button className="floating-sos-btn" onClick={() => navigate('/emergency')} aria-label="Emergency SOS">
          <ShieldAlert size={28} />
        </button>

        {/* Desktop Sidebar (Shows all items) */}
        <aside className="sidebar">
          <div className="logo-container" style={{ padding: '2.5rem 2rem 1.5rem 2rem' }}>
            <LogoMark size={48} />
            <span className="logo-text">FittyFit</span>
          </div>
          <nav className="nav-menu">
            {allNavItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              >
                {item.icon}
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="main-content">
          <div className="page-content animate-in">
            <Outlet />
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="bottom-nav">
          {mainNavItems.map((item) => (
            <NavLink 
              key={item.name} 
              to={item.path} 
              className={({isActive}) => `bottom-nav-item ${isActive ? 'active' : ''}`}
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
          <button className="bottom-nav-item" onClick={() => setIsMoreOpen(true)}>
            <Menu size={24} />
            <span>More</span>
          </button>
        </nav>

        {/* Mobile More Sheet */}
        {isMoreOpen && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }} onClick={() => setIsMoreOpen(false)}>
            <div style={{ backgroundColor: 'var(--color-bg)', borderTopLeftRadius: '24px', borderTopRightRadius: '24px', padding: '1.5rem', paddingBottom: '3rem', animation: 'slideUp 0.3s ease-out' }} onClick={e => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ margin: 0, color: 'var(--color-brand-navy)' }}>More Options</h3>
                <button onClick={() => setIsMoreOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer' }}><X size={24} /></button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                {secondaryNavItems.map(item => (
                  <NavLink 
                    key={item.name} 
                    to={item.path} 
                    style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: '16px', color: 'var(--color-brand-navy)', fontWeight: 500 }}
                  >
                    {item.icon}
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
