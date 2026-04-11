import api from './api';

/**
 * STEMwise Scenario Service
 * Handles persistence and modeling for "What-If" stress-testing.
 */
const scenarioService = {
  /**
   * Models a scenario impact by calling the backend.
   */
  async modelScenario(profileId, scenarioType) {
    try {
      const response = await api.post('/scenario/model', { profileId, scenarioType });
      return response.data;
    } catch (error) {
      console.error('Error modeling scenario:', error);
      throw error;
    }
  },

  /**
   * Saves a stress-test scenario result.
   */
  async saveScenario(result) {
    try {
      const response = await api.post('/scenario/save', result);
      return response.data;
    } catch (error) {
      console.error('Error saving scenario:', error);
      throw error;
    }
  },

  /**
   * Retrieves scenario history for the current profile.
   */
  async getHistory() {
    try {
      const response = await api.get('/scenario/history');
      return response.data;
    } catch (error) {
      console.error('Error fetching history:', error);
      throw error;
    }
  }
};

export default scenarioService;
