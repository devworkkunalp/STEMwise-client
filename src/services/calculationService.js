import api from './api';

/**
 * STEMwise Calculation Service
 * Communicates with the .NET backend for ROI and comparison data.
 */
const calculationService = {
  /**
   * get the ROI result for a specific enrollment scenario.
   */
  async calculateROI(payload) {
    try {
      const response = await api.post('/calculation/roi', payload);
      return response.data;
    } catch (error) {
      console.error('Error calculating ROI:', error);
      throw error;
    }
  },

  /**
   * get comparison data for multiple countries and degree types.
   */
  async getComparison(payload) {
    try {
      const response = await api.post('/calculation/compare', payload);
      return response.data;
    } catch (error) {
      console.error('Error fetching comparison data:', error);
      throw error;
    }
  },

  /**
   * get high-level statistics for international student outcomes.
   */
  async getGlobalStats() {
    try {
      const response = await api.get('/calculation/stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching global stats:', error);
      throw error;
    }
  }
};

export default calculationService;
