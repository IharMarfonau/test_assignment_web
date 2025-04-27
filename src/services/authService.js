import axios from 'axios';
import tokenService from './TokenService';

const API_URL = process.env.REACT_APP_API_URL;
const AuthService = {

  login: async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  },

  logout: async (email) => {
    const token = tokenService.getToken();
    await axios.post(`${API_URL}/logout`, {email}, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  checkToken: async () => {
    const token = tokenService.getToken();
    const response = await axios.get(`${API_URL}/check`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
}

export default AuthService;
