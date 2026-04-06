import React from 'react';
import { Rocket } from 'lucide-react';
import './LoadingSpinner.css';

/**
 * Premium LoadingSpinner for STEMwise.
 * Features a pulsing rocket icon and animated outer rings.
 */
const LoadingSpinner = ({ fullPage = false, message = 'Calculating ROI...' }) => {
  return (
    <div className={`sw-loader-container ${fullPage ? 'is-full-page' : ''}`}>
      <div className="sw-loader-visual">
        <div className="sw-loader-ring"></div>
        <div className="sw-loader-ring sw-loader-ring--pulse"></div>
        <Rocket size={32} className="sw-loader-icon" />
      </div>
      {message && <p className="sw-loader-text text-mono">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
