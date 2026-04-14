import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';
import countryService from '../../services/countryService';
import calculationService from '../../services/calculationService';
import useMobile from '../../hooks/useMobile';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';
import { ShieldAlert } from 'lucide-react';
import Button from '../../components/Button/Button';

// Views
import CompareDesktop from './views/CompareDesktop';
import CompareMobile from './views/CompareMobile';

import './CountryCompare.css';

const CountryCompare = () => {
  const isMobile = useMobile();
  const { user, profile, loading: authLoading, authError, refreshProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('compare');
  const [isLoading, setIsLoading] = useState(true);
  const [allCountries, setAllCountries] = useState([]);
  const [selectedCodes, setSelectedCodes] = useState(['US', 'GB', 'DE', 'CA']);
  const [comparisonData, setComparisonData] = useState([]);

  // Fetch all countries reference data
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await countryService.getAllCountries();
        setAllCountries(data);
      } catch (err) {
        console.error("Countries fetch failed:", err);
      }
    };
    fetchCountries();
  }, []);

  // Update loading state based on comparison
  useEffect(() => {
    if (comparisonData.length > 0) setIsLoading(false);
  }, [comparisonData]);

  // Helper for differentiated country benchmarks
  const getCountryBenchmarks = (code) => {
    switch (code) {
      case 'DE': return { tuition: 500, salary: 65000, duration: 2, currency: 'EUR' }; // Germany
      case 'GB': return { tuition: 32000, salary: 55000, duration: 1, currency: 'GBP' }; // UK (1-yr Masters)
      case 'CA': return { tuition: 28000, salary: 78000, duration: 2, currency: 'CAD' }; // Canada
      case 'AU': return { tuition: 40000, salary: 82000, duration: 2, currency: 'AUD' }; // Australia
      default: return { 
        tuition: profile?.annualTuition || 45000, 
        salary: profile?.targetSalary || 115000, 
        duration: profile?.programDurationYears || 2, 
        currency: 'USD' 
      };
    }
  };

  // Run batch comparison
  const runComparison = useCallback(async () => {
    if (!profile) return;
    setIsLoading(true);
    
    try {
      const requests = selectedCodes.map(code => {
        const benchmarks = getCountryBenchmarks(code);
        return {
          annualTuition: benchmarks.tuition,
          annualLivingCost: benchmarks.tuition === 500 ? 12000 : 18000, // Germany cost adjustment
          durationYears: benchmarks.duration,
          finalSalaryBenchmark: benchmarks.salary,
          currentSalary: profile.currentSalary || 20000,
          homeCurrency: profile.nationality === 'India' ? 'INR' : 'USD',
          studyCurrency: benchmarks.currency,
          taxRate: 0.25,
          loanAmount: profile.loanAmount || 30000, // Sync loan
          interestRate: profile.loanInterestRate || 10.5
        };
      });

      const results = await calculationService.getComparison(requests);
      
      const mappedResults = results.map((res, index) => ({
        ...res,
        countryCode: selectedCodes[index],
        benchmarks: getCountryBenchmarks(selectedCodes[index])
      }));
      setComparisonData(mappedResults);
    } catch (err) {
      console.error("Comparison failed:", err);
    } finally {
      setIsLoading(false);
    }
  }, [profile, selectedCodes]);

  useEffect(() => {
    runComparison();
  }, [runComparison]);

  const addCountry = (code) => {
    if (selectedCodes.length < 5 && !selectedCodes.includes(code)) {
      setSelectedCodes([...selectedCodes, code]);
    }
  };

  const removeCountry = (code) => {
    if (selectedCodes.length > 2) {
      setSelectedCodes(selectedCodes.filter(c => c !== code));
    }
  };

  const getCountryInfo = (code) => allCountries.find(c => c.code === code);

  // Helper for finding "Winners"
  const getBestMetrics = () => {
    if (!comparisonData.length) return {};
    return {
      maxRoi: Math.max(...comparisonData.map(r => r.roiScore || 0)),
      minPayback: Math.min(...comparisonData.map(r => r.breakEvenYear || 99)),
      minCost: Math.min(...comparisonData.map(r => r.totalInvestment || 999999))
    };
  };

  const bestMetrics = getBestMetrics();

  if (authError && !profile) {
    return (
      <div className="flex-center h-screen flex-column p-4 text-center">
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

  if (authLoading && !profile) return <LoadingSpinner fullPage message="Securely retrieving your global matrix..." />;

  const commonProps = {
    profile,
    user,
    selectedCodes,
    comparisonData,
    isLoading,
    allCountries,
    getCountryInfo,
    bestMetrics,
    addCountry,
    removeCountry,
    refreshProfile
  };

  if (isMobile) {
    return <CompareMobile {...commonProps} />;
  }

  return <CompareDesktop {...commonProps} />;
};

export default CountryCompare;
