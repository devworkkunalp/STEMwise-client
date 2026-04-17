import React from 'react';
import BottomNav from '../../../components/BottomNav/BottomNav';
import Badge from '../../../components/Badge/Badge';

const CourseMobile = ({ 
  programs, 
  selectedCourse, 
  onSelect, 
  university,
  onContinue 
}) => {
  return (
    <div className="sw-dashboard-mobile" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '18px 16px 80px' }}>
        
        <header className="research-header">
          <div className="rh-eyebrow">Academic Programs</div>
          <h1 className="rh-title" style={{ fontSize: '20px' }}>Choose a Course</h1>
          <p className="rh-desc" style={{ fontSize: '11px' }}>
            Program-specific ROI outcomes at {university.name}.
          </p>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {programs.map(course => (
            <div 
              key={course.id} 
              className={`scard ${selectedCourse?.id === course.id ? 'selected' : ''}`}
              style={course.warning ? { borderLeft: '4px solid var(--coral)' } : {}}
              onClick={() => onSelect(course)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div style={{ flex: 1 }}>
                  <div className="sc-nm" style={{ fontSize: '13px' }}>{course.name}</div>
                  <div style={{ fontSize: '9px', color: 'var(--hint)' }}>{course.duration} duration</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '8px', color: 'var(--hint)', textTransform: 'uppercase' }}>Score</div>
                  <div style={{ fontSize: '16px', fontWeight: '800', color: course.score > 75 ? 'var(--teal)' : 'var(--amber)' }}>{course.score}</div>
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '6px', borderRadius: '4px' }}>
                   <div style={{ fontSize: '8px', color: 'var(--muted)' }}>Salary</div>
                   <div style={{ fontSize: '11px', fontWeight: '600' }}>${(course.salary/1000).toFixed(0)}k</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', padding: '6px', borderRadius: '4px' }}>
                   <div style={{ fontSize: '8px', color: 'var(--muted)' }}>Default</div>
                   <div style={{ fontSize: '11px', fontWeight: '600', color: course.defaultRate > 5 ? 'var(--coral)' : 'inherit' }}>{course.defaultRate}%</div>
                </div>
              </div>

              <div className="sc-badges">
                {course.badges?.slice(0, 2).map(b => (
                  <Badge 
                    key={b} 
                    type={b.includes('Default') && course.defaultRate > 5 ? 'coral' : 'dim'}
                    variant="dim"
                  >
                    {b}
                  </Badge>
                ))}
              </div>

              {course.warning && (
                <div style={{ marginTop: '10px', fontSize: '9px', color: 'var(--coral)', fontWeight: '600' }}>
                  ⚠️ {course.warning} Pattern
                </div>
              )}
            </div>
          ))}
        </div>

        <button 
          className="btn btn-primary btn-full"
          style={{ marginTop: '24px' }}
          disabled={!selectedCourse}
          onClick={onContinue}
        >
          Step 4: Reality Check
        </button>

      </div>
      
      <BottomNav activeTab="explore" />
    </div>
  );
};

export default CourseMobile;
