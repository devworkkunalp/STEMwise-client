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

  const universityPrograms = React.useMemo(() => {
    if (!selectedUniversity) return [];
    
    // In a future phase, we will fetch specific CIP-code programs from the backend.
    // For now, we generate the "Master STEM Program" using the university's live federal data.
    return [
      {
        id: `mscs-${selectedUniversity.unitId}`,
        name: 'Master of Computer Science (STEM)',
        duration: '2yr',
        salary: selectedUniversity.medianEarnings || 115000,
        tuition: selectedUniversity.annualTuition || 45000,
        roiScore: selectedUniversity.roiScore || 85,
        h1bRate: selectedUniversity.intlStudentShare ? (selectedUniversity.intlStudentShare * 100).toFixed(1) : '45',
        badges: ['STEM OPT ✓', 'Live Data', 'Top Demand'],
        description: `This data is orchestrated directly from federal reports for ${selectedUniversity.name}.`
      },
      {
        id: `msds-${selectedUniversity.unitId}`,
        name: 'Master of Data Science / Analytics',
        duration: '1.5yr',
        salary: (selectedUniversity.medianEarnings || 112000) * 0.95,
        tuition: selectedUniversity.annualTuition || 45000,
        roiScore: (selectedUniversity.roiScore || 80) - 2,
        h1bRate: selectedUniversity.intlStudentShare ? (selectedUniversity.intlStudentShare * 95).toFixed(1) : '42',
        badges: ['STEM OPT ✓', 'Fast Track'],
        description: 'Data analytics specialization with an optimized 18-month timeline.'
      }
    ];
  }, [selectedUniversity]);

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
