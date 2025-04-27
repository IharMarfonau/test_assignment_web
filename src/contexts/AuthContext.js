import { 
  createContext, 
  useContext, 
  useState, 
  useEffect,
  useRef
 } from 'react';
import tokenService from '../services/TokenService';
import authService from '../services/AuthService';

const TIMEOUT_SEC = process.env.REACT_APP_CHECK_TOKEN_TIMEOUT_SEC;

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const timeoutRef = useRef(null);

  useEffect(() => {
    const token = tokenService.getToken();
    if (token) {
      verifyToken();
    }

    return () => {
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const setUserContext = (token, email) => {
    tokenService.saveToken(token);
    setEmail(email);
    setIsAuthenticated(true);
  };

  const resetUserContext = () => {
    tokenService.removeToken();
    setEmail('');
    setIsAuthenticated(false);
    if (timeoutRef.current) {
      clearInterval(timeoutRef.current);
    }
  };

  const verifyToken = async () => {
    if (timeoutRef.current) {
      clearInterval(timeoutRef.current);
    }

    timeoutRef.current = setInterval(async () => {
      try {
        const data = await authService.checkToken();
        if (data.expired) {
          resetUserContext();
        } else {
          verifyToken();
        }
      } catch (error) {
        resetUserContext();
      }
    }, TIMEOUT_SEC * 1000);
  };

  return (
    <AuthContext.Provider value={{ 
        isAuthenticated, 
        email, 
        setUserContext, 
        resetUserContext, 
        verifyToken 
      }} >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
