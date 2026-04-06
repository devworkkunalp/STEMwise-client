import React from 'react';
import { Check, AlertTriangle } from 'lucide-react';

import './TimelineStep.css';

/**
 * Premium TimelineStep for STEMwise Visa Pathways.
 * Visualizes stages of an H-1B lottery or PR process.
 */
const TimelineStep = ({ 
  steps = [],
  currentStepIndex = 0
}) => {
  return (
    <div className="sw-timeline-container">
      {steps.map((step, index) => {
        const isCompleted = index < currentStepIndex;
        const isActive = index === currentStepIndex;
        const isPending = index > currentStepIndex;
        
        return (
          <div key={step.id || index} className={`sw-timeline-item ${isActive ? 'is-active' : ''} ${isCompleted ? 'is-completed' : ''}`}>
            <div className="sw-timeline-visual">
              <div className="sw-timeline-node">
                {isCompleted ? <div className="sw-node-check">✓</div> : <div className="sw-node-dot"></div>}
              </div>
              {index < steps.length - 1 && <div className="sw-timeline-line"></div>}
            </div>
            
            <div className="sw-timeline-content">
              <div className="sw-timeline-header">
                <h4 className="sw-timeline-title">{step.title}</h4>
                {step.duration && <span className="sw-timeline-duration text-mono">{step.duration}</span>}
              </div>
              <p className="sw-timeline-desc text-secondary">{step.description}</p>
              
              {isActive && step.risk && (
                <div className="sw-timeline-risk">
                  <AlertTriangle size={14} className="text-amber" />
                  <span>{step.risk}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TimelineStep;
