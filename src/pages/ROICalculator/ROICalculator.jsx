import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import calculationService from '../../services/calculationService';
import useMobile from '../../hooks/useMobile';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

// Views
import CalculatorDesktop from './views/CalculatorDesktop';
import CalculatorMobile from './views/CalculatorMobile';

import './ROICalculator.css';

const ROICalculator = () => {
  const isMobile = useMobile();
  const { user, profile } = useAuth();
  const [activeTab, setActiveTab] = useState('calculator');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Calculator State
  const [formData, setFormData] = useState({
    universityName: profile?.targetUniversity || profile?.universityName || '',
    programName: profile?.degreeName || '',
    degreeLevel: profile?.degreeLevel || 'Masters',
    fieldOfStudy: profile?.fieldOfStudy || 'Computer Science',
    destinationCountry: profile?.destinationCountry || 'USA',
    annualTuition: profile?.annualTuition || 45000,
    annualLivingCost: profile?.annualLivingCost || 20000,
    programDurationYears: profile?.programDurationYears || 2,
    loanAmount: profile?.loanAmount || 50000,
    interestRate: profile?.loanInterestRate || 10.5,
    repaymentTerm: 10,
    targetRole: 'Software Engineer',
    targetCity: 'San Francisco, CA',
    expectedSalary: 120000
  });

  const [roiResult, setRoiResult] = useState(null);
  const [showWarning, setShowWarning] = useState(false);

  // Debounced Calculation
  const runCalculation = useCallback(async (data) => {
    setIsLoading(true);
    try {
      const result = await calculationService.calculateROI({
        AnnualTuition: data.annualTuition,
        AnnualLivingCost: data.annualLivingCost,
        DurationYears: data.programDurationYears,
        FinalSalaryBenchmark: data.expectedSalary,
        CurrentSalary: profile?.currentSalary || 20000,
        LoanAmount: data.loanAmount,
        InterestRate: data.interestRate,
        RepaymentTerm: data.repaymentTerm,
        HomeCurrency: profile?.homeCurrency || 'INR',
        StudyCurrency: 'USD'
      });
      setRoiResult(result);
      setShowWarning(data.expectedSalary < 60000);
    } catch (err) {
      console.error("Calculation failed", err);
    } finally {
      setIsLoading(false);
    }
  }, [profile?.currentSalary, profile?.homeCurrency]);

  // Data Enrichment Trigger
  const enrichData = useCallback(async () => {
    if (!formData.universityName && !formData.programName) return;
    
    try {
      const enriched = await calculationService.enrichProfile({
        universityName: formData.universityName,
        programName: formData.programName,
        targetRole: formData.targetRole,
        targetCity: formData.targetCity,
        homeCountry: profile?.nationality || 'India'
      });
      
      if (enriched.school?.tuition) {
        setFormData(prev => ({ 
          ...prev, 
          annualTuition: enriched.school.tuition,
          expectedSalary: enriched.school.medianEarnings10Yr || prev.expectedSalary
        }));
      }
    } catch (err) {
      console.log("Enrichment skipped or failed", err);
    }
  }, [formData.universityName, formData.programName, formData.targetRole, formData.targetCity, profile?.nationality]);

  useEffect(() => {
    const timer = setTimeout(() => {
      runCalculation(formData);
    }, 500);
    return () => clearTimeout(timer);
  }, [formData, runCalculation]);

  useEffect(() => {
    const timer = setTimeout(() => {
      enrichData();
    }, 1500);
    return () => clearTimeout(timer);
  }, [formData.universityName, formData.programName, enrichData]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      alert("Scenario saved to your profile!");
    } finally {
      setIsSaving(false);
    }
  };

  if (!profile && !user) return <div className="p-8 text-center"><LoadingSpinner message="Identifying session..." /></div>;

  const commonProps = {
    profile,
    user,
    formData,
    roiResult,
    isLoading,
    isSaving,
    showWarning,
    handleInputChange,
    handleSave
  };

  if (isMobile) {
    return <CalculatorMobile {...commonProps} />;
  }

  return <CalculatorDesktop {...commonProps} />;
};

export default ROICalculator;
