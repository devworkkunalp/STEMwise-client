import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import profileService from '../services/profileService';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const isFetchingProfile = React.useRef(false);

  const refreshProfile = async (userId, force = false, retryCount = 1) => {
    if ((isFetchingProfile.current || (profile && user?.id === userId)) && !force) {
      return;
    }

    isFetchingProfile.current = true;
    setAuthError(null);
    
    // 8-second safety timeout for backend pooler
    const timeout = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Profile fetch timeout")), 8000)
    );
    try {
      const data = await Promise.race([
        profileService.getMyProfile(),
        timeout
      ]);
      setProfile(data);
    } catch (err) {
      console.warn("Profile fetch failed or timed out:", err.message);
      setAuthError(err.message);
    } finally {
      isFetchingProfile.current = false;
      setLoading(false); // ALWAYS unset loading to prevent UI hang
    }
  };


  useEffect(() => {
    let mounted = true;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      if (!mounted) return;
      
      const currentUser = currentSession?.user ?? null;
      setSession(currentSession);
      setUser(currentUser);
      
      if (currentUser && (event === 'SIGNED_IN' || event === 'INITIAL_SESSION' || event === 'TOKEN_REFRESHED')) {
        await refreshProfile(currentUser.id);
      } else if (!currentUser) {
        setProfile(null);
      }
      
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const value = {
    user,
    session,
    profile,
    loading,
    authError,
    isAuthenticated: !!user,
    refreshProfile
  };


  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};


// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
