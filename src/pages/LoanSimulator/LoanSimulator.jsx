import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import loanService from '../../services/loanService';
import useMobile from '../../hooks/useMobile';

// Components
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

// Views
import LoanDesktop from './views/LoanDesktop';
import LoanMobile from './views/LoanMobile';

import './LoanSimulator.css';

const LoanSimulator = () => {
  const isMobile = useMobile();
  const { user, profile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  // State for multiple loan comparison
  const [loans, setLoans] = useState([
    {
      id: 1,
      type: 'Federal Unsubsidized',
      principal: 20500,
      savings: 0,
      rate: 7.9,
      tenure: 10,
      grace: 6,
      isCapitalized: true,
      result: null
    },
    {
      id: 2,
      type: 'International Private',
      principal: 45000,
      savings: 0,
      rate: 11.5,
      tenure: 10,
      grace: 24,
      isCapitalized: true,
      result: null
    }
  ]);

  const [amortizationData, setAmortizationData] = useState([]);

  // Calculate comparisons
  const runSimulation = async () => {
    if (!profile) return;
    setIsLoading(true);
    try {
      // Total degree cost for gap detection (e.g. 2 years * (tuition + living))
      const totalCost = (profile.annualTuition + profile.annualLivingCost) * (profile.programDurationYears || 2);

      const updatedLoans = await Promise.all(loans.map(async (loan) => {
        // Calculate the true net loan after personal savings
        const netPrincipal = Math.max(0, loan.principal - (loan.savings || 0));
        
        // Federal Unsubsidized Cap Enforcement Rule (LN-01 Test Case)
        let gapAmount = 0;
        let effectivePrincipal = netPrincipal;
        if (loan.type.toLowerCase().includes('federal') && netPrincipal > 20500) {
          gapAmount = netPrincipal - 20500;
          effectivePrincipal = 20500; // Cap it for the backend simulation
        }

        const res = await loanService.calculateLoan({
          principal: effectivePrincipal,
          annualInterestRate: loan.rate,
          tenureYears: loan.tenure,
          gracePeriodMonths: loan.grace,
          isInterestCapitalized: loan.isCapitalized,
          totalEstimatedCost: totalCost
        });
        
        return { 
          ...loan, 
          result: { 
            ...res, 
            netPrincipal,
            gapAmount
          } 
        };
      }));
      setLoans(updatedLoans);
      
      // Map the backend amortization schedule for the first loan to the chart
      if (updatedLoans[0]?.result?.amortizationSchedule) {
        const chartData = updatedLoans[0].result.amortizationSchedule.map(point => ({
          name: `Month ${point.month}`,
          principal: point.principalPaid,
          interest: point.interestPaid,
          balance: point.remainingBalance
        }));
        setAmortizationData(chartData);
      }
    } catch (err) {
      console.error("Simulation failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    runSimulation();
  }, [profile]);

  const updateLoan = (id, field, value) => {
    // Sanitize input to prevent leading zeros while allowing empty string for fluid typing
    let sanitizedValue = value;
    if (typeof value === 'string' && value.length > 1 && value.startsWith('0')) {
      sanitizedValue = value.replace(/^0+/, '');
    }
    
    setLoans(loans.map(l => l.id === id ? { ...l, [field]: sanitizedValue } : l));
  };

  const addNewLoan = () => {
    if (loans.length < 3) {
      setLoans([...loans, {
        id: Date.now(),
        type: 'New Loan',
        principal: 25000,
        savings: 0,
        rate: 8.5,
        tenure: 10,
        grace: 6,
        isCapitalized: true,
        result: null
      }]);
    }
  };

  const removeLoan = (id) => {
    if (loans.length > 1) {
      setLoans(loans.filter(l => l.id !== id));
    }
  };

  // DTI Calculation Logic
  const calculateDTI = (monthlyEMI) => {
    const projectedMonthlyIncome = (profile?.targetSalary || 120000) / 12;
    return (monthlyEMI / projectedMonthlyIncome) * 100;
  };

  if (!profile) return <LoadingSpinner fullPage message="Crunching debt numbers..." />;

  const commonProps = {
    profile,
    user,
    loans,
    isLoading,
    amortizationData,
    updateLoan,
    addNewLoan,
    removeLoan,
    calculateDTI,
    runSimulation
  };

  if (isMobile) {
    return <LoanMobile {...commonProps} />;
  }

  return <LoanDesktop {...commonProps} />;
};

export default LoanSimulator;
