import React, { useState } from 'react';
import { Activity, Pill, ShieldAlert, ArrowRight, X } from 'lucide-react';
import './Onboarding.css';

const slides = [
  {
    id: 1,
    title: 'Track Vitals Daily',
    desc: 'Monitor your blood pressure and sugar levels with intuitive charts.',
    icon: <Activity size={64} color="var(--color-brand-mid)" strokeWidth={1.5} />,
  },
  {
    id: 2,
    title: 'Never Miss A Dose',
    desc: 'Get timely reminders for all your prescription-based medications.',
    icon: <Pill size={64} color="var(--color-brand-mid)" strokeWidth={1.5} />,
  },
  {
    id: 3,
    title: 'One-Tap SOS',
    desc: 'Instantly connect with ambulance services and emergency contacts when you need them most.',
    icon: <ShieldAlert size={64} color="var(--color-alert-red)" strokeWidth={1.5} />,
  }
];

export const Onboarding = ({ onComplete }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide === slides.length - 1) {
      onComplete();
    } else {
      setCurrentSlide(prev => prev + 1);
    }
  };

  return (
    <div className="onboarding-container animate-in">
      {/* Background Mesh */}
      <div className="splash-blob blob-1" style={{ opacity: 0.3 }}></div>
      <div className="splash-blob blob-2" style={{ opacity: 0.2 }}></div>

      {/* Skip Button */}
      <button className="onboarding-skip" onClick={onComplete}>
        Skip
      </button>

      {/* Carousel */}
      <div className="onboarding-carousel">
        <div 
          className="onboarding-track"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="onboarding-slide">
              <div className="glass-card onboarding-card">
                <div className="onboarding-icon-wrapper">
                  {slide.icon}
                </div>
                <h2>{slide.title}</h2>
                <div className="divider-gold" style={{ margin: '1rem auto', width: '50px' }}></div>
                <p>{slide.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="onboarding-footer">
        <div className="onboarding-dots">
          {slides.map((_, idx) => (
            <div 
              key={idx} 
              className={`dot ${currentSlide === idx ? 'active' : ''}`} 
              onClick={() => setCurrentSlide(idx)}
            />
          ))}
        </div>
        
        <button 
          className={`btn ${currentSlide === slides.length - 1 ? 'btn-gold' : 'btn-primary'}`} 
          onClick={handleNext}
          style={{ padding: '1rem 3rem', fontSize: '1.125rem' }}
        >
          {currentSlide === slides.length - 1 ? 'Get Started' : <ArrowRight size={24} />}
        </button>
      </div>
    </div>
  );
};
