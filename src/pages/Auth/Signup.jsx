import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, AlertCircle, Compass } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import authService from '../../services/authService';
import Button from '../../components/Button/Button';
import InputField from '../../components/InputField/InputField';
import './Auth.css';

/**
 * Signup Page for STEMwise.
 * Facilitates the creation of new student accounts via Supabase.
 */
const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { refreshProfile } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Basic Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const { user, error: authError } = await authService.signUp(formData.email, formData.password);
      
      if (authError) throw authError;

      if (user) {
        // Redirection logic to onboarding and profile refresh
        await refreshProfile(user.id);
        navigate("/onboarding");
      }
    } catch (err) {
      console.error("Signup failed:", err);
      setError(err.message || "Registration failed. Please try again.");
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
          <h1 className="text-gradient">Get Started</h1>
          <p>Join 10,000+ students planning their STEM careers.</p>
        </div>

        {error && (
          <div className="auth-error-box animate-fade-in">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form className="auth-form" onSubmit={handleSignup}>
          <InputField 
            label="Full Name"
            placeholder="Arjun Patil"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
            autoComplete="name"
          />
          
          <InputField 
            label="Email Address"
            type="email"
            placeholder="arjun@example.com"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
            autoComplete="email"
          />
          
          <InputField 
            label="Password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            required
            autoComplete="new-password"
          />

          <InputField 
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
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
            Create Account
          </Button>
        </form>

        <div className="auth-footer">
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
