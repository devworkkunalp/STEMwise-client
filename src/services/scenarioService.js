import api from './api';

/**
 * STEMwise Scenario Service
 * Handles persistence and modeling for "What-If" stress-testing.
 */
const scenarioService = {
  /**
   * Saves a stress-test scenario.
   */
  async saveScenario(payload) {
    try {
      const response = await api.post('/scenario', payload);
      return response.data;
    } catch (error) {
      console.error('Error saving scenario:', error);
      throw error;
    }
  },

  /**
   * Retrieves all saved scenarios for a profile.
   */
  async getScenarios(profileId) {
    try {
      const response = await api.get(`/scenario/${profileId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching scenarios:', error);
      throw error;
    }
  },

  /**
   * Modifies an ROI result base based on a scenario type.
   * (Frontend-only modeling for ultra-responsiveness)
   */
  modelScenario(baseROI, type) {
    if (!baseROI) return null;

    let adjusted = { ...baseROI };
    let impactScore = 0;

    switch (type) {
      case 'H1B_DENIED':
        // Return home after 3 years (OPT)
        // Assume home earnings are much lower
        adjusted.roiScore = Math.max(0, baseROI.roiScore - 35);
        adjusted.paybackYears = 'Never (US-only)';
        impactScore = -35;
        break;
      
      case 'RECESSION':
        // -20% Salary benchmark
        adjusted.roiScore = Math.max(0, baseROI.roiScore - 15);
        adjusted.totalROI = baseROI.totalROI * 0.8;
        impactScore = -15;
        break;

      case 'CURRENCY_CRASH':
        // INR -20% (Repayment is harder)
        adjusted.roiScore = Math.max(0, baseROI.roiScore - 10);
        impactScore = -10;
        break;

      case 'JOB_GAP':
        // 6 months unemployed post-grad
        adjusted.roiScore = Math.max(0, baseROI.roiScore - 8);
        adjusted.paybackYears = parseFloat(baseROI.paybackYears) + 0.5;
        impactScore = -8;
        break;

      case 'LEVEL_3_PROMO':
        // Higher wage selection boost
        adjusted.roiScore = Math.min(100, baseROI.roiScore + 12);
        impactScore = 12;
        break;

      case 'STUDY_DELAY':
        // 1 year extra study (tuition + opportunity cost)
        adjusted.roiScore = Math.max(0, baseROI.roiScore - 12);
        impactScore = -12;
        break;

      default:
        break;
    }

    return { 
        ...adjusted, 
        impactScore, 
        typeName: type.replace(/_/g, ' ') 
    };
  }
};

export default scenarioService;
