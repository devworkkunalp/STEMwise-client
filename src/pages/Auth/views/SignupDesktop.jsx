import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Desktop-Specific View for Signup Page.
 */
const SignupDesktop = ({
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
    <div className="auth-shell animate-fade-in">
      {/* Left brand panel */}
      <div className="auth-left">
        <div className="al-logo">STEMwise</div>
        <div className="al-hero">
          <div className="al-eyebrow">Free to start · No credit card</div>
          <div className="al-headline">Your ROI report<br />in <span>under 5</span><br />minutes.</div>
          <div className="al-sub">Answer 5 quick questions about your profile. We'll give you a personalized payback period, ROI score, and H-1B probability — all in your home currency.</div>
          <div style={{ background: 'var(--n3)', borderRadius: '14px', padding: '18px', border: '1px solid var(--bdr)', marginTop: '4px' }}>
            <div style={{ fontSize: '10px', fontFamily: 'var(--fm)', color: 'var(--hint)', textTransform: 'uppercase', letterSpacing: '.12em', marginBottom: '12px' }}>What you'll get</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '13px', color: 'var(--muted)', display: 'flex', gap: '8px', alignItems: 'flex-start' }}><span style={{ color: 'var(--teal)', fontWeight: 700, flexShrink: 0 }}>✓</span>Personalized ROI score in your home currency</div>
              <div style={{ fontSize: '13px', color: 'var(--muted)', display: 'flex', gap: '8px', alignItems: 'flex-start' }}><span style={{ color: 'var(--teal)', fontWeight: 700, flexShrink: 0 }}>✓</span>Real payback period with your loan structure</div>
              <div style={{ fontSize: '13px', color: 'var(--muted)', display: 'flex', gap: '8px', alignItems: 'flex-start' }}><span style={{ color: 'var(--teal)', fontWeight: 700, flexShrink: 0 }}>✓</span>H-1B odds under the 2026 wage-based system</div>
              <div style={{ fontSize: '13px', color: 'var(--muted)', display: 'flex', gap: '8px', alignItems: 'flex-start' }}><span style={{ color: 'var(--teal)', fontWeight: 700, flexShrink: 0 }}>✓</span>Side-by-side country comparison</div>
              <div style={{ fontSize: '13px', color: 'var(--muted)', display: 'flex', gap: '8px', alignItems: 'flex-start' }}><span style={{ color: 'var(--teal)', fontWeight: 700, flexShrink: 0 }}>✓</span>What-if scenario modeling</div>
            </div>
          </div>
        </div>
        <div className="trust-row">
          <div className="trust-pill">100% lender-neutral</div>
          <div className="trust-pill">Data never sold</div>
        </div>
      </div>

      {/* Right panel */}
      <div className="auth-right">
        <div className="ar-nav">
          <div className="ar-step-info">CREATE ACCOUNT</div>
          <div className="ar-switch">Already a member? <Link to="/login">Sign in →</Link></div>
        </div>

        <div className="ar-title">Create your account</div>
        <div className="ar-subtitle">Free forever. No credit card. Takes 30 seconds.</div>

        {/* Social Auth */}
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
          <div className="divider-text">OR CREATE WITH EMAIL</div>
          <div className="divider-line"></div>
        </div>

        {error && (
          <div className="field-error" style={{ marginBottom: '16px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSignup}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">First name</label>
              <input className="form-input" type="text" placeholder="Arjun" required />
            </div>
            <div className="form-group">
              <label className="form-label">Last name</label>
              <input className="form-input" type="text" placeholder="Mehta" required />
            </div>
          </div>

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
            <div className="field-hint">Using a .edu email unlocks verified student benefits</div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="form-input-icon">
              <input 
                className="form-input" 
                type="password" 
                placeholder="Min 8 characters" 
                id="signup-pw-desktop" 
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
                  const input = document.getElementById('signup-pw-desktop');
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
              <div className="strength-label" style={{ color: strength === 0 ? 'var(--hint)' : strength === 1 ? 'var(--coral)' : strength === 2 ? 'var(--amber)' : 'var(--teal)' }}>
                {strength === 0 ? 'Enter a password' : strength === 1 ? 'Weak' : strength === 2 ? 'Fair' : 'Strong'}
              </div>
            </div>
          </div>

          <div className="check-row" onClick={() => setIsChecked(!isChecked)}>
            <div className={`check-box ${isChecked ? 'checked' : ''}`}></div>
            <div className="check-label">
              I agree to the <a>Terms of Service</a> and <a>Privacy Policy</a>. I understand STEMwise does not sell my data to lenders or universities.
            </div>
            <input type="checkbox" required checked={isChecked} onChange={() => {}} style={{ display: 'none' }} />
          </div>

          <button className="btn-submit" type="submit" disabled={isLoading}>
            {isLoading ? 'Creating account...' : 'Create account & start →'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupDesktop;
