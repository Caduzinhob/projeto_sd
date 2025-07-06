import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './Login.css'

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const userId = searchParams.get('userid');
    if (userId) {
      localStorage.setItem('userId', userId);
      navigate('/home', { replace: true });
    }
  }, [searchParams, navigate]);

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND}auth/google`;
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Bem-vindo!</h1>
        <p>Faça login para continuar</p>
        <button className="google-btn" onClick={handleGoogleLogin}>
          <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google logo" className="google-icon" />
          Entrar com Google
        </button>
      </div>
    </div>
  );
} 