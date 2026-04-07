import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import profileService from '../services/profileService';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const isFetchingProfile = React.useRef(false);

  const refreshProfile = async (userId, force = false) => {
    // If already fetching or already have profile for this user, skip (unless forced)
    if ((isFetchingProfile.current || (profile && user?.id === userId)) && !force) {
      return;
    }

    isFetchingProfile.current = true;
    
    // Safety timeout: don't let a slow API hang the whole app initialization
    const timeout = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Profile fetch timeout")), 5000)
    );

    try {
      const data = await Promise.race([
        profileService.getMyProfile(),
        timeout
      ]);
      setProfile(data);
    } catch (err) {
      console.warn("Profile unavailable or timeout:", err.message);
      // Don't set profile to null if it's just a timeout/network error on a retry
      if (!profile) setProfile(null);
    } finally {
      isFetchingProfile.current = false;
    }
  };


  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        setSession(session);
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        
        if (currentUser) {
          await refreshProfile(currentUser.id);
        }
      } catch (err) {
        console.error("Critical session check failure:", err);
      } finally {
        setLoading(false);
      }
    };


    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      const currentUser = session?.user ?? null;
      
      setSession(session);
      setUser(currentUser);
      
      // Only fetch profile on specific events to avoid the refresh loop
      if (currentUser && (event === 'SIGNED_IN' || event === 'INITIAL_SESSION')) {
        await refreshProfile(currentUser.id);
      } else if (!currentUser) {
        setProfile(null);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const value = {
    user,
    session,
    profile,
    loading,
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
