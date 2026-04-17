import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import researchService from '../services/researchService';

const ResearchContext = createContext();

export const ResearchProvider = ({ children }) => {
  // Selection State (Persists Journey)
  const [selectedSector, setSelectedSector] = useState(null);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Dynamic Data State
  const [universities, setUniversities] = useState([]);
  const [rents, setRents] = useState([]);
  const [visaTrends, setVisaTrends] = useState([]);
  const [laborBenchmarks, setLaborBenchmarks] = useState([]);
  
  // Status State
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  /**
   * Loads cached data from localStorage to ensure immediate UI rendering 
   * even if perfectly offline or during backend sync.
   */
  useEffect(() => {
    const cachedData = localStorage.getItem('stemwise_research_cache');
    if (cachedData) {
      try {
        const parsed = JSON.parse(cachedData);
        setUniversities(parsed.universities || []);
        setRents(parsed.rents || []);
        setVisaTrends(parsed.visaTrends || []);
        setLaborBenchmarks(parsed.laborBenchmarks || []);
        setLastUpdated(parsed.timestamp);
      } catch (e) {
        console.error('Failed to parse research cache', e);
      }
    }

    // Load journey selection
    const savedJourney = localStorage.getItem('stemwise_research_journey');
    if (savedJourney) {
      try {
        const { sector, uni, course } = JSON.parse(savedJourney);
        if (sector) setSelectedSector(sector);
        if (uni) setSelectedUniversity(uni);
        if (course) setSelectedCourse(course);
      } catch (e) {
        console.error('Failed to parse journey', e);
      }
    }
  }, []);

  /**
   * Fetches fresh research data from the backend and updates the local cache.
   */
  const refreshResearchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const summary = await researchService.getSummary();
      
      const newUniversities = summary.topSchools || [];
      const newRents = summary.hubRents || [];
      const newVisaTrends = summary.visaTrends || [];
      
      setUniversities(newUniversities);
      setRents(newRents);
      setVisaTrends(newVisaTrends);
      
      const timestamp = new Date().toISOString();
      setLastUpdated(timestamp);

      // Persist to cache
      localStorage.setItem('stemwise_research_cache', JSON.stringify({
        universities: newUniversities,
        rents: newRents,
        visaTrends: newVisaTrends,
        timestamp
      }));
    } catch (err) {
      console.error('Failed to refresh research data', err);
      // We don't clear the error state here so the UI can show stale data
      // but we could set an error message if needed.
      setError('Could not connect to live data. Showing cached results.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch live data on mount (if token is present)
  useEffect(() => {
    const token = localStorage.getItem('local_jwt');
    if (token) {
      refreshResearchData();
    }
  }, [refreshResearchData]);

  // Persist journey state
  useEffect(() => {
    localStorage.setItem('stemwise_research_journey', JSON.stringify({
      sector: selectedSector,
      uni: selectedUniversity,
      course: selectedCourse
    }));
  }, [selectedSector, selectedUniversity, selectedCourse]);

  const resetJourney = () => {
    setSelectedSector(null);
    setSelectedUniversity(null);
    setSelectedCourse(null);
    localStorage.removeItem('stemwise_research_journey');
  };

  // NEW: Hydrate selection from profile if local state is empty
  const hydrateFromProfile = useCallback((profile) => {
    if (!profile) return;
    
    // Auto-select university if matching from profile
    if (!selectedUniversity && profile.targetUniversity && universities.length > 0) {
      const matchedUni = universities.find(u => u.name === profile.targetUniversity || u.id === profile.targetUniversity);
      if (matchedUni) setSelectedUniversity(matchedUni);
    }
    
    // Auto-select course if matching from profile
    if (!selectedCourse && profile.degreeName) {
      // Create a virtual course object if not in list
      setSelectedCourse({ name: profile.degreeName, duration: '2yr' });
    }
  }, [selectedUniversity, selectedCourse, universities]);

  return (
    <ResearchContext.Provider value={{
      // Selection
      selectedSector,
      setSelectedSector,
      selectedUniversity,
      setSelectedUniversity,
      selectedCourse,
      setSelectedCourse,
      resetJourney,
      hydrateFromProfile,
      
      // Data
      universities,
      rents,
      visaTrends,
      laborBenchmarks,
      
      // Metadata
      isLoading,
      error,
      lastUpdated,
      refreshResearchData
    }}>
      {children}
    </ResearchContext.Provider>
  );
};

export const useResearch = () => {
  const context = useContext(ResearchContext);
  if (!context) {
    throw new Error('useResearch must be used within a ResearchProvider');
  }
  return context;
};
