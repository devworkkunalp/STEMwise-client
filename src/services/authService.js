import api from './api';

/**
 * STEMwise Native Authentication Service
 * Calls the local .NET 8 Identity API Endpoints.
 */
const authService = {
  /**
   * sign up a new user natively with an email and password
   */
  async signUp(email, password) {
    // Calling .NET Identity /register endpoint
    const response = await api.post('/register', { email, password });
    return response.data;
  },

  /**
   * sign in an existing user and retrieve the JWT Bearer natively
   */
  async signIn(email, password) {
    // Calling .NET Identity /login endpoint
    // It returns { accessToken, expiresIn, refreshToken }
    const response = await api.post('/login', { email, password });
    
    const { accessToken, refreshToken } = response.data;
    
    // Explicitly cache JWT to LocalStorage to bind sessions securely
    if (accessToken) {
      localStorage.setItem('local_jwt', accessToken);
      localStorage.setItem('local_refresh', refreshToken);
    }
    
    return { user: { email }, session: { access_token: accessToken } };
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
