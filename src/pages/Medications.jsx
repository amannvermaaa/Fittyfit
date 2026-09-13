import React, { useState } from 'react';
import { Camera, Upload, CheckCircle2, Pill, Plus, X, ScanLine, FileText } from 'lucide-react';

export const Medications = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);

  const [meds, setMeds] = useState([
    { id: 1, name: 'Metformin', dosage: '500mg', time: '08:00 AM', doctor: 'Dr. Sharma' },
    { id: 2, name: 'Amlodipine', dosage: '5mg', time: '09:00 AM', doctor: 'Dr. Patel' },
  ]);

  const handleUpload = () => {
    setIsScanning(true);
    // Mock 3s OCR scanning delay
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
      
      // Auto add mock scanned med
      setTimeout(() => {
        setMeds([
          ...meds,
          { id: Date.now(), name: 'Atorvastatin', dosage: '20mg', time: '09:00 PM', doctor: 'Dr. Patel (Scanned)' }
        ]);
        setScanComplete(false);
        setShowUploadModal(false);
      }, 2000);
    }, 3000);
  };

  return (
    <div className="page-animate" style={{ paddingBottom: '6rem', padding: '1.5rem', position: 'relative', minHeight: '100vh' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-brand-navy)', fontSize: '2rem', marginBottom: '0.5rem' }}>Medicines</h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem', margin: 0 }}>Manage your prescriptions</p>
      </header>

      {/* Medication List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {meds.map(med => (
          <div key={med.id} className="glass-card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--color-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Pill size={24} color="var(--color-brand-navy)" />
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: '0 0 0.25rem 0', color: 'var(--color-brand-navy)' }}>{med.name}</h3>
              <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{med.dosage} • {med.doctor}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontWeight: 600, color: 'var(--color-brand-mid)' }}>{med.time}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Action Button */}
      <button 
        onClick={() => setShowUploadModal(true)}
        style={{
          position: 'fixed',
          bottom: '100px', // Above bottom nav
          right: '1.5rem',
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'var(--gradient-brand)',
          color: 'white',
          border: 'none',
          boxShadow: '0 10px 25px rgba(59, 111, 160, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 40,
        }}
      >
        <Plus size={32} />
      </button>

      {/* Upload/Scan Modal */}
      {showUploadModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(240, 246, 249, 0.95)', zIndex: 100, display: 'flex', flexDirection: 'column', padding: '1.5rem', backdropFilter: 'blur(20px)' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={() => setShowUploadModal(false)} style={{ background: 'transparent', border: 'none', color: 'var(--color-text-primary)' }}>
              <X size={32} />
            </button>
          </div>
          
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            
            {!isScanning && !scanComplete ? (
              <>
                <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
                  <Camera size={48} color="var(--color-brand-navy)" />
                </div>
                <h2 style={{ fontSize: '1.75rem', color: 'var(--color-brand-navy)', marginBottom: '1rem' }}>Upload Prescription</h2>
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem', maxWidth: '300px' }}>
                  Take a photo of your prescription. Our AI will automatically extract the medicines and schedule them for you.
                </p>
                <div style={{ display: 'flex', gap: '1rem', width: '100%', maxWidth: '300px' }}>
                  <button onClick={handleUpload} className="btn btn-primary" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <Camera size={18} /> Camera
                  </button>
                  <button onClick={handleUpload} className="btn" style={{ flex: 1, background: 'white', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <Upload size={18} /> Gallery
                  </button>
                </div>
              </>
            ) : isScanning ? (
              <>
                <div style={{ width: '280px', height: '350px', background: 'white', borderRadius: '16px', border: '2px dashed var(--color-brand-mid)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                  <FileText size={64} color="var(--color-text-secondary)" opacity={0.2} />
                  {/* Scanning Laser Line */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'var(--color-brand-sky)', boxShadow: '0 0 15px var(--color-brand-sky)', animation: 'scan-laser 2s linear infinite' }}></div>
                </div>
                <h2 style={{ fontSize: '1.5rem', color: 'var(--color-brand-navy)' }}>Extracting Text...</h2>
                <p style={{ color: 'var(--color-text-secondary)' }}>Using OCR AI to read your prescription.</p>
              </>
            ) : (
              <>
                <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(40, 167, 69, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' }}>
                  <CheckCircle2 size={64} color="var(--color-success-green)" />
                </div>
                <h2 style={{ fontSize: '1.75rem', color: 'var(--color-brand-navy)', marginBottom: '1rem' }}>Success!</h2>
                <p style={{ color: 'var(--color-text-secondary)', maxWidth: '300px' }}>
                  Medicines extracted and scheduled successfully.
                </p>
              </>
            )}

          </div>
        </div>
      )}

      {/* Adding local styles for the scanning laser */}
      <style>{`
        @keyframes scan-laser {
          0% { transform: translateY(0); }
          50% { transform: translateY(350px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
