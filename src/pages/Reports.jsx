import React, { useState } from 'react';
import { FileDown, Calendar, Filter, Activity, Droplet, FileText } from 'lucide-react';

export const Reports = () => {
  const [dateRange, setDateRange] = useState('This Month');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('Report downloaded successfully as PDF!');
    }, 2000);
  };

  return (
    <div className="page-animate" style={{ paddingBottom: '6rem', padding: '1.5rem', minHeight: '100vh' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-brand-navy)', fontSize: '2rem', marginBottom: '0.5rem' }}>Reports</h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', margin: 0 }}>Generate health summaries for your doctor</p>
      </header>

      {/* Filter Bar */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'white', padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
          <Calendar size={18} color="var(--color-brand-mid)" />
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', color: 'var(--color-text-primary)', fontWeight: 500 }}
          >
            <option>This Week</option>
            <option>This Month</option>
            <option>Last 3 Months</option>
            <option>Last 6 Months</option>
          </select>
        </div>
        <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.75rem', background: 'white', border: '1px solid var(--color-border)', borderRadius: '12px', cursor: 'pointer' }}>
          <Filter size={18} color="var(--color-text-primary)" />
        </button>
      </div>

      {/* Report Preview */}
      <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--color-brand-navy)', margin: '0 0 0.5rem 0' }}>Comprehensive Health Report</h2>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', margin: 0 }}>Period: {dateRange}</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Droplet size={24} color="var(--color-brand-gold)" />
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: 0, color: 'var(--color-text-primary)' }}>Average Blood Sugar</h4>
              <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>Fasting: 108 mg/dL | PP: 142 mg/dL</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Activity size={24} color="var(--color-brand-navy)" />
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: 0, color: 'var(--color-text-primary)' }}>Average Blood Pressure</h4>
              <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>122 / 81 mmHg</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <FileText size={24} color="var(--color-brand-mid)" />
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: 0, color: 'var(--color-text-primary)' }}>Medication Adherence</h4>
              <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>94% Taken on time</p>
            </div>
          </div>
        </div>
      </div>

      {/* Export Button */}
      <button 
        onClick={handleExport}
        disabled={isExporting}
        className="btn btn-primary" 
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', padding: '1rem' }}
      >
        {isExporting ? (
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>Generating PDF...</span>
        ) : (
          <><FileDown size={20} /> Export PDF for Doctor</>
        )}
      </button>

    </div>
  );
};
