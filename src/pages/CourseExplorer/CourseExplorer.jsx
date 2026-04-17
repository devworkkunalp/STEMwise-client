import React, { useState, useEffect } from 'react';
import { useResearch } from '../../context/ResearchContext';
import { PROGRAMS } from '../Research/data/researchMock';
import CourseDesktop from './views/CourseDesktop';
import CourseMobile from './views/CourseMobile';
import { useNavigate } from 'react-router-dom';
import { useMobile } from '../../hooks/useMobile';

const CourseExplorer = () => {
  const { selectedUniversity, setSelectedCourse, selectedCourse } = useResearch();
  const navigate = useNavigate();
  const isMobile = useMobile();

  useEffect(() => {
    if (!selectedUniversity) {
      navigate('/rankings');
    }
  }, [selectedUniversity, navigate]);

  const universityPrograms = PROGRAMS.filter(p => !selectedUniversity || p.universityId === selectedUniversity?.id || true); // Use all for mock

  const handleSelectCourse = (course) => {
    setSelectedCourse(course);
  };

  const handleContinue = () => {
    if (selectedCourse) {
      navigate('/reality-check');
    }
  };

  if (!selectedUniversity) return null;

  if (isMobile) {
    return (
      <CourseMobile 
        programs={universityPrograms}
        selectedCourse={selectedCourse}
        onSelect={handleSelectCourse}
        university={selectedUniversity}
        onContinue={handleContinue}
      />
    );
  }

  return (
    <CourseDesktop 
      programs={universityPrograms}
      selectedCourse={selectedCourse}
      onSelect={handleSelectCourse}
      university={selectedUniversity}
      onContinue={handleContinue}
    />
  );
};

export default CourseExplorer;
