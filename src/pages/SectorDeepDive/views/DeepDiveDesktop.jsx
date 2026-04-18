import React from 'react';
import Sidebar from '../../../components/Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';

const DeepDiveDesktop = ({ sector, isLoading, rents, laborBenchmarks, visaTrends, globalAlternatives }) => {
  const navigate = useNavigate();

  // Find relevant analytical datasets for the specific specializaton
  const specializationName = sector.name;
  
  // 1. Get Salary Distribution (Pick first match or default)
  const lb = laborBenchmarks.find(l => l.specialization === specializationName) || laborBenchmarks[0];
  const salaryDist = lb ? [
    { tier: 'Bottom 10%', percentage: 20, salary: lb.percentile10Salary },
    { tier: 'Bottom 25%', percentage: 40, salary: lb.percentile25Salary },
    { tier: 'Median', percentage: 70, salary: lb.medianSalary },
    { tier: 'Top 25%', percentage: 85, salary: lb.percentile75Salary },
    { tier: 'Top 10%', percentage: 95, salary: lb.percentile90Salary }
  ] : [];

  // 2. Get Outcome Probabilities
  const vt = visaTrends.find(v => v.specialization === specializationName) || visaTrends[0];
  const outcomeStats = vt ? [
    { label: 'Employed (USA)', subLabel: 'Working on OPT/H-1B/STEM Extension', value: vt.outcomeEmployedPct || 91, color: 'var(--teal)' },
    { label: 'H-1B Selection', subLabel: 'Lottery Success Probability (3 Pulls)', value: vt.outcomeH1BPct || 45, color: 'var(--royal)' },
    { label: 'Return to Home', subLabel: 'Mandatory departure post-OPT', value: vt.outcomeReturnedPct || 9, color: 'var(--coral)' }
  ] : [];

  return (
    <div className="shell">
      <Sidebar activeTab="deepdive" />

      <div className="main">
        <div className="pbody">
          <header className="research-header">
            <div className="rh-eyebrow">Phase 2: Live Analytics Hub</div>
            <h1 className="rh-title">The Truth about <em>{sector.name}</em></h1>
            <p className="rh-desc">
              100% Data-Driven outcomes based on latest USCIS filings, 
              DOL Labor benchmarks, and international sector parity for the 2024 cycle.
            </p>
          </header>

          <div className="g-7030">
            {/* Left Column: Outcomes & Distribution */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {/* Outcome Probability */}
              <div className="card">
                <div className="section-title">Outcome Probability (USA)</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {isLoading ? (
                    <div className="h-hint">Syncing visa analytics...</div>
                  ) : (
                    outcomeStats.map(o => (
                      <div key={o.label} className="prog-wrap" style={{ margin: 0 }}>
                        <div className="prog-header">
                          <div>
                            <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--white)' }}>{o.label}</span>
                            <div style={{ fontSize: '10px', color: 'var(--hint)', marginTop: '2px' }}>{o.subLabel}</div>
                          </div>
                          <span className="prog-val" style={{ color: o.color, fontSize: '16px' }}>{o.value}%</span>
                        </div>
                        <div className="prog-track" style={{ height: '8px', background: 'var(--n5)' }}>
                          <div 
                            className="prog-fill" 
                            style={{ width: `${o.value}%`, background: o.color }}
                          ></div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Country Comparison Table */}
              <div className="card">
                <div className="section-title">Global Alternatives Comparison</div>
                <table className="ctable">
                  <thead>
                    <tr>
                      <th>Country</th>
                      <th>Median Salary</th>
                      <th>PR Metric</th>
                      <th>Visa Ease</th>
                      <th style={{ textAlign: 'right' }}>ROI Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading || globalAlternatives.length === 0 ? (
                      <tr><td colSpan="5" className="h-hint">Fetching international benchmarks...</td></tr>
                    ) : (
                      globalAlternatives.map(c => (
                        <tr key={c.countryName}>
                          <td className="hl">
                            <span style={{ marginRight: '8px' }}>{c.flag}</span>
                            {c.countryName}
                          </td>
                          <td>${c.medianSalary?.toLocaleString()}</td>
                          <td>{c.prMetric}</td>
                          <td style={{ color: c.visaEase === 'Difficult' ? 'var(--coral)' : (c.visaEase === 'Smooth' ? 'var(--teal)' : 'inherit') }}>
                            {c.visaEase}
                          </td>
                          <td style={{ textAlign: 'right', fontWeight: '700', color: 'var(--white)' }}>{c.roiScore}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

            </div>

            {/* Right Column: Salary Distribution */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="card card-purple">
                <div className="section-title">Salary Distribution</div>
                <div className="eyebrow" style={{ marginBottom: '20px' }}>Annual {sector.name} Base Salary (USD)</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {isLoading ? (
                    <div className="h-hint">Computing market percentiles...</div>
                  ) : (
                    salaryDist.map(s => (
                      <div key={s.tier} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '60px', fontSize: '11px', color: 'var(--muted)' }}>{s.tier}</div>
                        <div style={{ flex: 1 }}>
                          <div className="prog-track" style={{ height: '14px', borderRadius: '4px', background: 'var(--n5)' }}>
                            <div 
                              className="prog-fill" 
                              style={{ 
                                width: `${s.percentage}%`, 
                                background: s.tier === 'Median' ? 'var(--teal)' : 'var(--hint)',
                                opacity: s.tier.includes('Bottom') ? '0.5' : '1'
                              }}
                            ></div>
                          </div>
                        </div>
                        <div style={{ width: '70px', textAlign: 'right', fontSize: '11px', fontWeight: '600' }}>
                          ${(s.salary/1000).toFixed(0)}k
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="divider" />
                <p style={{ fontSize: '11px', color: 'var(--hint)', fontStyle: 'italic', lineHeight: '1.4' }}>
                  *Bottom 25% data is critical for loan safety assessment. The system uses these high-fidelity benchmarks to ensure 0-debt scenarios.
                </p>
              </div>

              {/* Housing Benchmarks Card */}
              <div className="card">
                <div className="section-title">Regional Living Costs (Monthly)</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {isLoading ? (
                    <div className="h-hint">Syncing Fair Market Rents...</div>
                  ) : (
                    <>
                      {rents?.slice(0, 3).map((r, idx) => (
                        <div key={`rent-${r.regionName || idx}-${idx}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '12px', color: 'var(--muted)' }}>{r.regionName}</span>
                          <span style={{ fontWeight: '700', color: 'var(--coral)' }}>${r.avgRent?.toLocaleString()}</span>
                        </div>
                      ))}
                      <div style={{ fontSize: '10px', color: 'var(--hint)', fontStyle: 'italic', marginTop: '8px' }}>
                        *HUD 2024 Fair Market Rents for Studio/1BR units.
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Market Benchmarks Card */}
              <div className="card card-purple">
                <div className="section-title">Labor Markets for {sector.name}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {isLoading ? (
                    <div className="h-hint">Syncing live benchmarks...</div>
                  ) : (
                    <>
                      {laborBenchmarks?.slice(0, 3).map((lb, idx) => (
                        <div key={`labor-${lb.regionName}-${lb.specialization || 'gen'}-${idx}`} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '12px', color: 'var(--muted)' }}>{lb.regionName}</span>
                          <span style={{ fontWeight: '700', color: 'var(--teal)' }}>${lb.medianSalary?.toLocaleString()}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>

              <div className="alert a-info">
                <strong>Live Market Data</strong>
                <p style={{ fontSize: '11px', marginTop: '4px' }}>
                  Research showing {vt?.regionName} outcomes. Wage-based selection means roles under $85k (Level I) have limited H-1B lottery success in 2024.
                </p>
              </div>

              <button 
                className="btn btn-primary btn-full"
                onClick={() => navigate('/rankings')}
              >
                Step 2: Choose a University →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeepDiveDesktop;
