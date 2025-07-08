import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    navigate('/', { replace: true });
  };

  const handleGoToAgents = () => {
    navigate('/agents');
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="logo">
          <span className="logo-icon">💰</span>
          <h1>FinanceAI</h1>
        </div>
        <nav className="nav-menu">
          <button className="nav-btn active">Início</button>
          <button className="nav-btn" onClick={handleGoToAgents}>Agentes IA</button>
          <button className="nav-btn">Relatórios</button>
          <button className="nav-btn">Configurações</button>
        </nav>
        <div className="user-section">
          <span className="user-avatar">👤</span>
          <button className="logout-btn" onClick={handleLogout}>
            Sair
          </button>
        </div>
      </header>

      <main className="home-main">
        <div className="hero-section">
          <div className="hero-content">
            <h2 className="hero-title">
              Bem-vindo ao seu <span className="highlight">Assistente Financeiro</span>
            </h2>
            <p className="hero-subtitle">
              Utilize nossa inteligência artificial avançada para análise financeira, 
              previsões e insights personalizados para suas decisões de investimento.
            </p>
            <div className="hero-buttons">
              <button className="primary-btn" onClick={handleGoToAgents}>
                Começar Análise
              </button>
              <button className="secondary-btn">
                Ver Dashboard
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="money-animation">
              <div className="money-stack">
                <div className="money-bill bill-1">💵</div>
                <div className="money-bill bill-2">💵</div>
                <div className="money-bill bill-3">💵</div>
                <div className="money-bill bill-4">💵</div>
                <div className="money-bill bill-5">💵</div>
              </div>
              <div className="coins">
                <div className="coin coin-1">🪙</div>
                <div className="coin coin-2">🪙</div>
                <div className="coin coin-3">🪙</div>
                <div className="coin coin-4">🪙</div>
              </div>
            </div>
          </div>
        </div>

        <div className="features-section">
          <h3 className="features-title">Recursos Principais</h3>
          <div className="features-grid">
            <div className="feature-card">
              <h4>Análise de Tendências</h4>
              <p>Identifique padrões e tendências nos seus dados financeiros</p>
            </div>
            <div className="feature-card">
              <h4>Previsões Inteligentes</h4>
              <p>Obtenha previsões baseadas em IA para seus investimentos</p>
            </div>
            <div className="feature-card">
              <h4>Relatórios Detalhados</h4>
              <p>Relatórios completos e visualizações interativas</p>
            </div>
            <div className="feature-card">
              <h4>Processamento Rápido</h4>
              <p>Análises em tempo real com resultados instantâneos</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 