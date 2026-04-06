import React, { useState } from 'react';
import { Menu, X, Rocket } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../Button/Button';
import './Navbar.css';

/**
 * Premium Navbar for STEMwise.
 * Responsive header with desktop links and mobile hamburger menu.
 */
const Navbar = ({ isAuthenticated = false, user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="sw-navbar glass-panel">
      <div className="container-premium sw-navbar-inner">
        {/* Logo */}
        <div 
          className="sw-navbar-logo" 
          onClick={() => navigate('/')} 
          style={{ cursor: 'pointer' }}
        >
          <Rocket className="sw-logo-icon" size={24} />
          <span className="sw-logo-text">STEM<span className="text-gradient">wise</span></span>
        </div>

        {/* Desktop Links */}
        <div className="sw-navbar-links">
          <Link to="/" className="sw-nav-link">Features</Link>
          <Link to="/" className="sw-nav-link">Compare</Link>
          <Link to="/" className="sw-nav-link">Pricing</Link>
          <Link to="/" className="sw-nav-link">Blog</Link>
        </div>

        {/* Auth Actions */}
        <div className="sw-navbar-actions">
          {!isAuthenticated ? (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>Sign In</Button>
              <Button variant="primary" size="sm" onClick={() => navigate('/signup')}>Start Free</Button>
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
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Features</Link>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Compare</Link>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Pricing</Link>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Blog</Link>
          <div className="sw-mobile-actions">
            <Button variant="outline" fullWidth onClick={() => { navigate('/login'); setIsMenuOpen(false); }}>Sign In</Button>
            <Button variant="primary" fullWidth onClick={() => { navigate('/signup'); setIsMenuOpen(false); }}>Start Free</Button>
          </div>
        </div>
      )}
    </nav>
  );
};


export default Navbar;
