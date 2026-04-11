import React from 'react';
import './StatCard.css';

/**
 * Premium StatCard for STEMwise dashboards.
 * Displays high-impact metrics with labels, trends, and mono-font values.
 */
const StatCard = ({ 
  label, 
  value, 
  subtitle, 
  trend, 
  trendDirection = 'up', 
  icon: Icon,
  className = ''
}) => {
  return (
    <div className={`sw-stat-card ${className}`}>
      <div className="sw-stat-content">
        <div className="sw-stat-header">
          <span className="sw-stat-label">{label}</span>
          {Icon && <Icon size={18} className="sw-stat-icon" />}
        </div>
        
        <div className="sw-stat-body">
          <h3 className="sw-stat-value text-mono">{value}</h3>
          {(trend || subtitle) && (
            <div className="sw-stat-footer">
              {trend && (
                <span className={`sw-stat-trend sw-stat-trend--${trendDirection}`}>
                  {trendDirection === 'up' ? '↑' : '↓'} {trend}
                </span>
              )}
              {subtitle && <span className="sw-stat-subtitle">{subtitle}</span>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
