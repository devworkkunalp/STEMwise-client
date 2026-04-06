import React from 'react';
import './Badge.css';

/**
 * Premium Badge component for status labels, ROI scores, and risk tags.
 */
const Badge = ({ 
  children, 
  variant = 'default', 
  size = 'md', 
  className = '',
  ...props 
}) => {
  return (
    <span className={`sw-badge sw-badge--${variant} sw-badge--${size} ${className}`} {...props}>
      {children}
    </span>
  );
};

export default Badge;
