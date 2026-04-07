import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { 
  Plus, 
  LogIn, 
  Rocket, 
  ChevronRight, 
  Info 
} from 'lucide-react';

// Atomic Components
import Button from './components/Button/Button';
import Badge from './components/Badge/Badge';
import InputField from './components/InputField/InputField';
import SelectField from './components/SelectField/SelectField';
import RangeSlider from './components/RangeSlider/RangeSlider';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';

// Visual Components & Widgets
import Navbar from './components/Navbar/Navbar';


// Core Services & Logic

import ProtectedRoute from './components/ProtectedRoute';
import calculationService from './services/calculationService';
import authService from './services/authService';
import { useAuth } from './context/AuthContext';

// Pages
import Onboarding from './pages/Onboarding/Onboarding';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Dashboard from './pages/Dashboard/Dashboard';
import ROICalculator from './pages/ROICalculator/ROICalculator';
import CountryCompare from './pages/CountryCompare/CountryCompare';
import VisaPathway from './pages/VisaPathway/VisaPathway';
import LoanSimulator from './pages/LoanSimulator/LoanSimulator';
import WhatIfEngine from './pages/WhatIfEngine/WhatIfEngine';


import './index.css';


function App() {
  const { user, isAuthenticated, profile, loading: authLoading, refreshProfile } = useAuth();
  const navigate = useNavigate();

  const handleFinishOnboarding = async () => {
    await refreshProfile(user.id);
    navigate('/dashboard', { replace: true });
  };

  const handleLogout = async () => {
    await authService.signOut();
    navigate('/login');
  };

  if (authLoading) return <LoadingSpinner fullPage message="Verifying session..." />;

  /**
   * Landing Page / Protected Entry Point Component
   */
  const LandingOrRedirect = () => {
    if (isAuthenticated) {
      if (!profile) return <Navigate to="/onboarding" replace />;
      return <Navigate to="/dashboard" replace />;
    }
    return (
      <div className="sw-app-root">
        <Navbar isAuthenticated={false} onLogout={handleLogout} />
        <main className="sw-main-content" style={{ marginLeft: 0, width: '100%' }}>
          <div className="container-premium animate-fade-in" style={{ paddingTop: '100px' }}>
            <div className="flex-center" style={{ minHeight: '60vh', flexDirection: 'column', gap: 'var(--space-6)' }}>
              <Badge variant="warning">Auth Required</Badge>
              <h1 className="text-gradient">Unlock Financial Insights</h1>
              <p className="text-secondary" style={{ maxWidth: '400px', textAlign: 'center' }}>
                Sign in to access the STEMwise calculation engine and compare global ROI scenarios.
              </p>
              <Button variant="primary" icon={LogIn} onClick={() => navigate('/login')}>
                Go to Login
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  };

  return (
    <Routes>
      <Route path="/" element={<LandingOrRedirect />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route 
        path="/onboarding" 
        element={
          <ProtectedRoute>
            <Onboarding onComplete={handleFinishOnboarding} />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/calculator" 
        element={
          <ProtectedRoute>
            <ROICalculator />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/compare" 
        element={
          <ProtectedRoute>
            <CountryCompare />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/visa" 
        element={
          <ProtectedRoute>
            <VisaPathway />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/loan" 
        element={
          <ProtectedRoute>
            <LoanSimulator />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/scenarios" 
        element={
          <ProtectedRoute>
            <WhatIfEngine />
          </ProtectedRoute>
        } 
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;


