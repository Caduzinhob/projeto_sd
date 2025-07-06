import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    navigate('/', { replace: true });
  };

  const handleGoToAgents = () => {
    navigate('/agents');
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh',
      gap: '1rem'
    }}>
      <h1>Bem-vindo!</h1>
      <p>Você está logado com o ID: {userId}</p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button 
          onClick={handleGoToAgents}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Agentes de IA
        </button>
        <button 
          onClick={handleLogout}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Sair
        </button>
      </div>
    </div>
  );
} 