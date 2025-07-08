import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Agents.css';

interface AnalysisResult {
  success: boolean;
  data: any;
  timestamp: string;
}

interface FinancialData {
  monthly_income: number;
  monthly_expenses: number;
  total_savings: number;
  total_debt: number;
}

export default function Agents() {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [numbers, setNumbers] = useState('');
  const [operation, setOperation] = useState('sum');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  
  const [financialData, setFinancialData] = useState<FinancialData>({
    monthly_income: 0,
    monthly_expenses: 0,
    total_savings: 0,
    total_debt: 0
  });
  const [financialText, setFinancialText] = useState('');

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

  const handleFinancialAnalysis = async () => {
    const hasFinancialData = financialData.monthly_income > 0 || 
                            financialData.monthly_expenses > 0 || 
                            financialData.total_savings > 0 || 
                            financialData.total_debt > 0;
    
    const hasText = financialText.trim().length > 0;
    
    if (!hasFinancialData && !hasText) {
      alert('Por favor, preencha os dados financeiros ou descreva sua situação financeira');
      return;
    }
    
    setLoading(true);
    try {
      const requestData = {
        ...financialData,
        text: hasText ? financialText : undefined
      };
      
      const response = await api.post('/agents/financial-analysis', requestData);
      setAnalysisResult(response.data);
    } catch (error) {
      console.error('Error in financial analysis:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFinancialDataChange = (field: keyof FinancialData, value: string) => {
    const numValue = parseFloat(value) || 0;
    setFinancialData(prev => ({
      ...prev,
      [field]: numValue
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    navigate('/', { replace: true });
  };

  const renderResultCard = (result: AnalysisResult) => {
    const timestamp = new Date(result.timestamp).toLocaleString('pt-BR');
    
      const formatValue = (value: any): string => {
        console.log(value)
        if (typeof value === 'number') {
          if (Number.isInteger(value)) {
            return value.toLocaleString('pt-BR');
          }
          return value.toLocaleString('pt-BR', { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 4 
          });
        }
        if (typeof value === 'boolean') {
          return value ? 'Sim' : 'Não';
        }
        if (value === null || value === undefined) {
          return 'N/A';
        }
        if (typeof value === 'object' && value !== null) {
          if (Array.isArray(value)) {
            return `[${value.length} itens]`;
          }
          const keys = Object.keys(value);
          if (keys.length === 0) {
            return 'Objeto vazio';
          }
          if (keys.length <= 3) {
            return keys.map(key => `${key}: ${formatValue(value[key])}`).join(', ');
          }
          return `Objeto com ${keys.length} propriedades`;
        }
        return String(value);
      };

    const formatKey = (key: string): string => {
      const keyMap: { [key: string]: string } = {
        'sum': 'Soma Total',
        'mean': 'Média',
        'median': 'Mediana',
        'std': 'Desvio Padrão',
        'min': 'Valor Mínimo',
        'max': 'Valor Máximo',
        'count': 'Quantidade',
        'variance': 'Variância',
        'range': 'Amplitude',
        'prediction': 'Previsão',
        'confidence': 'Confiança',
        'analysis': 'Análise',
        'sentiment': 'Sentimento',
        'keywords': 'Palavras-chave',
        'summary': 'Resumo',
        'recommendation': 'Recomendação',
        'risk_level': 'Nível de Risco',
        'score': 'Pontuação',
        'percentage': 'Porcentagem',
        'trend': 'Tendência',
        'result': 'Resultado',
        'value': 'Valor',
        'data': 'Dados',
        'text': 'Texto',
        'numbers': 'Números',
        'operation': 'Operação',
        'input': 'Entrada',
        'output': 'Saída',
        'agent': 'Agente',
        'agent2_collaboration': 'Colaboração do Agente 2',
        'complexity_score': 'Pontuação de Complexidade',
        'from_agent': 'Do Agente',
        'processing_type': 'Tipo de Processamento',
        'statistical_analysis': 'Análise Estatística',
        'avg_word_length': 'Comprimento Médio das Palavras',
        'max_word_length': 'Comprimento Máximo das Palavras',
        'min_word_length': 'Comprimento Mínimo das Palavras',
        'sentence_count': 'Número de Frases',
        'total_words': 'Total de Palavras',
        'unique_words': 'Palavras Únicas',
        'text_analysis': 'Análise de Texto',
        'char_count': 'Contagem de Caracteres',
        'text_length': 'Comprimento do Texto',
        'word_count': 'Contagem de Palavras',
        'financial_metrics': 'Métricas Financeiras',
        'financial_advice': 'Conselhos Financeiros',
        'financial_tips': 'Dicas Financeiras',
        'input_data': 'Dados de Entrada',
        'analysis_type': 'Tipo de Análise'
      };
      
      return keyMap[key.toLowerCase()] || key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    };

    const getResultType = (data: any): string => {
      if (typeof data === 'number') return 'number';
      if (typeof data === 'string') return 'text';
      if (Array.isArray(data)) return 'array';
      if (typeof data === 'object' && data !== null) return 'object';
      return 'simple';
    };

    const renderNestedSection = (title: string, data: any, icon: string) => {
      return (
        <div className="nested-section">
          <div className="section-title">
            <span className="section-icon">{icon}</span>
            <h4>{formatKey(title)}</h4>
          </div>
          <div className="section-content">
            {Object.entries(data).map(([key, value]) => (
              <div key={key} className="data-item">
                <span className="data-label">{formatKey(key)}</span>
                <span className={`data-value ${typeof value === 'number' ? 'numeric' : 'text'}`}>
                  {formatValue(value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    };

    const resultType = getResultType(result.data);

    return (
      <div className="result-card">
        <div className="result-header">
          <div className="result-icon">
            {resultType === 'number' ? '🔢' : 
             resultType === 'text' ? '📝' : 
             resultType === 'array' ? '📊' : 
             resultType === 'object' ? '📋' : '📄'}
          </div>
          <div className="result-info">
            <h3>
              {resultType === 'number' ? 'Cálculo Realizado' :
               resultType === 'text' ? 'Análise de Texto' :
               resultType === 'array' ? 'Lista de Resultados' :
               resultType === 'object' ? 'Análise Detalhada' : 'Resultado'}
            </h3>
            <span className="result-timestamp">{timestamp}</span>
          </div>
          <div className={`result-status ${result.success ? 'success' : 'error'}`}>
            {result.success ? 'Sucesso' : 'Erro'}
          </div>
        </div>
        
        <div className="result-content">
          {result.success ? (
            <div className="result-data">
              {resultType === 'object' ? (
                <div className="complex-data-grid">
                  {result.data.agent && (
                    <div className="data-item main-agent">
                      <span className="data-label">Agente Responsável</span>
                      <span className="data-value agent-name">{result.data.agent}</span>
                    </div>
                  )}

                  {result.data.text_analysis && (
                    renderNestedSection('text_analysis', result.data.text_analysis, '📝')
                  )}

                  {result.data.financial_metrics && (
                    renderNestedSection('financial_metrics', result.data.financial_metrics, '💰')
                  )}

                  {result.data.financial_advice && (
                    <div className="nested-section advice-section">
                      <div className="section-title">
                        <span className="section-icon">💡</span>
                        <h4>Conselhos Financeiros</h4>
                      </div>
                      <div className="advice-content">
                        <p className="advice-text">{result.data.financial_advice}</p>
                      </div>
                    </div>
                  )}

                  {result.data.financial_tips && Array.isArray(result.data.financial_tips) && (
                    <div className="nested-section tips-section">
                      <div className="section-title">
                        <span className="section-icon">🎯</span>
                        <h4>Dicas Financeiras</h4>
                      </div>
                      <div className="tips-grid">
                        {result.data.financial_tips.map((tip: string, index: number) => (
                          <div key={index} className="tip-item">
                            <span className="tip-number">#{index + 1}</span>
                            <span className="tip-text">{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {result.data.agent2_collaboration && (
                    <div className="nested-section collaboration">
                      <div className="section-title">
                        <span className="section-icon">🤝</span>
                        <h4>Colaboração do Agente 2</h4>
                      </div>
                      <div className="collaboration-content">
                        <div className="collaboration-info">
                          <div className="data-item">
                            <span className="data-label">Agente</span>
                            <span className="data-value">{result.data.agent2_collaboration.agent}</span>
                          </div>
                          <div className="data-item">
                            <span className="data-label">Do Agente</span>
                            <span className="data-value">{result.data.agent2_collaboration.from_agent}</span>
                          </div>
                          <div className="data-item">
                            <span className="data-label">Tipo de Processamento</span>
                            <span className="data-value">{formatKey(result.data.agent2_collaboration.processing_type)}</span>
                          </div>
                          <div className="data-item">
                            <span className="data-label">Pontuação de Complexidade</span>
                            <span className="data-value numeric">{formatValue(result.data.agent2_collaboration.complexity_score)}</span>
                          </div>
                        </div>

                        {result.data.agent2_collaboration.statistical_analysis && (
                          renderNestedSection('statistical_analysis', result.data.agent2_collaboration.statistical_analysis, '📊')
                        )}
                      </div>
                    </div>
                  )}

                  {Object.entries(result.data).map(([key, value]) => {
                    if (['agent', 'text_analysis', 'agent2_collaboration', 'financial_metrics', 'financial_advice', 'financial_tips'].includes(key)) {
                      return null;
                    }
                    
                    if (typeof value === 'object' && value !== null) {
                      return renderNestedSection(key, value, '📋');
                    }
                    
                    return (
                      <div key={key} className="data-item">
                        <span className="data-label">{formatKey(key)}</span>
                        <span className={`data-value ${typeof value === 'number' ? 'numeric' : 'text'}`}>
                          {formatValue(value)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ) : resultType === 'array' ? (
                <div className="array-result">
                  <h4>Resultados ({result.data.length} itens)</h4>
                  <div className="array-grid">
                    {result.data.map((item: any, index: number) => (
                      <div key={index} className="array-item">
                        <span className="array-index">#{index + 1}</span>
                        <span className="array-value">{formatValue(item)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : resultType === 'number' ? (
                <div className="numeric-result">
                  <div className="numeric-display">
                    <span className="numeric-value">{formatValue(result.data)}</span>
                    {result.data > 0 && (
                      <span className="numeric-indicator positive">📈</span>
                    )}
                    {result.data < 0 && (
                      <span className="numeric-indicator negative">📉</span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-result">
                  <div className="text-content">
                    <span className="text-value">{formatValue(result.data)}</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="error-message">
              <span>Erro na análise. Tente novamente.</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="agents-container">
      <header className="agents-header">
        <div style={{display: "flex", alignItems: "start", justifyContent:"start", flexDirection:"column", gap: "0.6rem"}}>
          <h1>Agentes de IA</h1>
          <p>Análise inteligente e previsões financeiras</p>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          <span className="btn-icon">🚪</span>
          Sair
        </button>
      </header>

      <div className="agents-content">
        <div className="agents-grid">
          <div className="agents-section">
            <div className="section-header">
              <div className="section-icon">📝</div>
              <h2>Análise de Texto</h2>
            </div>
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem"}}>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Digite um texto para análise"
                rows={4}
                className="text-input"
              />
                <button 
                  onClick={handleTextAnalysis} 
                  disabled={loading}
                  className="action-btn primary"
                  style={{width: "100%"}}
                >
                  {loading ? 'Analisando...' : 'Analisar Texto'}
                </button>
            </div>
          </div>

          <div className="agents-section">
            <div className="section-header">
              <div className="section-icon">🧮</div>
              <h2>Cálculos Estatísticos</h2>
            </div>
            <div className="section-content">
              <input
                type="text"
                value={numbers}
                onChange={(e) => setNumbers(e.target.value)}
                placeholder="Digite números separados por vírgula (ex: 1,2,3,4,5)"
                className="number-input"
              />
              <div className="select-wrapper">
                <select 
                  value={operation} 
                  onChange={(e) => setOperation(e.target.value)}
                  className="operation-select"
                >
                  <option value="sum">Soma</option>
                  <option value="mean">Média</option>
                  <option value="median">Mediana</option>
                  <option value="std">Desvio Padrão</option>
                </select>
              </div>
              <button 
                onClick={handleCalculate} 
                disabled={loading}
                className="action-btn primary"
              >
                {loading ? 'Calculando...' : 'Calcular'}
              </button>
            </div>
          </div>

          <div className="agents-section financial-section">
            <div className="section-header">
              <div className="section-icon">💰</div>
              <h2>Análise Financeira</h2>
            </div>
            <div className="section-content">
              <div className="financial-inputs">
                <div className="input-group">
                  <label>Renda Mensal (R$)</label>
                  <input
                    type="number"
                    value={financialData.monthly_income || ''}
                    onChange={(e) => handleFinancialDataChange('monthly_income', e.target.value)}
                    placeholder="5000"
                    className="financial-input"
                  />
                </div>
                <div className="input-group">
                  <label>Despesas Mensais (R$)</label>
                  <input
                    type="number"
                    value={financialData.monthly_expenses || ''}
                    onChange={(e) => handleFinancialDataChange('monthly_expenses', e.target.value)}
                    placeholder="3000"
                    className="financial-input"
                  />
                </div>
                <div className="input-group">
                  <label>Total de Poupanças (R$)</label>
                  <input
                    type="number"
                    value={financialData.total_savings || ''}
                    onChange={(e) => handleFinancialDataChange('total_savings', e.target.value)}
                    placeholder="10000"
                    className="financial-input"
                  />
                </div>
                <div className="input-group">
                  <label>Total de Dívidas (R$)</label>
                  <input
                    type="number"
                    value={financialData.total_debt || ''}
                    onChange={(e) => handleFinancialDataChange('total_debt', e.target.value)}
                    placeholder="5000"
                    className="financial-input"
                  />
                </div>
              </div>
              
              <div className="text-input-group">
                <label>Descreva sua situação financeira (opcional)</label>
                <textarea
                  value={financialText}
                  onChange={(e) => setFinancialText(e.target.value)}
                  placeholder="Ex: Tenho dificuldade para economizar, gasto muito com cartão de crédito..."
                  rows={3}
                  className="text-input"
                />
              </div>
              
              <button 
                onClick={handleFinancialAnalysis} 
                disabled={loading}
                className="action-btn primary financial-btn"
              >
                {loading ? 'Analisando...' : 'Obter Dicas Financeiras'}
              </button>
            </div>
          </div>
        </div>

        {analysisResult && (
          <div className="results-section">
            <div className="results-header">
              <h2>Resultados da Análise</h2>
              <button 
                onClick={() => setAnalysisResult(null)}
                className="clear-btn"
              >
                ✕ Limpar
              </button>
            </div>
            {renderResultCard(analysisResult)}
          </div>
        )}

        {loading && (
          <div className="loading-overlay">
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Processando análise...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 