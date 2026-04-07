import api from './api';

/**
 * STEMwise Loan Service
 * Handles complex loan amortization and comparison logic.
 */
const loanService = {
  /**
   * Calculates monthly EMI, total interest, and grand total.
   */
  async calculateLoan(payload) {
    try {
      const response = await api.post('/calculation/loan', payload);
      return response.data;
    } catch (error) {
      console.error('Error calculating loan:', error);
      throw error;
    }
  }
};

export default loanService;
