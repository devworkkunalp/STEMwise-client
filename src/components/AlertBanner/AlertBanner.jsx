import React from 'react';
import { AlertCircle, CheckCircle2, Info, XCircle, X } from 'lucide-react';
import './AlertBanner.css';

/**
 * Premium AlertBanner for STEMwise.
 * Provides contextual feedback (Success, Warning, Danger, Info).
 */
const AlertBanner = ({ 
  type = 'info', 
  title, 
  children, 
  onClose,
  className = ''
}) => {
  const icons = {
    info: Info,
    success: CheckCircle2,
    warning: AlertCircle,
    danger: XCircle,
  };

  const Icon = icons[type];

  return (
    <div className={`sw-alert sw-alert--${type} animate-fade-in ${className}`}>
      <div className="sw-alert-icon-wrapper">
        <Icon size={20} />
      </div>
      
      <div className="sw-alert-content">
        {title && <h4 className="sw-alert-title">{title}</h4>}
        <div className="sw-alert-message">{children}</div>
      </div>

      {onClose && (
        <button className="sw-alert-close" onClick={onClose}>
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default AlertBanner;
