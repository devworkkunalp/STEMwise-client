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
import LandingPage from './pages/LandingPage/LandingPage';
import Profile from './pages/Profile/Profile';
import ExploreSectors from './pages/ExploreSectors/ExploreSectors';
import SectorDeepDive from './pages/SectorDeepDive/SectorDeepDive';
import UniversityRankings from './pages/UniversityRankings/UniversityRankings';
import CourseExplorer from './pages/CourseExplorer/CourseExplorer';
import RealityCheck from './pages/RealityCheck/RealityCheck';
import CostBuilder from './pages/CostBuilder/CostBuilder';
import FundingOptions from './pages/FundingOptions/FundingOptions';


import './index.css';


function App() {
  const { user, isAuthenticated, profile, loading: authLoading, refreshProfile } = useAuth();
  const navigate = useNavigate();

  const handleFinishOnboarding = async () => {
    await refreshProfile(user.id);
    navigate('/explore', { replace: true });
  };

  const handleLogout = async () => {
    await authService.signOut();
    navigate('/login');
  };

  if (authLoading) return <LoadingSpinner fullPage message="Verifying session..." />;

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
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
        path="/profile" 
        element={
          <ProtectedRoute>
            <Profile />
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
      
      {/* Research Hub Routes */}
      <Route path="/explore" element={<ProtectedRoute><ExploreSectors /></ProtectedRoute>} />
      <Route path="/deep-dive" element={<ProtectedRoute><SectorDeepDive /></ProtectedRoute>} />
      <Route path="/rankings" element={<ProtectedRoute><UniversityRankings /></ProtectedRoute>} />
      <Route path="/course-explorer" element={<ProtectedRoute><CourseExplorer /></ProtectedRoute>} />
      <Route path="/reality-check" element={<ProtectedRoute><RealityCheck /></ProtectedRoute>} />
      <Route path="/costs" element={<ProtectedRoute><CostBuilder /></ProtectedRoute>} />
      <Route path="/funding" element={<ProtectedRoute><FundingOptions /></ProtectedRoute>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;


