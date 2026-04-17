import React from 'react';
import Sidebar from '../../../components/Sidebar/Sidebar';
import Badge from '../../../components/Badge/Badge';

const CourseDesktop = ({ 
  programs, 
  selectedCourse, 
  onSelect, 
  university,
  onContinue 
}) => {
  return (
    <div className="shell">
      <Sidebar activeTab="course" />

      <div className="main">
        <div className="pbody">
          <header className="research-header">
            <div className="rh-eyebrow">Phase 4: Academic Programs</div>
            <h1 className="rh-title">Explore Courses at <em>{university.name}</em></h1>
            <p className="rh-desc">
              Compare program-specific outcomes. At the same university, ROI can vary 
              wildly between a general management course and a specialized technical degree.
            </p>
          </header>

          <div className="g3">
            {programs.map(course => (
              <div 
                key={course.id} 
                className={`scard ${selectedCourse?.id === course.id ? 'selected' : ''}`}
                style={course.warning ? { borderLeft: '4px solid var(--coral)' } : {}}
                onClick={() => onSelect(course)}
              >
                <div className="sc-nm" style={{ fontSize: '15px' }}>{course.name}</div>
                <div style={{ fontSize: '11px', color: 'var(--hint)', marginBottom: '14px' }}>
                  Duration: {course.duration} · {university.location}
                </div>
                
                <div className="sc-kv">
                  <span className="sc-k">Median Salary</span>
                  <span className="sc-v" style={{ color: 'var(--teal)' }}>${course.salary?.toLocaleString()}</span>
                </div>
                <div className="sc-kv">
                  <span className="sc-k">Employment Rate</span>
                  <span className="sc-v">{course.employment}%</span>
                </div>
                <div className="sc-kv">
                  <span className="sc-k">H-1B Chance</span>
                  <span className="sc-v">{course.h1bRate}%</span>
                </div>
                <div className="sc-kv">
                  <span className="sc-k">Default Risk</span>
                  <span className="sc-v" style={{ color: course.defaultRate > 5 ? 'var(--coral)' : 'inherit' }}>
                    {course.defaultRate}%
                  </span>
                </div>

                <div className="roi-m">
                  <div className="rm-r">
                    <span>Course Score</span>
                    <span className="rm-v" style={{ color: course.score > 75 ? 'var(--teal)' : 'var(--amber)' }}>
                      {course.score}/100
                    </span>
                  </div>
                  <div className="prog-track" style={{ height: '5px' }}>
                    <div 
                      className="prog-fill" 
                      style={{ 
                        width: `${course.score}%`, 
                        background: course.score > 75 ? 'var(--teal)' : 'var(--amber)' 
                      }}
                    ></div>
                  </div>
                </div>

                <div className="sc-badges">
                  {course.badges?.map(b => (
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
                  <div className="alert a-err" style={{ marginTop: '16px', fontSize: '10px', padding: '8px' }}>
                    <strong>Warning: Low ROI Pattern</strong>
                    This program has a repayment failure rate 3.5x higher than MS CS.
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
            <button 
              className={`btn ${selectedCourse ? 'btn-primary' : 'btn-ghost'}`}
              style={{ padding: '14px 48px' }}
              disabled={!selectedCourse}
              onClick={onContinue}
            >
              Step 4: Reality Check →
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CourseDesktop;
