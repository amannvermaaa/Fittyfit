import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, X, ScanFace } from 'lucide-react';
import { LogoMark } from '../components/Logo';
import './Auth.css';

export const Login = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    loginId: '',
    password: ''
  });

  const [validation, setValidation] = useState({
    loginId: null,
    password: null
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (validation[e.target.name] === false) {
      setValidation({ ...validation, [e.target.name]: null });
    }
  };

  const validateField = (name, value) => {
    let isValid = false;
    if (name === 'loginId') {
      isValid = value.trim().length > 3; // Basic check for email/phone
    } else if (name === 'password') {
      isValid = value.length >= 6;
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
    const idValid = validateField('loginId', formData.loginId);
    const passValid = validateField('password', formData.password);
    
    if (idValid && passValid) {
      // Simulate login success
      navigate('/');
    }
  };

  const handleBiometric = () => {
    // Simulate biometric login
    navigate('/');
  };

  const renderInput = (label, name, type, placeholder) => {
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
        </div>
      </div>
    );
  };

  return (
    <div className="auth-container">
      <div className="brand-pin-top-right">
        <LogoMark size={36} />
      </div>

      <div className="glass-card auth-card auth-card-light animate-in">
        <div className="auth-header">
          <h1>Welcome Back</h1>
          <p>Log in to access your health dashboard.</p>
        </div>

        <form onSubmit={handleSubmit}>
          {renderInput('Phone Number or Email', 'loginId', 'text', 'john@example.com')}
          
          <div style={{ position: 'relative' }}>
            {renderInput('Password', 'password', 'password', '••••••••')}
            <Link to="#" style={{ position: 'absolute', top: 0, right: 0, fontSize: '0.75rem', color: 'var(--color-brand-mid)', textDecoration: 'none', fontWeight: 500 }}>
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', marginTop: '1rem', fontSize: '1.125rem' }}>
            Log In
          </button>
        </form>

        <div className="divider-gold" style={{ margin: '2rem 0' }}></div>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <button 
            type="button" 
            onClick={handleBiometric}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-brand-navy)' }}
          >
            <div style={{ padding: '1rem', background: 'rgba(59, 111, 160, 0.1)', borderRadius: '50%' }}>
              <ScanFace size={32} />
            </div>
            <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Face ID Login</span>
          </button>
        </div>

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
          Don't have an account? <Link to="/register" style={{ color: 'var(--color-brand-mid)', fontWeight: 600, textDecoration: 'none' }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
};
