import { jwtDecode } from 'jwt-decode';

const TOKEN_KEY = 'token';

const TokenService = {
  saveToken: (token) => localStorage.setItem(TOKEN_KEY, token),
  getToken: () => localStorage.getItem(TOKEN_KEY),
  removeToken: () => localStorage.removeItem(TOKEN_KEY),
  decodeToken: (token) => jwtDecode(token)
}
export default TokenService;
