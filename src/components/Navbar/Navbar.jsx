import React, { useState } from 'react';
import { Menu, X, Rocket } from 'lucide-react';
import Button from '../Button/Button';
import './Navbar.css';

/**
 * Premium Navbar for STEMwise.
 * Responsive header with desktop links and mobile hamburger menu.
 */
const Navbar = ({ isAuthenticated = false, user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sw-navbar glass-panel">
      <div className="container-premium sw-navbar-inner">
        {/* Logo */}
        <div className="sw-navbar-logo">
          <Rocket className="sw-logo-icon" size={24} />
          <span className="sw-logo-text">STEM<span className="text-gradient">wise</span></span>
        </div>

        {/* Desktop Links */}
        <div className="sw-navbar-links">
          <a href="#features" className="sw-nav-link">Features</a>
          <a href="#compare" className="sw-nav-link">Compare</a>
          <a href="#pricing" className="sw-nav-link">Pricing</a>
          <a href="#blog" className="sw-nav-link">Blog</a>
        </div>

        {/* Auth Actions */}
        <div className="sw-navbar-actions">
          {!isAuthenticated ? (
            <>
              <Button variant="ghost" size="sm" onClick={() => window.location.href = '/login'}>Sign In</Button>
              <Button variant="primary" size="sm" onClick={() => window.location.href = '/signup'}>Start Free</Button>
            </>
          ) : (
            <div className="sw-user-profile">
              <span className="sw-user-name">{user?.name || 'User'}</span>
              <div 
                className="sw-user-avatar" 
                title="Log Out" 
                onClick={onLogout} 
                style={{ cursor: 'pointer' }}
              >
                {user?.name?.charAt(0) || 'U'}
              </div>
            </div>
          )}

          
          <button 
            className="sw-mobile-toggle" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="sw-mobile-menu animate-fade-in">
          <a href="#features" onClick={() => setIsMenuOpen(false)}>Features</a>
          <a href="#compare" onClick={() => setIsMenuOpen(false)}>Compare</a>
          <a href="#pricing" onClick={() => setIsMenuOpen(false)}>Pricing</a>
          <a href="#blog" onClick={() => setIsMenuOpen(false)}>Blog</a>
          <div className="sw-mobile-actions">
            <Button variant="outline" fullWidth>Sign In</Button>
            <Button variant="primary" fullWidth>Start Free</Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
