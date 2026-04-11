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
    <div className="shell">
      <Sidebar activeTab="compare" onTabChange={(id) => setActiveTab(id)} profile={profile} userName={profile?.displayName || user?.email?.split('@')[0] || 'Student'} />
      
      <div className="main">
        <div id="pg-compare" className="page active" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          
          <div className="topbar">
            <div>
              <div className="tb-breadcrumb">COUNTRY COMPARISON</div>
              <div className="tb-title">Global ROI Matrix</div>
            </div>
            <div className="tb-right">
              <button className="btn btn-outline">
                <Download size={14} style={{ marginRight: '6px' }} /> Export
              </button>
              <button className="btn btn-primary" onClick={() => { if(!selectedCodes.includes('AU')) addCountry('AU'); else alert('Max countries reached or AU already added'); }}>
                <Plus size={14} style={{ marginRight: '6px' }} /> Add Country
              </button>
            </div>
          </div>

          <div className="pbody">
            
            <div className="section-title" style={{ fontSize: '20px', marginBottom: '20px' }}>
              Comparing outcomes for <strong>{profile?.degreeName || 'MS'}</strong> in <strong>{profile?.specialization || 'STEM'}</strong>.
            </div>

            {/* Comparison Matrix */}
            <div className="card" style={{ padding: 0, overflowX: 'auto', marginBottom: '24px' }}>
              <table className="ctable">
                <thead>
                  <tr>
                    <th>METRIC</th>
                    {selectedCodes.map(code => {
                      const country = getCountryInfo(code);
                      return (
                        <th key={code} className={code === 'US' ? 'hl' : ''}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'center' }}>
                             <span style={{ fontSize: '18px' }}>{country?.flagEmoji || '🌐'}</span>
                             <span>{country?.name || code}</span>
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {/* ROI Score Row */}
                  <tr>
                    <td className="row-label">ROI Score</td>
                    {comparisonData.map((res, i) => {
                      const code = selectedCodes[i];
                      return (
                        <td key={i} className={code === 'US' ? 'col-hl hl' : ''} style={{ textAlign: 'center' }}>
                          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px' }}>
                            <span style={{ color: res.roiScore === bestMetrics.maxRoi ? 'var(--teal)' : 'var(--white)', fontWeight: res.roiScore === bestMetrics.maxRoi ? '700' : 'normal' }}>
                              {res.roiScore || 0}/100
                            </span>
                            {res.roiScore === bestMetrics.maxRoi && <Sparkles size={12} className="text-teal" />}
                          </div>
                        </td>
                      );
                    })}
                  </tr>

                  {/* Total Cost Row */}
                  <tr>
                    <td className="row-label">Total Cost (INR)</td>
                    {comparisonData.map((res, i) => {
                      const code = selectedCodes[i];
                      return (
                        <td key={i} className={code === 'US' ? 'col-hl hl' : ''} style={{ textAlign: 'center' }}>
                          <span style={{ display: 'block', color: 'var(--white)' }}>₹{((res.totalInvestment * 84) / 100000).toFixed(1)}L</span>
                          <span style={{ fontSize: '10px', color: 'var(--hint)' }}>Incl. Tuition + Fees</span>
                        </td>
                      );
                    })}
                  </tr>

                  {/* Starting Salary Row */}
                  <tr>
                    <td className="row-label">Avg Salary (USD)</td>
                    {comparisonData.map((res, i) => {
                      const code = selectedCodes[i];
                      return (
                        <td key={i} className={code === 'US' ? 'col-hl hl' : ''} style={{ textAlign: 'center' }}>
                          <span style={{ display: 'block', color: 'var(--teal)', fontWeight: '600' }}>${res.benchmarks?.salary?.toLocaleString() || '---'}</span>
                          <span style={{ fontSize: '10px', color: 'var(--hint)' }}>Country Benchmark</span>
                        </td>
                      );
                    })}
                  </tr>

                  {/* Payback Period Row */}
                  <tr>
                    <td className="row-label">Payback Period</td>
                    {comparisonData.map((res, i) => {
                      const code = selectedCodes[i];
                      return (
                        <td key={i} className={code === 'US' ? 'col-hl hl' : ''} style={{ textAlign: 'center' }}>
                          <span style={{ color: res.breakEvenYear === bestMetrics.minPayback ? 'var(--teal)' : 'var(--white)' }}>
                            {res.breakEvenYear || 0} Years
                          </span>
                        </td>
                      );
                    })}
                  </tr>

                  {/* Visa Risk Row */}
                  <tr>
                    <td className="row-label">Work Visa Risk</td>
                    {selectedCodes.map(code => {
                      const country = getCountryInfo(code);
                      const risk = country?.visaRisk || 'Medium';
                      return (
                        <td key={code} className={code === 'US' ? 'col-hl hl' : ''} style={{ textAlign: 'center' }}>
                          <div className={`badge ${risk === 'High' ? 'b-coral' : risk === 'Low' ? 'b-teal' : 'b-amber'}`}>
                            {risk}
                          </div>
                        </td>
                      );
                    })}
                  </tr>

                  {/* PR Pathway Row */}
                  <tr>
                    <td className="row-label">PR Pathway</td>
                    {selectedCodes.map(code => {
                      const country = getCountryInfo(code);
                      return (
                        <td key={code} className={code === 'US' ? 'col-hl hl' : ''} style={{ textAlign: 'center' }}>
                          <span style={{ fontSize: '11px', color: 'var(--muted)' }}>
                            {country?.prPathway || 'Post-Grad Route'}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Insight Summary */}
            <div className="card card-teal">
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                 <div style={{ background: 'var(--teal)', color: 'var(--navy)', width: '30px', height: '30px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Zap size={16} />
                 </div>
                 <div style={{ flex: 1 }}>
                   <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--white)', marginBottom: '6px' }}>Strategic Summary for {user?.name || profile?.displayName || 'Arjun'}</div>
                   <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                     <strong>Germany</strong> offers the fastest ROI with a 1.4-year payback, but carries higher language barrier risks. 
                     The <strong>USA</strong> remains the highest earnings potential ($118k avg), but is offset by the H-1B lottery risk. 
                     <strong>Canada</strong> provides the most balanced PR pathway for STEM profiles.
                   </div>
                 </div>
                 <button className="btn btn-outline" style={{ flexShrink: 0 }}>See Best Scenario <ArrowRight size={14} style={{ marginLeft: '4px' }}/></button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryCompare;
