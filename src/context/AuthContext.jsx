import React, { createContext, useContext, useEffect, useState } from 'react';
import authService from '../services/authService';
import profileService from '../services/profileService';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const isFetchingProfile = React.useRef(false);

  const refreshProfile = async (force = false) => {
    if ((isFetchingProfile.current) && !force) return;

    isFetchingProfile.current = true;
    setAuthError(null);
    
    try {
      const data = await profileService.getMyProfile();
      setProfile(data);
    } catch (err) {
      console.warn("Profile fetch failed:", err);
      if (err.status === 401 || err.status === 403) {
        setUser(null);
        authService.signOut();
      }
      setAuthError(err.message);
    } finally {
      isFetchingProfile.current = false;
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const { user: loggedInUser } = await authService.signIn(email, password);
    setUser(loggedInUser);
    await refreshProfile(true);
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
           await refreshProfile(true);
        } else if (mounted) {
           setLoading(false);
        }
      } catch (err) {
         setLoading(false);
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
    refreshProfile,
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
