import React, { createContext, useContext, useEffect, useState } from 'react';
import authService from '../services/authService';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  const login = async (email, password) => {
    const { user: loggedInUser } = await authService.signIn(email, password);
    setUser(loggedInUser);
    setProfile({ email: loggedInUser.email });
  };

  const signup = async (email, password) => {
    await authService.signUp(email, password);
  };

  const logout = async () => {
    await authService.signOut();
    setUser(null);
    setProfile(null);
  };

  useEffect(() => {
    let mounted = true;
    const initializeSession = async () => {
      try {
        const session = await authService.getCurrentSession();
        if (session && mounted) {
           setUser({ email: 'Active User' }); // Basic mock until profile loads
           setProfile({ email: 'Active User' });
        }
      } catch (err) {
         setAuthError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    
    initializeSession();

    return () => { mounted = false; };
  }, []);

  const value = {
    user,
    profile,
    loading,
    authError,
    isAuthenticated: !!user,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
