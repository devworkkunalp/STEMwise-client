import api from './api';

/**
 * STEMwise Country Service
 * Retrieves destination country profiles and immigration data.
 */
const countryService = {
  /**
   * Fetches all supported destination countries.
   */
  async getAllCountries() {
    try {
      const response = await api.get('/country');
      return response.data;
    } catch (error) {
      console.error('Error fetching countries:', error);
      return [];
    }
  },

  /**
   * Fetches static risk and visa data for a country code.
   */
  async getCountryByCode(code) {
    try {
      const response = await api.get(`/country/${code}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching country ${code}:`, error);
      return null;
    }
  }
};

export default countryService;
