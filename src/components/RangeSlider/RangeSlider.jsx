import React from 'react';
import './RangeSlider.css';

/**
 * Premium RangeSlider for STEMwise.
 * Custom input range for modeling financial scenarios (loan amt, income).
 */
const RangeSlider = ({ 
  label, 
  min = 0, 
  max = 100, 
  step = 1, 
  value, 
  onChange, 
  prefix = '', 
  suffix = '',
  className = '',
  ...props 
}) => {
  return (
    <div className={`sw-range-group ${className}`}>
      <div className="sw-range-header">
        {label && <label className="sw-range-label">{label}</label>}
        <span className="sw-range-value">{prefix}{value?.toLocaleString()}{suffix}</span>
      </div>
      
      <div className="sw-range-wrapper">
        <input 
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={onChange}
          className="sw-range-input"
          {...props}
        />
        <div className="sw-range-track-bg"></div>
        <div 
          className="sw-range-track-fill" 
          style={{ width: `${((value - min) / (max - min)) * 100}%` }}
        ></div>
      </div>

      <div className="sw-range-footer">
        <span className="sw-range-limit">{prefix}{min.toLocaleString()}{suffix}</span>
        <span className="sw-range-limit">{prefix}{max.toLocaleString()}{suffix}</span>
      </div>
    </div>
  );
};

export default RangeSlider;
