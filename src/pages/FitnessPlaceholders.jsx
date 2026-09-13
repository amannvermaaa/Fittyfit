import React from 'react';
import { GlassCard } from '../components/ui';

const PlaceholderPage = ({ title }) => (
  <div className="page-animate" style={{ paddingBottom: '6rem' }}>
    <header style={{ marginBottom: '2rem' }}>
      <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-brand-navy)', fontSize: '2rem' }}>{title}</h1>
      <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem' }}>Coming soon...</p>
    </header>
    <GlassCard style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
      <p style={{ color: 'var(--color-text-secondary)' }}>This module is currently under development.</p>
    </GlassCard>
  </div>
);

export const Fitness = () => <PlaceholderPage title="Fitness Dashboard" />;
export const FittyAI = () => <PlaceholderPage title="Fitty AI Coach" />;
export const Nutrition = () => <PlaceholderPage title="Nutrition Tracker" />;
export const Goals = () => <PlaceholderPage title="Your Goals" />;
