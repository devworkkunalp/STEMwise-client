import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogIn, Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import authService from '../../services/authService';
import Button from '../../components/Button/Button';
import InputField from '../../components/InputField/InputField';
import './Auth.css';

/**
 * Login Page for STEMwise.
 * Handles user authentication via Supabase and redirects to the intended destination.
 */
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { refreshProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || "/dashboard";

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { user, session, error: authError } = await authService.signIn(email, password);
      
      if (authError) throw authError;

      if (user) {
        // Refresh profile to see if they need onboarding
        await refreshProfile(user.id);
        navigate(from, { replace: true });
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.message || "Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page-root animate-fade-in">
      <div className="auth-container glass-panel">
        <div className="auth-header">
          <h1 className="text-gradient">Welcome Back</h1>
          <p>Sign in to access your STEMwise dashboard.</p>
        </div>

        {error && (
          <div className="auth-error-box animate-fade-in">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form className="auth-form" onSubmit={handleLogin}>
          <InputField 
            label="Email Address"
            type="email"
            placeholder="arjun@example.com"
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
            autoComplete="current-password"
          />

          <Button 
            variant="primary" 
            type="submit" 
            fullWidth 
            icon={LogIn}
            isLoading={isLoading}
          >
            Sign In
          </Button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account? 
            <Link to="/signup" className="auth-link">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
