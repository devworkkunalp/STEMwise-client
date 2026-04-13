import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useMobile } from '../../hooks/useMobile';
import SignupDesktop from './views/SignupDesktop';
import SignupMobile from './views/SignupMobile';
import './Auth.css';

/**
 * Signup Page for STEMwise.
 * Handles local authentication via .NET ASP.NET Core Native Endpoints.
 * Branches into Mobile and Desktop versions.
 */
const Signup = () => {
  const isMobile = useMobile();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [strength, setStrength] = useState(0);
  
  const { signup, login } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await signup(email, password);
      await login(email, password);
      navigate('/onboarding', { replace: true });
    } catch (err) {
      console.error("Signup failed:", err);
      setError(err.message || "Failed to establish a secure origin. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const checkStrength = (pw) => {
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    setStrength(s);
  };

  const commonProps = {
    email, setEmail,
    password, setPassword,
    error,
    isLoading,
    isChecked, setIsChecked,
    strength,
    checkStrength,
    handleSignup
  };

  return isMobile ? (
    <SignupMobile {...commonProps} />
  ) : (
    <SignupDesktop {...commonProps} />
  );
};

export default Signup;
