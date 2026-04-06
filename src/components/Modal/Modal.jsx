import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import './Modal.css';

/**
 * Premium Modal for STEMwise.
 * Features glassmorphism, backdrop-blur, and smooth entrance animations.
 */
const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer,
  maxWidth = '500px',
  className = ''
}) => {
  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="sw-modal-overlay animate-fade-in" onClick={onClose}>
      <div 
        className={`sw-modal-container glass-panel ${className}`} 
        style={{ maxWidth }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sw-modal-header">
          {title && <h3 className="sw-modal-title">{title}</h3>}
          <button className="sw-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <div className="sw-modal-body">
          {children}
        </div>

        {footer && (
          <div className="sw-modal-footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
