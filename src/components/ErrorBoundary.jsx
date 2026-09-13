import React from 'react';
import { AlertCircle } from 'lucide-react';
import { GlassCard } from './ui';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <GlassCard style={{ padding: '2rem', textAlign: 'center', maxWidth: '400px' }}>
            <AlertCircle size={48} color="var(--color-alert-red)" style={{ marginBottom: '1rem' }} />
            <h2 style={{ color: 'var(--color-brand-navy)', marginBottom: '1rem' }}>Something went wrong</h2>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
              We encountered an unexpected issue while loading this component. Please try refreshing the page.
            </p>
            <button 
              onClick={() => window.location.reload()} 
              style={{ background: 'var(--color-brand-navy)', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '20px', border: 'none', fontWeight: 600, cursor: 'pointer' }}
            >
              Refresh Page
            </button>
          </GlassCard>
        </div>
      );
    }

    return this.props.children; 
  }
}
