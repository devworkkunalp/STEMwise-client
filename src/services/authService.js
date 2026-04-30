import api from './api';

/**
 * STEMwise Native Authentication Service (Mocked to bypass Azure DB limit)
 */
const authService = {
  /**
   * Mocked signup
   */
  async signUp(email, password) {
    return new Promise(resolve => setTimeout(() => resolve({ success: true }), 500));
  },

  /**
   * Mocked login
   */
  async signIn(email, password) {
    return new Promise(resolve => setTimeout(() => {
      const mockToken = 'mock_jwt_token_for_testing';
      localStorage.setItem('local_jwt', mockToken);
      resolve({ user: { email }, session: { access_token: mockToken } });
    }, 500));
  },

  /**
   * clears tokens from memory and storage locally.
   */
  async signOut() {
    localStorage.removeItem('local_jwt');
    localStorage.removeItem('local_refresh');
  },

  /**
   * Mocks getting the current session by polling local storage for active API tokens.
   */
  async getCurrentSession() {
    const token = localStorage.getItem('local_jwt');
    if (!token) return null;
    return { access_token: token };
  }
};

export default authService;
