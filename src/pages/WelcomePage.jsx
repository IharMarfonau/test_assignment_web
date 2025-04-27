import { useAuth } from '../contexts/AuthContext';
import authService from '../services/AuthService';
import Button from '../components/Button';

function WelcomePage() {
  const { email, resetUserContext } = useAuth();

  const handleLogout = async () => {
    await authService.logout(email);
    resetUserContext();
  };

  return (
    <div className="welcome-container">
      <h2>Hi, {email}</h2>
      <Button
        type={'submit'}
        lable={'Logout'}
        onClick={handleLogout} />
    </div>
  );
};

export default WelcomePage;
