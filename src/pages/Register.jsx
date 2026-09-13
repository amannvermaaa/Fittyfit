import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, X, ShieldAlert, HeartPulse, User } from 'lucide-react';
import { LogoMark } from '../components/Logo';
import './Auth.css';

export const Register = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('Patient');
  
  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    emergencyName: '',
    emergencyPhone: ''
  });

  // Validation State (null = untouched, true = valid, false = invalid)
  const [validation, setValidation] = useState({
    name: null,
    phone: null,
    email: null,
    password: null,
    confirmPassword: null
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Reset validation state on change to stop shaking
    if (validation[e.target.name] === false) {
      setValidation({ ...validation, [e.target.name]: null });
    }
  };

  const validateField = (name, value) => {
    let isValid = false;
    switch (name) {
      case 'name':
        isValid = value.trim().length > 2;
        break;
      case 'email':
        isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        break;
      case 'phone':
        isValid = value.replace(/\D/g, '').length >= 10;
        break;
      case 'password':
        isValid = value.length >= 6;
        break;
      case 'confirmPassword':
        isValid = value === formData.password && value.length >= 6;
        break;
      default:
        isValid = true;
    }
    setValidation(prev => ({ ...prev, [name]: isValid }));
    return isValid;
  };

  const handleBlur = (e) => {
    if (e.target.value) {
      validateField(e.target.name, e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all required fields
    const fields = ['name', 'phone', 'email', 'password', 'confirmPassword'];
    let allValid = true;
    
    fields.forEach(field => {
      const isValid = validateField(field, formData[field]);
      if (!isValid) allValid = false;
    });

    if (allValid) {
      // Normally we'd call an API here. For now, simulate success and route to dashboard.
      // Save emergency contact to localStorage for the SOS feature
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('eudaimix_emergency_contact', JSON.stringify({
          name: formData.emergencyName,
          phone: formData.emergencyPhone
        }));
      }
      navigate('/');
    }
  };

  const renderInput = (label, name, type, placeholder, icon = null) => {
    const isValid = validation[name];
    const statusClass = isValid === true ? 'valid' : isValid === false ? 'invalid' : '';

    return (
      <div className="form-group">
        <label>{label}</label>
        <div className={`form-input-wrapper ${statusClass}`}>
          <input
            type={type}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
          />
          {isValid === true && <Check size={18} className="validation-icon success" />}
          {isValid === false && <X size={18} className="validation-icon invalid" style={{ color: 'var(--color-alert-red)' }} />}
          {isValid === null && icon && <span className="validation-icon" style={{ color: 'var(--color-text-secondary)' }}>{icon}</span>}
        </div>
      </div>
    );
  };

  return (
    <div className="auth-container">
      <div className="brand-pin-top-right">
        <LogoMark size={36} />
      </div>

      <div className="glass-card auth-card animate-in">
        <div className="auth-header">
          <h1>Create Account</h1>
          <p>Join Fitty Fit powered by EudaiMix to manage your health journey.</p>
        </div>

        <div className="segmented-control">
          {['Patient', 'Caregiver', 'Family'].map(type => (
            <button
              key={type}
              type="button"
              className={`segment-btn ${userType === type ? 'active' : ''}`}
              onClick={() => setUserType(type)}
            >
              {type}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {renderInput('Full Name', 'name', 'text', 'John Doe')}
          {renderInput('Phone Number', 'phone', 'tel', '(555) 000-0000')}
          {renderInput('Email Address', 'email', 'email', 'john@example.com')}
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ flex: 1 }}>{renderInput('Password', 'password', 'password', '••••••••')}</div>
            <div style={{ flex: 1 }}>{renderInput('Confirm Password', 'confirmPassword', 'password', '••••••••')}</div>
          </div>

          <div className="divider-gold" style={{ margin: '2rem 0 1.5rem 0' }}></div>
          
          <h3 style={{ fontSize: '1.125rem', color: 'var(--color-text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldAlert size={20} color="var(--color-alert-red)" />
            Emergency SOS Contact
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>
            This contact will be notified instantly when you activate the SOS feature.
          </p>

          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ flex: 1 }}>
              <input type="text" name="emergencyName" value={formData.emergencyName} onChange={handleChange} placeholder="Contact Name" className="form-input-wrapper" style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '12px', border: '1px solid var(--color-border-strong)', background: 'var(--color-surface-hover)' }} />
            </div>
            <div style={{ flex: 1 }}>
              <input type="tel" name="emergencyPhone" value={formData.emergencyPhone} onChange={handleChange} placeholder="Phone Number" className="form-input-wrapper" style={{ width: '100%', padding: '0.875rem 1rem', borderRadius: '12px', border: '1px solid var(--color-border-strong)', background: 'var(--color-surface-hover)' }} />
            </div>
          </div>

          <button type="submit" className="btn btn-gold" style={{ width: '100%', padding: '1rem', marginTop: '1rem', fontSize: '1.125rem' }}>
            Create Account
          </button>
        </form>

        <div className="social-row">
          <button type="button" className="btn-social">
            {/* Apple Icon */}
            <svg viewBox="0 0 384 512" width="18" height="18"><path fill="currentColor" d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
            Apple
          </button>
          <button type="button" className="btn-social">
            {/* Google Icon Approximation */}
            <svg viewBox="0 0 488 512" width="18" height="18"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/></svg>
            Google
          </button>
        </div>

        <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--color-brand-mid)', fontWeight: 600, textDecoration: 'none' }}>Log in</Link>
        </p>
      </div>
    </div>
  );
};
