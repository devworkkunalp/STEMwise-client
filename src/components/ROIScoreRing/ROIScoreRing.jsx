import React, { useEffect, useState } from 'react';
import './ROIScoreRing.css';

/**
 * Animated SVG ROI Score Ring for STEMwise.
 * Features a circular progress bar with color-coded score and narrative label.
 */
const ROIScoreRing = ({ 
  score = 0, 
  size = 200, 
  strokeWidth = 12, 
  showLabel = true 
}) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (animatedScore / 100) * circumference;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedScore(score);
    }, 100);
    return () => clearTimeout(timeout);
  }, [score]);

  // Color Mapping based on score
  const getScoreColor = (value) => {
    if (value >= 80) return 'var(--color-teal)';
    if (value >= 60) return 'var(--color-sky)';
    if (value >= 40) return 'var(--color-amber)';
    return 'var(--color-coral)';
  };

  const getScoreLabel = (value) => {
    if (value >= 80) return 'Excellent';
    if (value >= 60) return 'Strong';
    if (value >= 40) return 'Moderate';
    return 'Low';
  };

  return (
    <div className="sw-roi-ring-container" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="sw-roi-ring-svg">
        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--bg-navy-light)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress Fill */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getScoreColor(animatedScore)}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          style={{ strokeDashoffset: offset }}
          strokeLinecap="round"
          className="sw-roi-ring-fill"
        />
      </svg>
      {showLabel && (
        <div className="sw-roi-ring-content">
          <span className="sw-roi-ring-value text-mono">{Math.round(animatedScore)}</span>
          <span className="sw-roi-ring-label" style={{ color: getScoreColor(animatedScore) }}>
            {getScoreLabel(animatedScore)}
          </span>

        </div>
      )}
    </div>
  );
};

export default ROIScoreRing;
