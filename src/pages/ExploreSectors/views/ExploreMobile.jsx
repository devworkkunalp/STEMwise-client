import React from 'react';
import BottomNav from '../../../components/BottomNav/BottomNav';
import Badge from '../../../components/Badge/Badge';

const ExploreMobile = ({ 
  sectors, 
  selectedSector, 
  onSelect, 
  activeFilter, 
  setActiveFilter,
  onDeepDive
}) => {
  const filters = ['All Sectors', 'Highest ROI', 'Best Employment', 'Lowest Visa Risk'];

  return (
    <div className="sw-dashboard-mobile" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '18px 16px 80px' }}>
        
        <header className="research-header">
          <div className="rh-eyebrow">Phase 1: Entry Point</div>
          <h1 className="rh-title" style={{ fontSize: '22px' }}>Find your field.</h1>
          <p className="rh-desc" style={{ fontSize: '11px', lineHeight: '1.5' }}>
            Real data on salaries, H-1B odds, and loan default rates before you commit.
          </p>
        </header>

        <div className="tabs" style={{ overflowX: 'auto', whiteSpace: 'nowrap', pb: '4px' }}>
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
          {sectors.map(sector => (
            <div 
              key={sector.id} 
              className={`scard ${sector.color} ${selectedSector?.id === sector.id ? 'selected' : ''}`}
              onClick={() => onSelect(sector)}
              style={{ padding: '16px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span style={{ fontSize: '24px' }}>{sector.icon}</span>
                <div>
                  <div className="sc-nm" style={{ fontSize: '13px' }}>{sector.name}</div>
                  <div className="sc-sb" style={{ fontSize: '9px', marginBottom: 0 }}>{sector.subTitle}</div>
                </div>
                <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                  <div style={{ fontSize: '9px', color: 'var(--hint)', textTransform: 'uppercase' }}>ROI</div>
                  <div style={{ fontSize: '14px', fontWeight: '800', color: 'var(--teal)' }}>{sector.roiScore}</div>
                </div>
              </div>
              
              <div className="sc-kv" style={{ fontSize: '10px' }}>
                <span className="sc-k">Median Salary</span>
                <span className="sc-v" style={{ color: 'var(--teal)' }}>${sector.medianSalary?.toLocaleString()}</span>
              </div>
              <div className="sc-kv" style={{ fontSize: '10px' }}>
                <span className="sc-k">H-1B Success</span>
                <span className="sc-v">{sector.h1bSuccess}%</span>
              </div>

              <div className="sc-badges" style={{ paddingTop: '10px' }}>
                {sector.badges.map(b => (
                  <Badge 
                    key={b} 
                    type={b.includes('Risk') ? 'coral' : (b.includes('Demand') ? 'sky' : 'teal')}
                    variant="dim"
                  >
                    {b}
                  </Badge>
                ))}
              </div>

              {selectedSector?.id === sector.id && (
                <button 
                  className="btn btn-primary btn-sm btn-full" 
                  style={{ marginTop: '14px' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeepDive(sector);
                  }}
                >
                  Deep Dive Research →
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <BottomNav activeTab="explore" />
    </div>
  );
};

export default ExploreMobile;
