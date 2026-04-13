import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useMobile } from '../../hooks/useMobile';
import LoginDesktop from './views/LoginDesktop';
import LoginMobile from './views/LoginMobile';
import './Auth.css';

/**
 * Login Page for STEMwise.
 * Handles local authentication via .NET ASP.NET Core Native Endpoints.
 * Branches into Mobile and Desktop views for an optimized responsive experience.
 */
const Login = () => {
  const isMobile = useMobile();
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

  const commonProps = {
    email, setEmail,
    password, setPassword,
    error,
    isLoading,
    isChecked, setIsChecked,
    handleLogin
  };

  return isMobile ? (
    <LoginMobile {...commonProps} />
  ) : (
    <LoginDesktop {...commonProps} />
  );
};

export default Login;
