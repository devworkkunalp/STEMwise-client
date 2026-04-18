import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useResearch } from '../../context/ResearchContext';
import calculationService from '../../services/calculationService';
import scenarioService from '../../services/scenarioService';
import useMobile from '../../hooks/useMobile';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { ShieldAlert } from 'lucide-react';
import Button from '../../components/Button/Button';

// Views
import DashboardDesktop from './views/DashboardDesktop';
import DashboardMobile from './views/DashboardMobile';

import './Dashboard.css';

const Dashboard = () => {
  const isMobile = useMobile();
  const { user, profile, refreshProfile, isAuthenticated, authError, loading } = useAuth();
  const { universities } = useResearch();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(false);
  const [roiResult, setRoiResult] = useState(null);
  const [loanValue, setLoanValue] = useState(profile?.loanAmount || 45000);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());
  const [history, setHistory] = useState([]);

  // Greeting Logic
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const matchedUni = universities?.find(u => u.name === profile?.targetUniversity || u.unitId === profile?.targetUniversity);
        
        const result = await calculationService.calculateROI({
          AnnualTuition: profile?.annualTuition ?? matchedUni?.annualTuition ?? 45000,
          AnnualLivingCost: profile?.annualLivingCost ?? 18000,
          DurationYears: profile?.programDurationYears || 2,
          LoanAmount: profile?.loanAmount || 0,
          InterestRate: profile?.loanInterestRate || 12,
          RepaymentTerm: 10, // Default repayment duration
          FinalSalaryBenchmark: profile?.targetSalary || matchedUni?.medianEarnings || 115000,
          CurrentSalary: profile?.currentSalary || 15000,
          HomeCurrency: profile?.nationality === 'India' ? 'INR' : 'USD',
          StudyCurrency: 'USD',
          TaxRate: 0.25
        });
        setRoiResult(result);
        
        // Fetch recent scenarios
        const histData = await scenarioService.getHistory();
        setHistory(histData?.slice(0, 3) || []);
        
        setLastUpdated(new Date().toLocaleTimeString());
      } catch (err) {
        console.error("Dashboard data fetch failed", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated && profile) {
      if (profile.loanAmount && !roiResult) {
        setLoanValue(profile.loanAmount);
      }
      fetchDashboardData();
    }
  }, [isAuthenticated, profile]);

  const handleRecalculate = async () => {
    setIsLoading(true);
    try {
      const matchedUni = universities?.find(u => u.name === profile?.targetUniversity || u.unitId === profile?.targetUniversity);
      
      const result = await calculationService.calculateROI({
        AnnualTuition: profile?.annualTuition ?? matchedUni?.annualTuition ?? 45000,
        AnnualLivingCost: profile?.annualLivingCost ?? 18000,
        DurationYears: profile?.programDurationYears || 2,
        LoanAmount: loanValue, // Using the sandbox slider value
        InterestRate: profile?.loanInterestRate || 12,
        RepaymentTerm: 10,
        FinalSalaryBenchmark: profile?.targetSalary || matchedUni?.medianEarnings || 115000,
        CurrentSalary: profile?.currentSalary || 15000,
        HomeCurrency: profile?.nationality === 'India' ? 'INR' : 'USD',
        StudyCurrency: 'USD',
        TaxRate: 0.25
      });
      setRoiResult(result);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      console.error("Recalculation failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  const displayName = profile?.displayName || user?.email?.split('@')[0] || 'Student';

  // Error Recovery UI
  if (authError && !profile) {
    return (
      <div className="flex-center h-screen flex-column p-4 text-center sw-app-root">
        <ShieldAlert size={48} className="text-coral mb-4" />
        <h2 className="title-gradient">Connection Issue</h2>
        <p className="text-secondary mb-6 max-width-400">
          We couldn't retrieve your profile data. The server might be busy.
        </p>
        <Button variant="primary" onClick={() => refreshProfile(user?.id, true)}>
          Retry Loading Profile
        </Button>
      </div>
    );
  }

  if (loading && !profile) return <LoadingSpinner fullPage message="Securely retrieving your STEM engine..." />;

  const commonProps = {
    profile,
    user,
    roiResult,
    handleRecalculate,
    isLoading,
    lastUpdated,
    displayName,
    getGreeting
  };

  if (isMobile) {
    return (
      <DashboardMobile 
        {...commonProps}
      />
    );
  }

  return (
    <DashboardDesktop 
      {...commonProps}
      loanValue={loanValue}
      setLoanValue={setLoanValue}
      history={history}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    />
  );
};

export default Dashboard;
