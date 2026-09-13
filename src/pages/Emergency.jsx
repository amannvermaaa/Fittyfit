import React, { useState, useEffect, useRef } from 'react';
import { ShieldAlert, MapPin, Phone, CheckCircle2, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Emergency.css';

export const Emergency = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(() => {
    return window.localStorage.getItem('eudaimix_sos_active') === 'true';
  });
  const [holdProgress, setHoldProgress] = useState(0); // 0 to 100
  const holdTimerRef = useRef(null);
  
  // Get emergency contact from local storage (saved during registration)
  const contactStr = window.localStorage.getItem('eudaimix_emergency_contact');
  const emergencyContact = contactStr ? JSON.parse(contactStr) : { name: 'Emergency Contact', phone: '(555) 123-4567' };

  // Hold to Confirm Logic
  const startHold = () => {
    if (isActive) return;
    setHoldProgress(0);
    
    // We want 100 steps over 3000ms = 30ms per step
    holdTimerRef.current = setInterval(() => {
      setHoldProgress((prev) => {
        if (prev >= 100) {
          clearInterval(holdTimerRef.current);
          triggerSOS();
          return 100;
        }
        return prev + 1;
      });
    }, 30);
  };

  const endHold = () => {
    if (holdTimerRef.current) clearInterval(holdTimerRef.current);
    if (holdProgress < 100 && !isActive) {
      setHoldProgress(0);
    }
  };

  const triggerSOS = () => {
    setIsActive(true);
    window.localStorage.setItem('eudaimix_sos_active', 'true');
    // Dispatch a custom event so Layout.jsx can pick up the change immediately without reload
    window.dispatchEvent(new Event('sos_status_change'));
  };

  const cancelSOS = () => {
    const confirmed = window.confirm("Are you sure you want to cancel the SOS alert?");
    if (confirmed) {
      setIsActive(false);
      setHoldProgress(0);
      window.localStorage.removeItem('eudaimix_sos_active');
      window.dispatchEvent(new Event('sos_status_change'));
      navigate('/');
    }
  };

  // SVG Progress Ring calculations
  const radius = 130;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (holdProgress / 100) * circumference;

  return (
    <div className="emergency-container page-animate">
      
      {!isActive ? (
        // STATE 1: IDLE / HOLD TO CONFIRM
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
          
          <button className="btn" style={{ position: 'absolute', top: '2rem', left: '2rem', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none' }} onClick={() => navigate(-1)}>
            <X size={24} />
          </button>

          <ShieldAlert size={64} color="#FF4B4B" style={{ marginBottom: '2rem' }} />
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: '1rem' }}>Emergency SOS</h1>
          <p style={{ opacity: 0.8, maxWidth: '300px', margin: '0 auto 4rem auto', lineHeight: 1.6 }}>
            Hold the button below for 3 seconds to immediately dispatch an ambulance and alert your emergency contacts.
          </p>

          <div 
            className="sos-button-wrapper"
            onMouseDown={startHold}
            onMouseUp={endHold}
            onMouseLeave={endHold}
            onTouchStart={startHold}
            onTouchEnd={endHold}
          >
            {/* SVG Ring */}
            <svg className="sos-progress-ring" width="280" height="280">
              <circle
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="8"
                fill="transparent"
                r={radius}
                cx="140"
                cy="140"
              />
              <circle
                className="sos-progress-circle"
                stroke="#FF4B4B"
                strokeWidth="8"
                strokeDasharray={circumference}
                style={{ strokeDashoffset }}
                strokeLinecap="round"
                fill="transparent"
                r={radius}
                cx="140"
                cy="140"
              />
            </svg>
            
            {/* Core Button */}
            <div className="sos-button-core">
              <h2>SOS</h2>
              <p>Hold to Confirm</p>
            </div>
          </div>
        </div>
      ) : (
        // STATE 2: TRIGGERED / ACTIVE
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '2rem 1.5rem', paddingTop: '4rem', zIndex: 10 }}>
          
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', background: 'rgba(255, 75, 75, 0.2)', borderRadius: '50%', marginBottom: '1rem' }}>
              <ShieldAlert size={40} color="#FF4B4B" />
            </div>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', marginBottom: '0.5rem', color: '#FF4B4B' }}>SOS Active</h1>
            <p style={{ fontSize: '1.25rem', opacity: 0.9 }}>Help is on the way.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Map Preview Card */}
            <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={20} color="var(--color-brand-mid)" /> Ambulance ETA</span>
                <span style={{ color: '#FF4B4B', fontWeight: 700, fontSize: '1.25rem' }}>8 Min</span>
              </div>
              <div className="radar-container">
                <div className="radar-grid"></div>
                <div className="radar-center"></div>
                <div className="radar-target"></div>
                <div className="radar-sweep"></div>
              </div>
              <p style={{ fontSize: '0.875rem', opacity: 0.7, marginTop: '1rem', textAlign: 'center' }}>
                Dispatching from City Central Hospital...
              </p>
            </div>

            {/* Contacts Notified Card */}
            <div style={{ background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '1.25rem', opacity: 0.8 }}>Notifying Contacts</h3>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '48px', height: '48px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Phone size={24} />
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: 0, fontSize: '1.125rem' }}>{emergencyContact.name}</h4>
                  <p style={{ margin: '0.25rem 0 0 0', opacity: 0.6, fontSize: '0.875rem' }}>{emergencyContact.phone}</p>
                </div>
                <CheckCircle2 size={24} color="var(--color-success-green)" />
              </div>
            </div>

          </div>

          <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
            <button 
              onClick={cancelSOS}
              style={{ width: '100%', padding: '1.25rem', background: 'transparent', border: '2px solid rgba(255,255,255,0.2)', borderRadius: '16px', color: 'white', fontSize: '1.125rem', fontWeight: 600, cursor: 'pointer' }}
            >
              Cancel SOS
            </button>
          </div>

        </div>
      )}
    </div>
  );
};
