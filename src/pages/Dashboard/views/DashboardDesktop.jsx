import React from 'react';
import { 
  Plus, 
  ChevronRight, 
  Info, 
  TrendingUp, 
  AlertTriangle, 
  Clock, 
  PieChart, 
  ShieldCheck, 
  DollarSign, 
  Zap,
  ShieldAlert
} from 'lucide-react';
import Sidebar from '../../../components/Sidebar/Sidebar';
import StatCard from '../../../components/StatCard/StatCard';
import ROIScoreRing from '../../../components/ROIScoreRing/ROIScoreRing';
import RepaymentChart from '../../../components/Charts/RepaymentChart';
import Button from '../../../components/Button/Button';

const DashboardDesktop = ({ 
  profile, 
  user, 
  roiResult, 
  loanValue, 
  setLoanValue, 
  handleRecalculate, 
  isLoading, 
  lastUpdated, 
  history,
  activeTab,
  setActiveTab,
  getGreeting,
  displayName
}) => {
  return (
    <div className="shell">
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        userName={displayName}
        profile={profile}
      />

      <div className="main">
        <div id="pg-dashboard" className="page active" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          
          <div className="topbar">
            <div>
              <div className="tb-breadcrumb">DASHBOARD</div>
              <div className="tb-title">Your STEM Analytics</div>
            </div>
            <div className="tb-right">
              <div style={{ fontSize: '11px', color: 'var(--hint)', fontFamily: 'var(--fm)' }}>
                Data live as of {lastUpdated}
              </div>
              <button className="btn btn-primary" onClick={handleRecalculate}>
                {isLoading ? 'Syncing...' : 'Live ROI Sync'}
              </button>
            </div>
          </div>

          <div className="pbody">
            
            {/* Greeting */}
            <div className="section-title" style={{ fontSize: '20px', marginBottom: '24px' }}>
              {getGreeting()}, {displayName} 👋
            </div>

            {/* Policy Alert Banner */}
            <div className="alert a-warn">
              <span>⚠️</span>
              <div>
                <strong>Policy Update: H-1B Wage-Based Selection</strong>
                The DHS has proposed a resume of wage-based prioritization for the March 2026 lottery. Low-wage positions may see significantly reduced selection rates. <a href="#" style={{ textDecoration: 'underline' }}>Analyze your risk →</a>
              </div>
            </div>

            {/* Main Stats Grid */}
            <div className="g-3070" style={{ marginBottom: '16px' }}>
              
              {/* ROI Score Card */}
              <div className="card card-teal" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '30px 20px' }}>
                <div className="eyebrow" style={{ color: 'var(--teal)' }}>10-Yr ROI Score</div>
                <div style={{ fontSize: '56px', fontWeight: '800', fontFamily: 'var(--fd)', color: 'var(--white)', lineHeight: '1', margin: '14px 0' }}>
                  {roiResult?.roiPercentage || 72}
                </div>
                <span className="badge b-teal">Top 15% for {profile?.nationality || 'India'}</span>
              </div>

              {/* StatCards Cluster */}
              <div className="g2">
                <div className="card">
                  <div className="flex-between">
                    <span className="eyebrow">Net Lifetime Value</span>
                    <TrendingUp size={14} className="text-teal" />
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: '700', fontFamily: 'var(--fd)', marginTop: '8px' }}>
                    {roiResult?.netEarnings10Yr ? `$${roiResult.netEarnings10Yr.toLocaleString()}` : "$--"}
                  </div>
                  <div className="label" style={{ marginTop: '4px' }}>10-Year ROI Potential</div>
                </div>

                <div className="card">
                  <div className="flex-between">
                    <span className="eyebrow">Projected Repayment</span>
                    <Clock size={14} className="text-amber" />
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: '700', fontFamily: 'var(--fd)', marginTop: '8px' }}>
                    {roiResult?.breakEvenYear ? `${roiResult.breakEvenYear} Yrs` : "2.4 Yrs"}
                  </div>
                  <div className="label" style={{ marginTop: '4px' }}>Debt-Free Milestone</div>
                </div>

                <div className="card">
                  <div className="flex-between">
                    <span className="eyebrow">MS Quota</span>
                    <PieChart size={14} className="text-coral" />
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: '700', fontFamily: 'var(--fd)', marginTop: '8px' }}>
                    28.4%
                  </div>
                  <div className="label" style={{ marginTop: '4px' }}>H-1B Chance ({profile?.nationality || 'Intl'})</div>
                </div>

                <div className="card">
                  <div className="flex-between">
                    <span className="eyebrow">Home Currency FX</span>
                    <DollarSign size={14} className="text-sky" />
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: '700', fontFamily: 'var(--fd)', marginTop: '8px' }}>
                    {roiResult?.totalInvestment ? `$${roiResult.totalInvestment.toLocaleString()}` : "$--"}
                  </div>
                  <div className="label" style={{ marginTop: '4px' }}>Total Cost Estimate</div>
                </div>
              </div>
            </div>

            <div className="g2">
              {/* Repayment Chart */}
              <div className="card">
                <div className="section-title">Repayment Timeline</div>
                <div className="label" style={{ marginBottom: '16px' }}>Cumulative net worth progression based on median STEM salaries.</div>
                <div style={{ height: '260px' }}>
                  <RepaymentChart />
                </div>
              </div>

              {/* Sandbox Model */}
              <div className="card">
                <div className="section-title">ROI Sandbox Modeling</div>
                <div className="label" style={{ marginBottom: '16px' }}>Model adjustments to your loan to see immediate ROI impact.</div>
                
                <div className="input-group">
                  <label className="input-label">Adjust Loan Amount</label>
                  <div className="slider-val">${loanValue.toLocaleString()}</div>
                  <input 
                    type="range" 
                    min="10000" 
                    max="150000" 
                    step="5000"
                    value={loanValue}
                    onChange={(e) => setLoanValue(parseInt(e.target.value))}
                  />
                  <div className="slider-labels"><span>$10K</span><span>$150K</span></div>
                </div>

                <button className="btn btn-primary btn-full" onClick={handleRecalculate} style={{ marginTop: '16px' }}>
                  {isLoading ? 'Analyzing Impact...' : 'Run Scenario'}
                </button>
              </div>
            </div>

            {/* Recent Scenarios History */}
            <div className="section" style={{ marginTop: '32px' }}>
               <div className="section-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock size={16} className="text-amber" /> Recent Performance Models
               </div>
               <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                  <table className="ctable">
                     <thead>
                        <tr>
                           <th>Scenario</th>
                           <th>Impact Score</th>
                           <th>Adjusted ROI</th>
                           <th>Date Generated</th>
                        </tr>
                     </thead>
                     <tbody>
                        {history.length === 0 ? (
                           <tr>
                              <td colSpan="4" style={{ padding: '30px', textAlign: 'center', color: 'var(--hint)' }}>
                                 No history found. Try saving a simulation in the What-If Engine.
                              </td>
                           </tr>
                        ) : (
                           history.map((h) => {
                              const type = h.scenarioType ?? h.ScenarioType;
                              const impact = h.impactScore ?? h.ImpactScore ?? 0;
                              const roi = h.adjustedRoi ?? h.AdjustedRoi ?? 0;
                              const rawDate = h.createdAt ?? h.CreatedAt ?? h.date ?? h.Date;
                              const id = h.id ?? h.Id;

                              return (
                                 <tr key={id}>
                                    <td className="hl">{type?.replace('_', ' ') || 'Event Simulation'}</td>
                                    <td>
                                       <span className={`badge ${impact < 0 ? 'b-coral' : 'b-teal'}`}>
                                          {impact > 0 ? '+' : ''}{Math.round(impact)} PTS
                                       </span>
                                    </td>
                                    <td style={{ fontFamily: 'var(--fm)', fontWeight: '600' }}>{Math.round(roi)}</td>
                                    <td style={{ fontSize: '11px' }}>{rawDate ? new Date(rawDate).toLocaleDateString() : 'N/A'}</td>
                                 </tr>
                              );
                           })
                        )}
                     </tbody>
                  </table>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardDesktop;
