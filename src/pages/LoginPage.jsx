
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../utils/EmailUtils';
import authService from '../services/AuthService';
import Button from '../components/Button';
import Input from '../components/Input';

function LoginPage() {
  const { setUserContext } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Wrong email format.');
      return;
    }

    if (password.length < 6) {
      setError('Password must contain more than 6 characters');
      return;
    }

    try {
      const data = await authService.login(email, password);
      setUserContext(data.token, email);
      navigate('/welcome');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <Input 
          type={'email'}
          placeholder={'Email'}
          value={email}
          onChange={(e) => setEmail(e.target.value)} />

        <Input 
          type={'password'}
          placeholder={'Password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)} />

        {error && <p className="error">{error}</p>}

        <Button
          type={'submit'}
          lable={'Sing in'}
          onClick={handleSubmit} />
      </form>
    </div>
  );
};

export default LoginPage;
