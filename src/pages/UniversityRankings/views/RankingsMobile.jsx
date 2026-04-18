import React from 'react';
import BottomNav from '../../../components/BottomNav/BottomNav';

const RankingsMobile = ({ 
  unis, 
  activeFilter, 
  setActiveFilter, 
  searchTerm,
  setSearchTerm,
  onSelect, 
  sector 
}) => {
  const filters = ['All Universities', 'Top ROI', 'Best Value', 'High Employment'];

  return (
    <div className="sw-dashboard-mobile" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '18px 16px 80px' }}>
        
        <header className="research-header">
          <div className="rh-eyebrow">Phase 3: ROI Rankings</div>
          <h1 className="rh-title" style={{ fontSize: '20px' }}>Top Universities</h1>
          <p className="rh-desc" style={{ fontSize: '11px' }}>
            Institutions ranked by real outcome safety for {sector.name}.
          </p>
        </header>

        <div className="search-wrap" style={{ position: 'relative', width: '100%', marginBottom: '16px' }}>
          <input 
            type="text" 
            placeholder="Search school name or city..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              color: 'white',
              fontSize: '14px',
              outline: 'none'
            }}
          />
          {searchTerm && (
            <div 
              onClick={() => setSearchTerm('')}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                fontSize: '16px',
                color: 'var(--hint)'
              }}
            >
              ✕
            </div>
          )}
        </div>

        <div className="tabs" style={{ overflowX: 'auto', whiteSpace: 'nowrap', marginBottom: '16px' }}>
          {filters.map(f => (
            <div 
              key={f} 
              className={`tab ${activeFilter === f ? 'active' : ''}`}
              onClick={() => setActiveFilter(f)}
              style={{ display: 'inline-block', flexShrink: 0 }}
            >
              {f}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {unis.map((uni, idx) => (
            <div 
              key={`${uni.name}-${idx}`} 
              className="card" 
              style={{ padding: '16px', position: 'relative' }}
              onClick={() => onSelect(uni)}
            >
              <div style={{ position: 'absolute', top: '16px', right: '16px', textAlign: 'right' }}>
                <div style={{ fontSize: '9px', color: 'var(--hint)', textTransform: 'uppercase' }}>ROI Score</div>
                <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--teal)' }}>
                  {uni.roiScore || uni.score || '—'}
                </div>
              </div>

              <div style={{ fontSize: '10px', color: 'var(--hint)', fontWeight: '700', marginBottom: '4px' }}>
                RANK #{uni.rank || (idx + 1)}
              </div>
              <div className="sc-nm" style={{ fontSize: '14px', width: '80%' }}>{uni.name}</div>
              <div style={{ fontSize: '10px', color: 'var(--muted)', marginBottom: '12px' }}>
                {uni.city && uni.state ? `${uni.city}, ${uni.state}` : (uni.location || 'Unknown')}
              </div>

              <div className="m-stats-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                <div className="m-stat-box" style={{ padding: '8px' }}>
                  <div className="m-stat-lbl" style={{ fontSize: '8px' }}>Tuition (2yr)</div>
                  <div className="m-stat-val" style={{ fontSize: '12px' }}>
                    {uni.tuition ? `$${(uni.tuition/1000).toFixed(0)}k` : '—'}
                  </div>
                </div>
                <div className="m-stat-box" style={{ padding: '8px' }}>
                  <div className="m-stat-lbl" style={{ fontSize: '8px' }}>Median Salary</div>
                  <div className="m-stat-val" style={{ fontSize: '12px' }}>
                    {uni.medianEarnings ? `$${(uni.medianEarnings/1000).toFixed(0)}k` : (uni.salary ? `$${(uni.salary/1000).toFixed(0)}k` : '—')}
                  </div>
                </div>
                <div className="m-stat-box" style={{ padding: '8px' }}>
                  <div className="m-stat-lbl" style={{ fontSize: '8px' }}>H-1B Success</div>
                  <div className="m-stat-val" style={{ fontSize: '12px' }}>{uni.h1bRate ?? '—'}%</div>
                </div>
                <div className="m-stat-box" style={{ padding: '8px' }}>
                  <div className="m-stat-lbl" style={{ fontSize: '8px' }}>Payback</div>
                  <div className="m-stat-val" style={{ fontSize: '12px' }}>{uni.payback ?? '—'}yr</div>
                </div>
              </div>

              {uni.warning && (
                <div style={{ marginTop: '10px', fontSize: '9px', color: 'var(--coral)', fontWeight: '600' }}>
                  ⚠️ {uni.warning}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
      
      <BottomNav activeTab="explore" />
    </div>
  );
};

export default RankingsMobile;
