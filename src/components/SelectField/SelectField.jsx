import React from 'react';
import './SelectField.css';

/**
 * Premium SelectField for STEMwise.
 * Custom styled dropdown for country, degree, and university selection.
 */
const SelectField = ({ 
  label, 
  options = [], 
  error, 
  hint, 
  id, 
  className = '', 
  ...props 
}) => {
  return (
    <div className={`sw-select-group ${error ? 'has-error' : ''} ${className}`}>
      {label && <label htmlFor={id} className="sw-select-label">{label}</label>}
      
      <div className="sw-select-wrapper">
        <select 
          id={id}
          className="sw-select"
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="sw-select-chevron"></span>
      </div>

      {error && <p className="sw-select-error">{error}</p>}
      {hint && !error && <p className="sw-select-hint">{hint}</p>}
    </div>
  );
};

export default SelectField;
