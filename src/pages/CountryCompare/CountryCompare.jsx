import React, { useState, useEffect, useCallback } from 'react';
import { 
  Globe, 
  Plus, 
  Download, 
  TrendingUp, 
  Zap, 
  ShieldAlert,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import countryService from '../../services/countryService';
import calculationService from '../../services/calculationService';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import BottomNav from '../../components/BottomNav/BottomNav';
import Button from '../../components/Button/Button';
import Badge from '../../components/Badge/Badge';
import ROIScoreRing from '../../components/ROIScoreRing/ROIScoreRing';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner';

import './CountryCompare.css';

const CountryCompare = () => {
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
        // Use the benchmarks for display columns if needed
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

  // Error Recovery UI
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

  if (!profile || authLoading) return <LoadingSpinner fullPage message="Securely retrieving your global matrix..." />;

  return (
    <div className="sw-app-root">
      <Navbar isAuthenticated={true} user={user} />
      
      <div className="sw-compare-page">
        <Sidebar activeTab="compare" onTabChange={(id) => setActiveTab(id)} profile={profile} />
        
        <main className="sw-compare-container">
          <header className="sw-compare-header sw-calc-fade-in">
            <div className="sw-header-stack">
              <Badge variant="primary">Country Comparison</Badge>
              <h1 className="text-gradient">Global ROI Matrix</h1>
              <p className="text-secondary">Comparing outcomes for <strong>{profile.degreeName}</strong> in <strong>{profile.specialization}</strong>.</p>
            </div>
            <div className="flex" style={{ gap: 'var(--space-3)' }}>
              <Button variant="outline" icon={Download} />
              <Button variant="primary" icon={Plus}>Add Country</Button>
            </div>
          </header>

          {/* Comparison Matrix */}
          <section className="sw-compare-matrix-wrapper glass-panel sw-calc-fade-in" style={{ animationDelay: '100ms' }}>
            <table className="sw-compare-matrix">
              <thead>
                <tr>
                  <th className="sw-metric-label">METRIC</th>
                  {selectedCodes.map(code => {
                    const country = getCountryInfo(code);
                    return (
                      <th key={code}>
                        <div className="sw-country-header">
                           <span className="sw-country-flag">{country?.flagEmoji || '🌐'}</span>
                           <span className="sw-country-name">{country?.name || code}</span>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {/* ROI Score Row */}
                <tr>
                  <td className="sw-metric-label">ROI Score</td>
                  {comparisonData.map((res, i) => (
                    <td key={i} className="sw-data-cell">
                      <div className="flex-center" style={{ gap: 'var(--space-2)' }}>
                        <span className={`sw-metric-value ${res.roiScore === bestMetrics.maxRoi ? 'text-teal fw-700' : 'text-amber'}`}>
                          {res.roiScore || 0}/100
                        </span>
                        {res.roiScore === bestMetrics.maxRoi && <Sparkles size={12} className="text-teal" />}
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Total Cost Row */}
                <tr>
                  <td className="sw-metric-label">Total Cost (INR)</td>
                  {comparisonData.map((res, i) => (
                    <td key={i} className={`sw-data-cell ${res.totalInvestment === bestMetrics.minCost ? 'best-value' : ''}`}>
                      <span className="sw-metric-value">₹{((res.totalInvestment * 84) / 100000).toFixed(1)}L</span>
                      <span className="sw-metric-sub">Incl. Tuition + Fees</span>
                    </td>
                  ))}
                </tr>

                {/* Starting Salary Row */}
                <tr>
                  <td className="sw-metric-label">Avg Salary (USD)</td>
                  {comparisonData.map((res, i) => (
                    <td key={i} className={`sw-data-cell ${res.benchmarks?.salary === Math.max(...comparisonData.map(r => r.benchmarks?.salary || 0)) ? 'best-value' : ''}`}>
                      <span className="sw-metric-value text-teal">${res.benchmarks?.salary?.toLocaleString() || '---'}</span>
                      <span className="sw-metric-sub">Country Benchmark</span>
                    </td>
                  ))}
                </tr>

                {/* Payback Period Row */}
                <tr>
                  <td className="sw-metric-label">Payback Period</td>
                  {comparisonData.map((res, i) => (
                    <td key={i} className="sw-data-cell">
                      <span className={`sw-metric-value ${res.breakEvenYear === bestMetrics.minPayback ? 'text-teal fw-700 underline' : ''}`}>
                        {res.breakEvenYear || 0} Years
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Visa Risk Row */}
                <tr>
                  <td className="sw-metric-label">Work Visa Risk</td>
                  {selectedCodes.map(code => {
                    const country = getCountryInfo(code);
                    const risk = country?.visaRisk || 'Medium';
                    return (
                      <td key={code} className={`sw-data-cell ${risk === 'High' ? 'high-risk' : ''}`}>
                        <Badge variant={risk === 'High' ? 'danger' : risk === 'Low' ? 'success' : 'warning'}>
                          {risk}
                        </Badge>
                      </td>
                    );
                  })}
                </tr>

                {/* PR Pathway Row */}
                <tr>
                  <td className="sw-metric-label">PR Pathway</td>
                  {selectedCodes.map(code => {
                    const country = getCountryInfo(code);
                    return (
                      <td key={code} className="sw-data-cell">
                        <span className="sw-metric-sub" style={{ fontSize: '11px', color: 'var(--color-off-white)' }}>
                          {country?.prPathway || 'Post-Grad Route'}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </section>

          {/* Insight Summary */}
          <footer className="sw-insight-banner glass-panel sw-calc-fade-in" style={{ animationDelay: '300ms' }}>
            <div className="sw-insight-grid">
               <div className="sw-section-icon"><Zap size={20} /></div>
               <div>
                 <h4 style={{ margin: '0 0 4px 0' }}>Strategic Summary for {user?.name || 'Arjun'}</h4>
                 <p className="text-secondary" style={{ fontSize: '13px', margin: 0, lineHeight: 1.5 }}>
                   <strong>Germany</strong> offers the fastest ROI with a 1.4-year payback, but carries higher language barrier risks. 
                   The <strong>USA</strong> remains the highest earnings potential ($118k avg), but is offset by the H-1B lottery risk. 
                   <strong>Canada</strong> provides the most balanced PR pathway for STEM profiles.
                 </p>
               </div>
               <Button variant="outline" icon={ArrowRight} style={{ marginLeft: 'auto' }}>See Best Scenario</Button>
            </div>
          </footer>
        </main>
      </div>

      <BottomNav activeTab={activeTab} onTabChange={(id) => setActiveTab(id)} />
    </div>
  );
};

export default CountryCompare;
