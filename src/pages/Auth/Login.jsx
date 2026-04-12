import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogIn, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button/Button';
import InputField from '../../components/InputField/InputField';
import './Auth.css';

/**
 * Login Page for STEMwise.
 * Handles local authentication via .NET ASP.NET Core Native Endpoints.
 */
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || "/dashboard";

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await login(email, password);
      // login method will automatically set context and refresh profile
      navigate(from, { replace: true });
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.message || "Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-shell animate-fade-in">
      {/* Left brand panel */}
      <div className="auth-left">
        <div className="al-logo">STEMwise</div>
        <div className="al-hero">
          <div className="al-eyebrow">The only lender-independent tool</div>
          <div className="al-headline">Know if your<br />STEM degree<br /><span>actually pays off.</span></div>
          <div className="al-sub">Personalized ROI modeling for international students. Accounts for OPT, H-1B odds, your home currency, and the real cost of studying abroad. Zero lender bias.</div>
          
          {/* Live preview card */}
          <div className="preview-card">
            <div className="pc-row">
              <div>
                <div className="pc-label">ROI Score — Arjun, MS CS @ CMU</div>
                <div style={{ marginTop: '6px' }}>
                  <span className="pc-score">75</span>
                  <span className="pc-badge">Strong ROI</span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="pc-label">Payback</div>
                <div className="pc-payback" style={{ marginTop: '6px' }}>3.2 yrs</div>
              </div>
            </div>
            <div className="pc-metrics">
              <div className="pc-metric" style={{ background: '#0D1B2A' }}>
                <div className="pcm-k" style={{ color: 'var(--hint)' }}>Total Cost</div>
                <div className="pcm-v" style={{ color: 'var(--white)' }}>$87K</div>
              </div>
              <div className="pc-metric" style={{ background: 'rgba(0,201,167,.08)' }}>
                <div className="pcm-k" style={{ color: 'var(--teal)' }}>OPT Salary</div>
                <div className="pcm-v" style={{ color: 'var(--teal)' }}>$118K</div>
              </div>
              <div className="pc-metric" style={{ background: 'rgba(244,168,50,.08)' }}>
                <div className="pcm-k" style={{ color: 'var(--amber)' }}>H-1B Odds</div>
                <div className="pcm-v" style={{ color: 'var(--amber)' }}>48%</div>
              </div>
            </div>
            <div style={{ fontSize: '10px', color: 'var(--hint)', textAlign: 'center', marginTop: '10px', fontFamily: 'var(--fm)' }}>
              ₹7.2L equivalent · INR scenario included
            </div>
          </div>
        </div>
        <div className="trust-row">
          <div className="trust-pill">No credit card needed</div>
          <div className="trust-pill">100% lender-neutral</div>
          <div className="trust-pill">DOL · USCIS · Scorecard</div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="auth-right">
        <div className="ar-nav">
          <div className="ar-step-info">SIGN IN</div>
          <div className="ar-switch">New to STEMwise? <Link to="/signup">Create account →</Link></div>
        </div>

        <div className="ar-title">Welcome back</div>
        <div className="ar-subtitle">Sign in to your STEMwise account to continue your ROI analysis.</div>

        {/* Social */}
        <div className="social-row">
          <button className="social-btn" type="button">
            <div className="social-icon" style={{ background: '#fff', color: '#333', fontSize: '11px' }}>G</div>
            Continue with Google
          </button>
          <button className="social-btn" type="button">
            <div className="social-icon" style={{ background: '#0078D4', color: '#fff', fontSize: '10px' }}>MS</div>
            Microsoft
          </button>
        </div>
        <div className="divider-row">
          <div className="divider-line"></div>
          <div className="divider-text">OR SIGN IN WITH EMAIL</div>
          <div className="divider-line"></div>
        </div>

        {error && (
          <div className="field-error" style={{ marginBottom: '16px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Email address</label>
            <input 
              className="form-input" 
              type="email" 
              placeholder="you@university.edu" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              Password
              <button type="button" className="btn-link">Forgot password?</button>
            </label>
            <div className="form-input-icon">
              <input 
                className="form-input" 
                type="password" 
                placeholder="Enter your password" 
                id="login-pw" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
              <button 
                type="button" 
                className="fii-btn" 
                onClick={() => {
                  const input = document.getElementById('login-pw');
                  input.type = input.type === 'password' ? 'text' : 'password';
                }}
              >
                SHOW
              </button>
            </div>
          </div>

          <div className="check-row" onClick={() => setIsChecked(!isChecked)}>
            <div className={`check-box ${isChecked ? 'checked' : ''}`}></div>
            <div className="check-label">Keep me signed in on this device</div>
            <input type="checkbox" checked={isChecked} onChange={() => {}} style={{ display: 'none' }} />
          </div>

          <button className="btn-submit" type="submit" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign in to STEMwise'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '12px', color: 'var(--hint)' }}>
          By signing in you agree to our <a style={{ color: 'var(--teal)', cursor: 'pointer' }}>Terms of Service</a> and <a style={{ color: 'var(--teal)', cursor: 'pointer' }}>Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
