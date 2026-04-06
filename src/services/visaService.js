import api from './api';

/**
 * STEMwise Visa & Pathway Service
 * Communicates with the .NET backend for visa policy and loan scenario data.
 */
const visaService = {
  /**
   * get the visa pathway timeline and risk assessment for a specific country.
   */
  async getPathway(countryCode) {
    try {
      const response = await api.get(`/visa/pathway/${countryCode}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching visa pathway for ${countryCode}:`, error);
      throw error;
    }
  },

  /**
   * get the updated loan scenario based on interest rate and loan amount.
   */
  async getLoanScenario(payload) {
    try {
      const response = await api.post('/visa/loan-scenario', payload);
      return response.data;
    } catch (error) {
      console.error('Error fetching loan scenario:', error);
      throw error;
    }
  }
};

export default visaService;
