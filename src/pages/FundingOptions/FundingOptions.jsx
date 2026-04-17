import React, { useState, useEffect } from 'react';
import { useResearch } from '../../context/ResearchContext';
import { useMobile } from '../../hooks/useMobile';
import FundingDesktop from './views/FundingDesktop';
import FundingMobile from './views/FundingMobile';
import { FUNDING_SOURCES } from '../Research/data/researchMock';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import profileService from '../../services/profileService';

const FundingOptions = () => {
  const { selectedUniversity, selectedCourse, hydrateFromProfile } = useResearch();
  const { profile, refreshProfile, loading } = useAuth();
  const navigate = useNavigate();
  const isMobile = useMobile();

  // State for the mini-calculator
  const [loanAmount, setLoanAmount] = useState(80000);
  const [interestRate, setInterestRate] = useState(12);
  const [tenureYears, setTenureYears] = useState(10);

  // Hydrate from profile if needed
  useEffect(() => {
    if (!selectedUniversity && profile) {
      hydrateFromProfile(profile);
    }
  }, [profile, selectedUniversity, hydrateFromProfile]);

  useEffect(() => {
    if (!loading && (!selectedUniversity || !selectedCourse) && !profile?.targetUniversity) {
      navigate('/costs');
    }
  }, [selectedUniversity, selectedCourse, navigate, loading, profile]);

  // Basic EMI Formula: [P x R x (1+R)^N]/[(1+R)^N-1]
  const calculateEMI = () => {
    const P = loanAmount;
    const r = interestRate / 12 / 100;
    const n = tenureYears * 12;
    if (r === 0) return P / n;
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi);
  };

  const handleFinish = async () => {
    try {
      if (profile) {
        await profileService.upsertProfile({
          ...profile,
          loanAmount: loanAmount,
          loanInterestRate: interestRate
        });
        await refreshProfile(true);
      }
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to save funding:', error);
      navigate('/dashboard');
    }
  };

  if (loading || !selectedUniversity || !selectedCourse) {
    if (!loading && !profile?.targetUniversity) return null;
    return <div className="p-8 text-center" style={{ color: 'var(--hint)' }}>Synchronizing your funding profile...</div>;
  }

  const viewProps = {
    sources: FUNDING_SOURCES,
    calculator: {
      loanAmount, setLoanAmount,
      interestRate, setInterestRate,
      tenureYears, setTenureYears,
      emi: calculateEMI(),
      totalRepay: calculateEMI() * tenureYears * 12
    },
    onFinish: handleFinish
  };

  return isMobile ? <FundingMobile {...viewProps} /> : <FundingDesktop {...viewProps} />;
};

export default FundingOptions;
