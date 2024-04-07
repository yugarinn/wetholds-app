import axios from 'axios';

const API_BASE_URL = 'http://localhost:9990';

export default {
  async getCrags() {
    try {
      const response = await axios.get(`${API_BASE_URL}/crags`);

      return response.data;
    } catch (error) {
      console.error('Error fetching points:', error);

      throw error;
    }
  }
};
