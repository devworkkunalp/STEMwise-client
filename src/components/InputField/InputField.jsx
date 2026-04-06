import React from 'react';
import './InputField.css';

/**
 * Premium InputField for STEMwise.
 * Supports prefixes ($/₹), suffixes, labels, and error states.
 */
const InputField = ({ 
  label, 
  prefix, 
  suffix, 
  error, 
  hint, 
  id, 
  className = '', 
  ...props 
}) => {
  return (
    <div className={`sw-input-group ${error ? 'has-error' : ''} ${className}`}>
      {label && <label htmlFor={id} className="sw-input-label">{label}</label>}
      
      <div className="sw-input-wrapper">
        {prefix && <span className="sw-input-prefix">{prefix}</span>}
        <input 
          id={id}
          className={`sw-input ${prefix ? 'has-prefix' : ''} ${suffix ? 'has-suffix' : ''}`}
          {...props}
        />
        {suffix && <span className="sw-input-suffix">{suffix}</span>}
      </div>

      {error && <p className="sw-input-error">{error}</p>}
      {hint && !error && <p className="sw-input-hint">{hint}</p>}
    </div>
  );
};

export default InputField;
