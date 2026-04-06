import api from './api';

/**
 * STEMwise Profile Service
 * Handles user profile and onboarding data updates.
 */
const profileService = {
  /**
   * get the currently authenticated user's profile.
   */
  async getMyProfile() {
    try {
      const response = await api.get('/profile/me');
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  },

  /**
   * create or update the user's profile data.
   */
  async upsertProfile(profileData) {
    try {
      const response = await api.post('/profile', profileData);
      return response.data;
    } catch (error) {
      console.error('Error upserting profile:', error);
      throw error;
    }
  }
};

export default profileService;
