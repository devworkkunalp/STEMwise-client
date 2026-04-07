import api from './api';

/**
 * STEMwise Visa Service
 * Handles immigration probability and employer sponsorship data.
 */
const visaService = {
  /**
   * Calculates cumulative H-1B success probability.
   */
  async getVisaProbability(payload) {
    try {
      const response = await api.post('/calculation/visa', payload);
      return response.data;
    } catch (error) {
      console.error('Error fetching visa probability:', error);
      throw error;
    }
  },

  /**
   * Fetches top H-1B sponsors for a given metro area.
   */
  async getTopSponsors(metro) {
    try {
      const response = await api.get(`/salary/h1b-employers`, {
        params: { metro }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching top sponsors:', error);
      throw error;
    }
  },

  /**
   * Fetches historical H-1B statistics.
   */
  async getH1BStats() {
    try {
      const response = await api.get('/salary/h1b-stats');
      return response.data;
    } catch (error) {
      console.error('Error fetching H-1B stats:', error);
      throw error;
    }
  }
};

export default visaService;
