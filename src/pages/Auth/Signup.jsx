import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, AlertCircle, UserPlus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button/Button';
import InputField from '../../components/InputField/InputField';
import './Auth.css';

/**
 * Signup Page for STEMwise.
 * Handles local authentication via .NET ASP.NET Core Native Endpoints.
 */
const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { signup, login } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // 1. Hit the .NET /register endpoint
      await signup(email, password);
      // 2. Automatically log them in by fetching the JWT from /login
      await login(email, password);
      // 3. Navigate them to the onboarding funnel natively
      navigate('/onboarding', { replace: true });
    } catch (err) {
      console.error("Signup failed:", err);
      // Clean up server error mappings
      setError(err.message || "Failed to establish a secure origin. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page-root animate-fade-in">
      <div className="auth-container">
        <div className="auth-header">
          <div className="auth-logo-icon">
            <Compass size={32} />
          </div>
          <h1 className="text-gradient">Create Account</h1>
          <p>Join securely to start calculating your international ROI.</p>
        </div>

        {error && (
          <div className="auth-error-box animate-fade-in">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form className="auth-form" onSubmit={handleSignup}>
          <InputField 
            label="Email Address"
            type="email"
            placeholder="student@university.edu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          
          <InputField 
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
          />

          <Button 
            variant="primary" 
            type="submit" 
            fullWidth 
            icon={UserPlus}
            isLoading={isLoading}
          >
            Create Local Identity
          </Button>
        </form>

        <div className="auth-footer" style={{marginTop: '2rem'}}>
          <p>
            Already have an account? 
            <Link to="/login" className="auth-link">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
