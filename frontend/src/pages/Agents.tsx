import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Agents.css';

interface AnalysisResult {
  success: boolean;
  data: any;
  timestamp: string;
}

export default function Agents() {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [numbers, setNumbers] = useState('');
  const [operation, setOperation] = useState('sum');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTextAnalysis = async () => {
    if (!text.trim()) return;
    
    setLoading(true);
    try {
      const response = await api.post('/agents/analyze', { text });
      setAnalysisResult(response.data);
    } catch (error) {
      console.error('Error analyzing text:', error);
      alert('Erro ao analisar texto');
    } finally {
      setLoading(false);
    }
  };

  const handlePrediction = async () => {
    if (!text.trim()) return;
    
    setLoading(true);
    try {
      const response = await api.post('/agents/predict', { input: text });
      setAnalysisResult(response.data);
    } catch (error) {
      console.error('Error getting prediction:', error);
      alert('Erro ao obter predição');
    } finally {
      setLoading(false);
    }
  };

  const handleCalculate = async () => {
    const numberArray = numbers.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
    if (numberArray.length === 0) return;
    
    setLoading(true);
    try {
      const response = await api.post('/agents/calculate', { 
        numbers: numberArray, 
        operation 
      });
      setAnalysisResult(response.data);
    } catch (error) {
      console.error('Error calculating:', error);
      alert('Erro ao calcular');
    } finally {
      setLoading(false);
    }
  };

  const handleCollaborativeAnalysis = async () => {
    if (!text.trim()) return;
    
    setLoading(true);
    try {
      const response = await api.post('/agents/collaborative', { text });
      setAnalysisResult(response.data);
    } catch (error) {
      console.error('Error in collaborative analysis:', error);
      alert('Erro na análise colaborativa');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    navigate('/', { replace: true });
  };

  return (
    <div className="agents-container">
      <header className="agents-header">
        <h1>Agentes de IA</h1>
        <button onClick={handleLogout} className="logout-btn">Sair</button>
      </header>

      <div className="agents-content">
        <div className="agents-section">
          <h2>Análise de Texto</h2>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Digite um texto para análise..."
            rows={4}
          />
          <div className="button-group">
            <button onClick={handleTextAnalysis} disabled={loading}>
              {loading ? 'Analisando...' : 'Analisar Texto'}
            </button>
            <button onClick={handlePrediction} disabled={loading}>
              {loading ? 'Processando...' : 'Obter Predição'}
            </button>
            <button onClick={handleCollaborativeAnalysis} disabled={loading}>
              {loading ? 'Analisando...' : 'Análise Colaborativa'}
            </button>
          </div>
        </div>

        <div className="agents-section">
          <h2>Cálculos Estatísticos</h2>
          <input
            type="text"
            value={numbers}
            onChange={(e) => setNumbers(e.target.value)}
            placeholder="Digite números separados por vírgula (ex: 1,2,3,4,5)"
          />
          <select value={operation} onChange={(e) => setOperation(e.target.value)}>
            <option value="sum">Soma</option>
            <option value="mean">Média</option>
            <option value="median">Mediana</option>
            <option value="std">Desvio Padrão</option>
          </select>
          <button onClick={handleCalculate} disabled={loading}>
            {loading ? 'Calculando...' : 'Calcular'}
          </button>
        </div>

        {analysisResult && (
          <div className="results-section">
            <h2>Resultados</h2>
            <pre>{JSON.stringify(analysisResult, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
} 