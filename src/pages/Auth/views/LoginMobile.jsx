import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Mobile-Specific View for Login Page.
 * Streamlined single-column layout with touch-friendly fields.
 */
const LoginMobile = ({ 
  email, setEmail, 
  password, setPassword, 
  error, 
  isLoading, 
  isChecked, setIsChecked, 
  handleLogin 
}) => {
  return (
    <div className="auth-mobile-container animate-fade-in">
      <div className="am-header">
        <div className="am-logo">STEMwise</div>
        <div className="am-switch">New? <Link to="/signup">Create account</Link></div>
      </div>

      <div className="am-body">
        <div className="ar-title">Welcome back</div>
        <div className="ar-subtitle">Sign in to your STEMwise account to continue.</div>

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
              <button type="button" className="btn-link">Forgot?</button>
            </label>
            <div className="form-input-icon">
              <input 
                className="form-input" 
                type="password" 
                placeholder="Enter your password" 
                id="login-pw-mobile" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
              <button 
                type="button" 
                className="fii-btn" 
                onClick={() => {
                  const input = document.getElementById('login-pw-mobile');
                  input.type = input.type === 'password' ? 'text' : 'password';
                }}
              >
                SHOW
              </button>
            </div>
          </div>

          <div className="check-row" onClick={() => setIsChecked(!isChecked)} style={{ marginTop: '20px' }}>
            <div className={`check-box ${isChecked ? 'checked' : ''}`}></div>
            <div className="check-label">Keep me signed in</div>
            <input type="checkbox" checked={isChecked} onChange={() => {}} style={{ display: 'none' }} />
          </div>

          <button className="btn-submit" type="submit" disabled={isLoading} style={{ marginTop: '24px' }}>
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="divider-row" style={{ margin: '32px 0' }}>
          <div className="divider-line"></div>
          <div className="divider-text">OR CONTINUE WITH</div>
          <div className="divider-line"></div>
        </div>

        <div className="social-row">
          <button className="social-btn" type="button">
            <div className="social-icon" style={{ background: '#fff', color: '#333', fontSize: '11px' }}>G</div>
            Google
          </button>
          <button className="social-btn" type="button">
            <div className="social-icon" style={{ background: '#0078D4', color: '#fff', fontSize: '10px' }}>MS</div>
            Microsoft
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px', fontSize: '11px', color: 'var(--hint)' }}>
          By signing in you agree to our <a>Terms</a> and <a>Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};

export default LoginMobile;
