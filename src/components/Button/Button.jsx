import React from 'react';
import './Button.css';

/**
 * Premium Button component for STEMwise.
 * Supports variants: primary (glow), secondary (glass), outline (teal), and ghost.
 */
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  isLoading = false, 
  icon: Icon, 
  className = '', 
  ...props 
}) => {
  return (
    <button 
      className={`sw-button sw-button--${variant} sw-button--${size} ${isLoading ? 'is-loading' : ''} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <span className="sw-button__spinner"></span>}
      {!isLoading && Icon && <Icon size={size === 'sm' ? 14 : 18} className="sw-button__icon" />}
      <span className="sw-button__text">{children}</span>
    </button>
  );
};

export default Button;
