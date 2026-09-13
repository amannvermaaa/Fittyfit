import React, { useState } from 'react';
import { Activity, Droplet, Heart, Bluetooth, Smartphone, RefreshCw, CheckCircle2 } from 'lucide-react';

export const Vitals = () => {
  const [activeTab, setActiveTab] = useState('manual'); // 'manual' or 'device'
  const [isScanning, setIsScanning] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState(null);

  const [form, setForm] = useState({ sugar: '', bpSys: '', bpDia: '', heartRate: '' });

  const handleScan = () => {
    setIsScanning(true);
    // Mock a 3-second bluetooth scan
    setTimeout(() => {
      setIsScanning(false);
      setConnectedDevice('Omron BP Monitor 7000');
      // Auto-fill values
      setForm({ ...form, bpSys: '118', bpDia: '79', heartRate: '72' });
    }, 3000);
  };

  const handleSave = (e) => {
    e.preventDefault();
    alert('Vitals saved successfully!');
    setForm({ sugar: '', bpSys: '', bpDia: '', heartRate: '' });
  };

  return (
    <div className="page-animate" style={{ paddingBottom: '6rem', padding: '1.5rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-brand-navy)', fontSize: '2rem', marginBottom: '0.5rem' }}>Vitals Log</h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', margin: 0 }}>Track your health metrics</p>
      </header>

      {/* Segmented Control */}
      <div style={{ display: 'flex', background: 'var(--color-surface)', borderRadius: '12px', padding: '0.25rem', marginBottom: '2rem' }}>
        <button 
          onClick={() => setActiveTab('manual')}
          style={{ flex: 1, padding: '0.75rem', border: 'none', borderRadius: '10px', background: activeTab === 'manual' ? 'white' : 'transparent', color: activeTab === 'manual' ? 'var(--color-brand-navy)' : 'var(--color-text-secondary)', fontWeight: 600, boxShadow: activeTab === 'manual' ? '0 2px 10px rgba(0,0,0,0.05)' : 'none', cursor: 'pointer', transition: 'all 0.3s' }}
        >
          Manual Entry
        </button>
        <button 
          onClick={() => setActiveTab('device')}
          style={{ flex: 1, padding: '0.75rem', border: 'none', borderRadius: '10px', background: activeTab === 'device' ? 'white' : 'transparent', color: activeTab === 'device' ? 'var(--color-brand-navy)' : 'var(--color-text-secondary)', fontWeight: 600, boxShadow: activeTab === 'device' ? '0 2px 10px rgba(0,0,0,0.05)' : 'none', cursor: 'pointer', transition: 'all 0.3s' }}
        >
          Connect Device
        </button>
      </div>

      {activeTab === 'device' && (
        <div className="glass-card page-animate" style={{ padding: '2rem', textAlign: 'center', marginBottom: '2rem' }}>
          
          {!connectedDevice ? (
            <>
              <div style={{ display: 'inline-flex', padding: '1.5rem', borderRadius: '50%', background: 'rgba(30, 58, 95, 0.05)', marginBottom: '1.5rem', position: 'relative' }}>
                <Bluetooth size={48} color="var(--color-brand-navy)" />
                {isScanning && (
                  <div style={{ position: 'absolute', inset: -10, border: '2px solid var(--color-brand-mid)', borderRadius: '50%', animation: 'target-pulse 1.5s ease-out infinite' }}></div>
                )}
              </div>
              <h2 style={{ fontSize: '1.25rem', color: 'var(--color-brand-navy)', marginBottom: '0.5rem' }}>
                {isScanning ? 'Scanning for devices...' : 'Sync Wearable Device'}
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginBottom: '2rem', maxWidth: '280px', margin: '0 auto 2rem auto' }}>
                Make sure your Glucometer or BP monitor is turned on and Bluetooth is enabled.
              </p>
              <button 
                onClick={handleScan}
                disabled={isScanning}
                className="btn btn-primary" style={{ width: '100%', maxWidth: '250px' }}>
                {isScanning ? (
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}><RefreshCw size={18} className="spin" /> Scanning...</span>
                ) : 'Search for Device'}
              </button>
            </>
          ) : (
            <>
              <div style={{ display: 'inline-flex', padding: '1.5rem', borderRadius: '50%', background: 'rgba(40, 167, 69, 0.1)', marginBottom: '1.5rem' }}>
                <CheckCircle2 size={48} color="var(--color-success-green)" />
              </div>
              <h2 style={{ fontSize: '1.25rem', color: 'var(--color-brand-navy)', marginBottom: '0.5rem' }}>Connected</h2>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem', marginBottom: '2rem' }}>
                Successfully synced with {connectedDevice}. Vitals auto-filled below.
              </p>
              <button 
                onClick={() => setConnectedDevice(null)}
                style={{ padding: '0.5rem 1rem', background: 'transparent', border: '1px solid var(--color-border)', borderRadius: '8px', color: 'var(--color-text-secondary)', cursor: 'pointer' }}
              >
                Disconnect
              </button>
            </>
          )}
        </div>
      )}

      {/* Manual Entry Form */}
      <form onSubmit={handleSave} className="glass-card page-animate" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.125rem', color: 'var(--color-brand-navy)', margin: '0 0 1.5rem 0' }}>Log Metrics</h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Sugar */}
          <div className="input-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Droplet size={16} color="var(--color-brand-mid)" /> Blood Sugar (mg/dL)
            </label>
            <input 
              type="number" 
              placeholder="e.g. 110" 
              value={form.sugar}
              onChange={e => setForm({...form, sugar: e.target.value})}
              className="input-field" 
            />
          </div>

          {/* BP */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div className="input-group" style={{ flex: 1 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Activity size={16} color="var(--color-brand-mid)" /> BP Systolic
              </label>
              <input 
                type="number" 
                placeholder="120" 
                value={form.bpSys}
                onChange={e => setForm({...form, bpSys: e.target.value})}
                className="input-field" 
              />
            </div>
            <div className="input-group" style={{ flex: 1 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Activity size={16} color="var(--color-brand-mid)" /> BP Diastolic
              </label>
              <input 
                type="number" 
                placeholder="80" 
                value={form.bpDia}
                onChange={e => setForm({...form, bpDia: e.target.value})}
                className="input-field" 
              />
            </div>
          </div>

          {/* Heart Rate */}
          <div className="input-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Heart size={16} color="var(--color-brand-mid)" /> Heart Rate (BPM)
            </label>
            <input 
              type="number" 
              placeholder="e.g. 72" 
              value={form.heartRate}
              onChange={e => setForm({...form, heartRate: e.target.value})}
              className="input-field" 
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }}>
            Save Vitals
          </button>
        </div>
      </form>
    </div>
  );
};
