import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Mobile-Specific View for Signup Page.
 */
const SignupMobile = ({
  email, setEmail,
  password, setPassword,
  error,
  isLoading,
  isChecked, setIsChecked,
  strength,
  checkStrength,
  handleSignup
}) => {
  return (
    <div className="auth-mobile-container animate-fade-in">
      <div className="am-header">
        <div className="am-logo">STEMwise</div>
        <div className="am-switch">Member? <Link to="/login">Sign in</Link></div>
      </div>

      <div className="am-body" style={{ paddingBottom: '40px' }}>
        <div className="ar-title">Create account</div>
        <div className="ar-subtitle">Takes 30 seconds. No credit card needed.</div>

        {error && (
          <div className="field-error" style={{ marginBottom: '16px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label className="form-label">University email</label>
            <input 
              className="form-input" 
              type="email" 
              placeholder="arjun@cmu.edu" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="form-input-icon">
              <input 
                className="form-input" 
                type="password" 
                placeholder="Min 8 characters" 
                id="signup-pw-mobile" 
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  checkStrength(e.target.value);
                }}
                required 
              />
              <button 
                type="button"
                className="fii-btn" 
                onClick={() => {
                  const input = document.getElementById('signup-pw-mobile');
                  input.type = input.type === 'password' ? 'text' : 'password';
                }}
              >
                SHOW
              </button>
            </div>
            <div className="strength-wrap">
              <div className="strength-bars">
                <div className={`str-bar ${strength >= 1 ? (strength === 1 ? 'weak' : strength === 2 ? 'fair' : 'good') : ''}`}></div>
                <div className={`str-bar ${strength >= 2 ? (strength === 2 ? 'fair' : 'good') : ''}`}></div>
                <div className={`str-bar ${strength >= 3 ? (strength === 3 ? 'fair' : 'good') : ''}`}></div>
                <div className={`str-bar ${strength >= 4 ? 'good' : ''}`}></div>
              </div>
            </div>
          </div>

          <div className="check-row" onClick={() => setIsChecked(!isChecked)} style={{ marginTop: '20px' }}>
            <div className={`check-box ${isChecked ? 'checked' : ''}`}></div>
            <div className="check-label" style={{ fontSize: '11px' }}>
              I agree to the <a>Terms</a> and <a>Privacy Policy</a>. STEMwise never sells data.
            </div>
            <input type="checkbox" required checked={isChecked} onChange={() => {}} style={{ display: 'none' }} />
          </div>

          <button className="btn-submit" type="submit" disabled={isLoading} style={{ marginTop: '24px' }}>
            {isLoading ? 'Creating...' : 'Create account & start'}
          </button>
        </form>

        <div className="divider-row" style={{ margin: '32px 0' }}>
          <div className="divider-line"></div>
          <div className="divider-text">OR SIGN UP WITH</div>
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
      </div>
    </div>
  );
};

export default SignupMobile;
