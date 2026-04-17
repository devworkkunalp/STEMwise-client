import React, { useState, useEffect } from 'react';
import { useResearch } from '../../context/ResearchContext';
import { useMobile } from '../../hooks/useMobile';
import CostDesktop from './views/CostDesktop';
import CostMobile from './views/CostMobile';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import profileService from '../../services/profileService';

const CostBuilder = () => {
  const { selectedUniversity, selectedCourse, hydrateFromProfile } = useResearch();
  const { profile, refreshProfile, loading } = useAuth();
  const navigate = useNavigate();
  const isMobile = useMobile();

  const [livingStyle, setLivingStyle] = useState(profile?.livingStyle || 'Off-Campus');
  const [hasScholarship, setHasScholarship] = useState(profile?.hasScholarship || false);
  const [scholarshipAmount, setScholarshipAmount] = useState(profile?.scholarshipAmount || 0);

  // Sync state if profile changes (hydration)
  useEffect(() => {
    if (profile) {
      if (profile.livingStyle) setLivingStyle(profile.livingStyle);
      if (profile.hasScholarship) setHasScholarship(profile.hasScholarship);
      if (profile.scholarshipAmount) setScholarshipAmount(profile.scholarshipAmount);
    }
  }, [profile]);

  // Hydrate from profile if needed
  useEffect(() => {
    if (!selectedUniversity && profile) {
      hydrateFromProfile(profile);
    }
  }, [profile, selectedUniversity, hydrateFromProfile]);

  useEffect(() => {
    if (!loading && (!selectedUniversity || !selectedCourse) && !profile?.targetUniversity) {
      navigate('/course-explorer');
    }
  }, [selectedUniversity, selectedCourse, navigate, loading, profile]);

  // Derived Calculations
  const duration = selectedCourse?.duration?.includes('2') ? 2 : 1.5;
  const annualTuition = (selectedUniversity?.tuition || 45000) / 2; // Mock logic: UI uses 2yr total
  const annualLiving = livingStyle === 'On-Campus' ? 22000 : 16000;
  
  const totalTuition = (annualTuition * duration) - (hasScholarship ? scholarshipAmount : 0);
  const totalLiving = annualLiving * duration;
  const miscCosts = 5000; // Visa, Flights, Insurance
  
  const grandTotal = totalTuition + totalLiving + miscCosts;

  const handleContinue = async () => {
    try {
      if (profile) {
        await profileService.upsertProfile({
          ...profile,
          annualTuition: annualTuition,
          annualLivingCost: annualLiving,
          programDurationYears: Math.ceil(duration)
        });
        await refreshProfile(true);
      }
      navigate('/funding');
    } catch (error) {
      console.error('Failed to save costs:', error);
      navigate('/funding');
    }
  };

  if (loading || !selectedUniversity || !selectedCourse) {
    if (!loading && !profile?.targetUniversity) return null;
    return <div className="p-8 text-center" style={{ color: 'var(--hint)' }}>Synchronizing your profile...</div>;
  }

  const viewProps = {
    university: selectedUniversity,
    course: selectedCourse,
    calculation: {
      duration,
      annualTuition,
      annualLiving,
      totalTuition,
      totalLiving,
      miscCosts,
      grandTotal
    },
    livingStyle,
    setLivingStyle,
    hasScholarship,
    setHasScholarship,
    scholarshipAmount,
    setScholarshipAmount,
    onContinue: handleContinue
  };

  return isMobile ? <CostMobile {...viewProps} /> : <CostDesktop {...viewProps} />;
};

export default CostBuilder;
