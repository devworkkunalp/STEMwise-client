import React from 'react';
import Sidebar from '../../../components/Sidebar/Sidebar';

const RankingsDesktop = ({ 
  unis, 
  activeFilter, 
  setActiveFilter, 
  onSelect, 
  sector 
}) => {
  const filters = ['All Universities', 'Top ROI', 'Best Value', 'High Employment'];

  return (
    <div className="shell">
      <Sidebar activeTab="rankings" />

      <div className="main">
        <div className="pbody">
          <header className="research-header">
            <div className="rh-eyebrow">Phase 3: ROI Rankings</div>
            <h1 className="rh-title">Top Schools for <em>{sector.name}</em></h1>
            <p className="rh-desc">
              Ranked by post-graduation salary and loan repayment safety. 
              Schools are evaluated on real OPT outcome data, not just brand name.
            </p>
          </header>

          <div className="tabs">
            {filters.map(f => (
              <div 
                key={f} 
                className={`tab ${activeFilter === f ? 'active' : ''}`}
                onClick={() => setActiveFilter(f)}
              >
                {f}
              </div>
            ))}
          </div>

          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <table className="ctable">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>University</th>
                  <th>Tuition (2yr)</th>
                  <th>Median Salary</th>
                  <th>H-1B %</th>
                  <th>Employment</th>
                  <th>Default</th>
                  <th>Payback</th>
                  <th style={{ textAlign: 'right' }}>ROI Score</th>
                </tr>
              </thead>
              <tbody>
                {unis.map((uni, idx) => (
                  <tr 
                    key={`${uni.name}-${idx}`} 
                    style={{ cursor: 'pointer' }}
                    onClick={() => onSelect(uni)}
                  >
                    <td style={{ fontWeight: '700', color: 'var(--hint)' }}>#{uni.rank || (idx + 1)}</td>
                    <td>
                      <div className="sc-nm" style={{ fontSize: '13px', marginBottom: '2px' }}>{uni.name}</div>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <span style={{ fontSize: '9px', color: 'var(--hint)' }}>
                          {uni.city && uni.state ? `${uni.city}, ${uni.state}` : (uni.location || 'Unknown')}
                        </span>
                        {uni.bestFor && <span className="badge b-teal" style={{ fontSize: '8px', padding: '1px 5px' }}>{uni.bestFor}</span>}
                        {uni.warning && <span className="badge b-coral" style={{ fontSize: '8px', padding: '1px 5px' }}>{uni.warning}</span>}
                      </div>
                    </td>
                    <td style={{ color: (uni.tuition || 0) < 35000 && uni.tuition ? 'var(--teal)' : 'inherit' }}>
                      {uni.tuition ? `$${uni.tuition.toLocaleString()}` : '—'}
                    </td>
                    <td style={{ fontWeight: '600', color: 'var(--white)' }}>
                      {uni.medianEarnings ? `$${uni.medianEarnings.toLocaleString()}` : (uni.salary ? `$${uni.salary.toLocaleString()}` : '—')}
                    </td>
                    <td>{uni.h1bRate ?? '—'}%</td>
                    <td>{uni.employmentRate ? `${(uni.employmentRate * 100).toFixed(0)}%` : (uni.employment ? `${uni.employment}%` : '—')}</td>
                    <td style={{ color: (uni.defaultRate || 0) > 5 ? 'var(--coral)' : 'inherit' }}>
                      {uni.defaultRate ?? '—'}%
                    </td>
                    <td>{uni.payback ?? '—'}yr</td>
                    <td style={{ textAlign: 'right', fontWeight: '800', fontSize: '15px', color: 'var(--teal)' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <span>{uni.roiScore || uni.score || '—'}</span>
                        <div style={{ fontSize: '10px', color: 'var(--teal)', fontWeight: '400', marginTop: '4px' }}>View Programs →</div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Warning Banner */}
          <div className="alert a-warn" style={{ marginTop: '20px' }}>
            <strong>The "Ivy League" Trap</strong>
            Certain private universities (e.g. NYU, Columbia) have higher brand prestige but significantly higher loan default rates (>7%) and tuition-to-salary ratios compared to top public schools like Georgia Tech or UIUC.
          </div>

        </div>
      </div>
    </div>
  );
};

export default RankingsDesktop;
