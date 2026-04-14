import React, { useState, useEffect } from 'react';
import { 
  TrendingDown, 
  DollarSign, 
  Clock, 
  Zap, 
  Pause,
  Ban
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import scenarioService from '../../services/scenarioService';
import calculationService from '../../services/calculationService';
import useMobile from '../../hooks/useMobile';

// Components
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

// Views
import WhatIfDesktop from './views/WhatIfDesktop';
import WhatIfMobile from './views/WhatIfMobile';

import './WhatIfEngine.css';

const scenarioCards = [
  { id: 'H1B_DENIED', title: 'H-1B Denied (3x)', description: 'All 3 STEM OPT lottery entries fail. Models O-1, EB-2 NIW, Canada redirect.', icon: Ban, color: 'coral' },
  { id: 'RECESSION', title: 'Salary 20% Below Benchmark', description: 'Job market saturation scenario. $118K → $94K starting salary.', icon: TrendingDown, color: 'amber' },
  { id: 'CURRENCY_CRASH', title: 'INR Depreciates 20%', description: 'Currency risk: ₹83/$ → ₹100/$. Impact on home-currency debt burden.', icon: DollarSign, color: 'sky' },
  { id: 'STUDY_DELAY', title: 'Program Takes 3 Years', description: 'Extra year of tuition + COL + delayed earnings. Cost overrun impact.', icon: Clock, color: 'purple' },
  { id: 'JOB_GAP', title: 'OPT Unemployment Gap', description: '60-day limit hit. 3-month job search after graduation before income starts.', icon: Pause, color: 'teal' },
  { id: 'LEVEL_3_PROMO', title: 'Promoted to Level III', description: 'Upside scenario: Senior role by Year 2, $145K salary, H-1B odds 61%.', icon: Zap, color: 'blue' }
];

const WhatIfEngine = () => {
  const isMobile = useMobile();
  const { user, profile, loading: authLoading, authError, refreshProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [baseROI, setBaseROI] = useState(null);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [modeledResult, setModeledResult] = useState(null);
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const data = await scenarioService.getHistory();
      setHistory(data || []);
    } catch (err) {
      console.error("Failed to fetch history", err);
    }
  };

  useEffect(() => {
    const fetchBase = async () => {
      if (!profile) return;
      setIsLoading(true);
      try {
        const latest = await calculationService.calculateROI({
          annualTuition: profile?.annualTuition || 45000,
          annualLivingCost: profile?.annualLivingCost || 18000,
          durationYears: profile?.programDuration || 2,
          finalSalaryBenchmark: profile?.targetSalary || 115000,
          currentSalary: profile?.currentSalary || 15000,
          homeCurrency: profile?.nationality === 'India' ? 'INR' : 'USD',
          studyCurrency: 'USD',
          taxRate: 0.25
        });
        setBaseROI(latest);
        await fetchHistory();
      } catch (err) {
        console.error("Failed to fetch base ROI", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBase();
  }, [profile]);

  const selectScenario = async (s) => {
    if (!profile) {
      setSelectedScenario(null);
      return;
    }
    if (!s) {
      setSelectedScenario(null);
      setModeledResult(null);
      return;
    }
    setIsLoading(true);
    setSelectedScenario(s);
    try {
      const result = await scenarioService.modelScenario(profile.id, s.id);
      setModeledResult(result);
      
      if (!isMobile) {
        setTimeout(() => {
            const detail = document.getElementById('scenario-detail-view');
            if (detail) detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } catch (err) {
      console.error("Modeling failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  const saveScenarioResult = async () => {
    if (!modeledResult) return;
    try {
      await scenarioService.saveScenario(modeledResult);
      alert("Scenario saved to your profile history!");
      await fetchHistory();
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  if (authLoading && !profile) return <LoadingSpinner fullPage message="Securely retrieving your risk scenarios..." />;

  const commonProps = {
    profile,
    user,
    baseROI,
    selectedScenario,
    modeledResult,
    history,
    scenarioCards,
    selectScenario,
    saveScenarioResult,
    isLoading
  };

  if (isMobile) {
    return <WhatIfMobile {...commonProps} />;
  }

  return <WhatIfDesktop {...commonProps} />;
};

export default WhatIfEngine;
