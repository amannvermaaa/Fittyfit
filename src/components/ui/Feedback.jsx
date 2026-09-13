import React from 'react';

export const LoadingSkeleton = ({ height = '200px', width = '100%', borderRadius = '24px', style = {} }) => {
  return (
    <div 
      className="skeleton-pulse" 
      style={{ 
        height, 
        width, 
        borderRadius, 
        background: 'rgba(255, 255, 255, 0.4)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        ...style 
      }} 
    />
  );
};

export const EmptyState = ({ icon: Icon, title, message, actionLabel, onAction }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 1.5rem', textAlign: 'center', background: 'rgba(255,255,255,0.4)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.3)' }}>
      {Icon && <Icon size={48} color="var(--color-brand-mid)" style={{ marginBottom: '1rem', opacity: 0.5 }} />}
      <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--color-brand-navy)', fontSize: '1.25rem' }}>{title}</h3>
      <p style={{ margin: '0 0 1.5rem 0', color: 'var(--color-text-secondary)', fontSize: '0.875rem', maxWidth: '300px' }}>{message}</p>
      {actionLabel && (
        <button 
          onClick={onAction}
          style={{ background: 'var(--color-brand-navy)', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '20px', fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 12px rgba(30, 58, 95, 0.2)' }}
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
