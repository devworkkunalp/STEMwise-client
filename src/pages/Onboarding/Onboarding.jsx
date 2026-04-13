import React, { useState, useMemo } from 'react';
import profileService from '../../services/profileService';
import { useAuth } from '../../context/AuthContext';
import { useMobile } from '../../hooks/useMobile';
import OnboardingDesktop from './views/OnboardingDesktop';
import OnboardingMobile from './views/OnboardingMobile';
import './Onboarding.css';

/**
 * Onboarding Container Component.
 * Manages the multi-step form state and profile submission logic.
 * Renders platform-optimized views via OnboardingDesktop and OnboardingMobile.
 */
const Onboarding = ({ onComplete }) => {
  const isMobile = useMobile();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const totalSteps = 5;
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    nationality: 'India',
    stemField: 'Computer Science / AI',
    degreeLevel: 'Master\'s (MS/MEng)',
    intakeTerm: 'Fall 2026',
    university: '',
    tuition: 45000,
    livingCost: 18000,
    loanAmount: 52000,
    loanType: 'Federal Unsubsidized (7.94%)',
    visaPathway: 'OPT → H-1B (Standard)',
    targetSalary: 115000,
    currentSalary: 15000,
    experienceYears: 2
  });

  const nextStep = () => setStep(s => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await profileService.upsertProfile({
        displayName: user?.name || 'Student',
        nationality: formData.nationality,
        homeCurrency: formData.nationality === 'India' ? 'INR' : 'USD',
        stemField: formData.stemField,
        degreeLevel: 1, 
        intakeTerm: formData.intakeTerm,
        targetSalary: formData.targetSalary,
        currentSalary: formData.currentSalary,
        annualTuition: formData.tuition,
        annualLivingCost: formData.livingCost,
        loanAmount: formData.loanAmount
      });
      if (onComplete) onComplete();
    } catch (error) {
      console.error("Onboarding failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const liveROI = useMemo(() => {
    // Shared live ROI calculation for both views
    if (step < 2) return { score: 0, payback: '—', status: 'empty' };
    
    const annualTotal = formData.tuition + formData.livingCost;
    const totalInvest = annualTotal * 2;
    const annualRepay = (formData.loanAmount / 10) + (formData.loanAmount * 0.08); 
    
    const payback = (totalInvest / (formData.targetSalary * 0.4)).toFixed(1);
    const score = Math.round(Math.max(30, 85 - (formData.loanAmount / 1500) + (formData.targetSalary / 5000)));
    
    let status = 's-mid';
    if (score > 80) status = 's-high';
    if (score < 50) status = 'low'; // mapped for mobile pill style too

    return { 
      score: Math.min(98, score), 
      payback: `${payback} yrs`,
      status
    };
  }, [formData, step]);

  const steps = [
    { n: 1, label: "Your Profile", sub: "Benchmark basics" },
    { n: 2, label: "University", sub: "Degrees & Costs" },
    { n: 3, label: "Loan Structure", sub: "Lender analysis" },
    { n: 4, label: "Visa Pathway", sub: "Legal modeling" },
    { n: 5, label: "Salary Outcome", sub: "The bottom line" }
  ];

  const viewProps = {
    step, totalSteps, formData, handleInputChange, steps, liveROI,
    prevStep, nextStep, handleSubmit, isSubmitting
  };

  return isMobile ? (
    <OnboardingMobile {...viewProps} />
  ) : (
    <OnboardingDesktop {...viewProps} />
  );
};

export default Onboarding;
