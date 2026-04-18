import api from './api';

/**
 * Service to fetch orchestrated research data from the backend.
 * All endpoints are secured and require a Bearer token.
 */
const researchService = {
  /**
   * Fetches the overall research summary (Top Schools, Rents, Visa Trends)
   */
  getSummary: async () => {
    const response = await api.get('/research/summary');
    return response.data;
  },

  /**
   * Fetches university rankings, optionally filtered by sector
   */
  getUniversities: async (sector) => {
    const response = await api.get('/research/universities', {
      params: { sector }
    });
    return response.data;
  },

  /**
   * Fetches fair market regional rents
   */
  getHousing: async () => {
    const response = await api.get('/research/housing');
    return response.data;
  },

  /**
   * Fetches regional H-1B success rates
   */
  getVisaBenchmarks: async () => {
    const response = await api.get('/research/visa-benchmarks');
    return response.data;
  },

  /**
   * Fetches regional salary percentiles
   */
  getLaborBenchmarks: async () => {
    const response = await api.get('/research/labor-benchmarks');
    return response.data;
  },

  /**
   * Fetches international university ROI benchmarks
   */
  getGlobalRankings: async () => {
    const response = await api.get('/research/global');
    return response.data;
  },

  /**
   * Fetches international alternatives for a specific sector (Germany, Canada, etc)
   */
  getGlobalAlternatives: async (specialization) => {
    const response = await api.get('/research/global-alternatives', {
      params: { specialization }
    });
    return response.data;
  }
};

export default researchService;
