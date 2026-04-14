import React from 'react';
import { 
  Plus, 
  Download, 
  Zap, 
  ShieldAlert,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import Sidebar from '../../../components/Sidebar/Sidebar';
import Button from '../../../components/Button/Button';

const CompareDesktop = ({ 
  profile, 
  user, 
  selectedCodes, 
  comparisonData, 
  isLoading, 
  allCountries, 
  getCountryInfo, 
  bestMetrics, 
  addCountry, 
  refreshProfile 
}) => {
  return (
    <div className="shell">
      <Sidebar 
        activeTab="compare" 
        profile={profile} 
        userName={profile?.displayName || user?.email?.split('@')[0] || 'Student'} 
      />
      
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
              <button className="btn btn-primary" onClick={() => addCountry('AU')}>
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
                   <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--white)', marginBottom: '6px' }}>Strategic Summary</div>
                   <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                     <strong>Germany</strong> offers the fastest ROI with a 1.4-year payback, but carries higher language barrier risks. 
                     The <strong>USA</strong> remains the highest earnings potential ($118k avg), but is offset by the H-1B lottery risk. 
                     <strong>Canada</strong> provides the most balanced PR pathway for STEM profiles.
                   </div>
                 </div>
                 <button className="btn btn-outline" style={{ flexShrink: 0 }}>See Best Scenario</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareDesktop;
