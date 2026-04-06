import React from 'react';
import './ProgressBar.css';

/**
 * Premium ProgressBar for STEMwise.
 * Highlights progress through milestones, savings, or repayment.
 */
const ProgressBar = ({ 
  progress = 0, 
  label, 
  value, 
  variant = 'teal', 
  className = '' 
}) => {
  return (
    <div className={`sw-progress-group ${className}`}>
      {(label || value) && (
        <div className="sw-progress-header">
          {label && <span className="sw-progress-label">{label}</span>}
          {value && <span className="sw-progress-value text-mono">{value}</span>}
        </div>
      )}
      
      <div className="sw-progress-track">
        <div 
          className={`sw-progress-fill sw-progress-fill--${variant}`} 
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
