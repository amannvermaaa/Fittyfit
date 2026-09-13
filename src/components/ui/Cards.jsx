import React from 'react';
import { Sparkles, Info } from 'lucide-react';

export const GlassCard = ({ children, className = '', style = {}, padding = '1.5rem', ...props }) => (
  <div 
    className={`glass-card ${className}`} 
    style={{ padding, ...style }} 
    {...props}
  >
    {children}
  </div>
);

export const MetricCard = ({ title, value, unit, icon: Icon, trend, trendLabel, color = 'var(--color-brand-navy)' }) => (
  <GlassCard style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color }}>
        {Icon && <Icon size={22} />}
        <span style={{ fontWeight: 600, fontSize: '0.95rem', letterSpacing: '0.5px' }}>{title}</span>
      </div>
      {unit && <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>{unit}</span>}
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'space-between' }}>
      <h2 style={{ fontSize: '2.8rem', margin: 0, lineHeight: 1, color: 'var(--color-text-primary)', letterSpacing: '-1px' }}>{value}</h2>
      {trend && (
        <div style={{ 
          padding: '0.25rem 0.75rem', 
          borderRadius: '20px', 
          background: trend === 'up' ? 'var(--color-alert-red)' : 'var(--color-success-green)', 
          color: 'white', 
          fontSize: '0.75rem', 
          fontWeight: 700 
        }}>
          {trendLabel || (trend === 'up' ? '↑' : '↓')}
        </div>
      )}
    </div>
  </GlassCard>
);

export const AIRecommendationCard = ({ title, message, actionLabel, onAction }) => (
  <GlassCard style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)', border: '1px solid rgba(201, 162, 75, 0.3)' }}>
    <div style={{ display: 'flex', gap: '1rem' }}>
      <div style={{ padding: '0.75rem', background: 'rgba(201, 162, 75, 0.1)', borderRadius: '12px', height: 'fit-content' }}>
        <Sparkles size={24} color="var(--color-brand-gold)" />
      </div>
      <div style={{ flex: 1 }}>
        <h4 style={{ margin: '0 0 0.25rem 0', color: 'var(--color-brand-navy)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {title} <span style={{ fontSize: '0.7rem', padding: '2px 6px', background: 'var(--color-brand-navy)', color: 'white', borderRadius: '4px' }}>AI Suggestion</span>
        </h4>
        <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
          {message}
        </p>
        {actionLabel && (
          <button 
            onClick={onAction}
            className="btn btn-outline"
            style={{ marginTop: '1rem', padding: '0.5rem 1rem', fontSize: '0.9rem' }}
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  </GlassCard>
);

export const ChartCard = ({ title, children, action }) => (
  <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <h3 style={{ fontSize: '1.25rem', color: 'var(--color-brand-navy)', margin: 0 }}>{title}</h3>
      {action && <div style={{ color: 'var(--color-brand-mid)', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}>{action}</div>}
    </div>
    <GlassCard style={{ height: '320px', padding: '1.5rem' }}>
      {children}
    </GlassCard>
  </section>
);
