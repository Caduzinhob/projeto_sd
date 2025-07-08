import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AgentsService {
  private readonly agent1Url = process.env.AGENT1_URL || 'http://localhost:5000';
  private readonly agent2Url = process.env.AGENT2_URL || 'http://localhost:5001';
  private readonly financeAgentUrl = process.env.FINANCE_AGENT_URL || 'http://localhost:5002';

  async analyzeText(text: string) {
    try {
      const agent1Response = await axios.post(`${this.agent1Url}/analyze`, {
        text: text
      });

      return {
        success: true,
        data: agent1Response.data,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      throw new HttpException(
        `Error analyzing text: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getPrediction(input: string) {
    try {
      const agent1Response = await axios.post(`${this.agent1Url}/predict`, {
        input: input
      });

      return {
        success: true,
        data: agent1Response.data,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      throw new HttpException(
        `Error getting prediction: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async calculateStatistics(numbers: number[], operation: string = 'sum') {
    try {
      const agent2Response = await axios.post(`${this.agent2Url}/calculate`, {
        numbers: numbers,
        operation: operation
      });

      return {
        success: true,
        data: agent2Response.data,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      throw new HttpException(
        `Error calculating statistics: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async processData(text: string) {
    try {
      const agent2Response = await axios.post(`${this.agent2Url}/process`, {
        text: text,
        from_agent: 'backend'
      });

      return {
        success: true,
        data: agent2Response.data,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      throw new HttpException(
        `Error processing data: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async financialAnalysis(data: {
    monthly_income?: number;
    monthly_expenses?: number;
    total_savings?: number;
    total_debt?: number;
    text?: string;
  }) {
    try {
      if (data.monthly_income || data.monthly_expenses || data.total_savings || data.total_debt) {
        const financeData = {
          monthly_income: data.monthly_income || 0,
          monthly_expenses: data.monthly_expenses || 0,
          total_savings: data.total_savings || 0,
          total_debt: data.total_debt || 0
        };

        try {
          const analysisResponse = await axios.post(`${this.financeAgentUrl}/analyze`, financeData);
          const adviceResponse = await axios.post(`${this.financeAgentUrl}/advise`, financeData);

          return {
            success: true,
            data: {
              agent: 'finance-agent',
              financial_metrics: analysisResponse.data.metrics,
              financial_advice: adviceResponse.data.advice,
              input_data: financeData,
              analysis_type: 'financial_analysis'
            },
            timestamp: new Date().toISOString()
          };
        } catch (financeError) {
          
          const metrics = this.calculateFinancialMetrics(financeData);
          const advice = this.generateFinancialAdvice(financeData);
          
          return {
            success: true,
            data: {
              agent: 'backend-fallback',
              financial_metrics: metrics,
              financial_advice: advice,
              input_data: financeData,
              analysis_type: 'financial_analysis_fallback'
            },
            timestamp: new Date().toISOString()
          };
        }
      }

      if (data.text) {
        try {
          const agent1Response = await axios.post(`${this.agent1Url}/analyze`, {
            text: data.text
          });

          const financialTips = this.generateFinancialTips(data.text);

          return {
            success: true,
            data: {
              agent: 'agent1-ia',
              text_analysis: agent1Response.data,
              financial_tips: financialTips,
              analysis_type: 'text_based_financial'
            },
            timestamp: new Date().toISOString()
          };
        } catch (textError) {
          console.log('Agent1 not available, using text-only analysis');
          
          const financialTips = this.generateFinancialTips(data.text);
          
          return {
            success: true,
            data: {
              agent: 'backend-fallback',
              text_analysis: {
                word_count: data.text.split(' ').length,
                char_count: data.text.length,
                text_length: data.text.length
              },
              financial_tips: financialTips,
              analysis_type: 'text_based_financial_fallback'
            },
            timestamp: new Date().toISOString()
          };
        }
      }

      throw new HttpException(
        'Either financial data or text must be provided',
        HttpStatus.BAD_REQUEST
      );
    } catch (error) {
      console.error('Financial analysis error:', error);
      throw new HttpException(
        `Error in financial analysis: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  private calculateFinancialMetrics(data: {
    monthly_income: number;
    monthly_expenses: number;
    total_savings: number;
    total_debt: number;
  }) {
    const { monthly_income, monthly_expenses, total_savings, total_debt } = data;
    
    if (monthly_income === 0) {
      return {
        error: 'Renda mensal não pode ser zero para calcular métricas'
      };
    }

    const savings_rate = monthly_income > 0 ? ((monthly_income - monthly_expenses) / monthly_income) * 100 : 0;
    const expense_ratio = monthly_income > 0 ? (monthly_expenses / monthly_income) * 100 : 0;
    const debt_ratio = monthly_income > 0 ? (total_debt / monthly_income) * 100 : 0;
    const emergency_fund_months = monthly_expenses > 0 ? total_savings / monthly_expenses : 0;

    return {
      savings_rate: Math.round(savings_rate * 100) / 100,
      expense_ratio: Math.round(expense_ratio * 100) / 100,
      debt_ratio: Math.round(debt_ratio * 100) / 100,
      emergency_fund_months: Math.round(emergency_fund_months * 10) / 10
    };
  }

  private generateFinancialAdvice(data: {
    monthly_income: number;
    monthly_expenses: number;
    total_savings: number;
    total_debt: number;
  }) {
    const { monthly_income, monthly_expenses, total_savings, total_debt } = data;
    const savings_rate = monthly_income > 0 ? ((monthly_income - monthly_expenses) / monthly_income) * 100 : 0;
    const debt_ratio = monthly_income > 0 ? (total_debt / monthly_income) * 100 : 0;
    const emergency_fund_months = monthly_expenses > 0 ? total_savings / monthly_expenses : 0;

    let advice = '';

    if (savings_rate < 20) {
      advice += '1) Sua taxa de poupança está baixa. Considere reduzir despesas não essenciais e automatizar suas economias mensais.\n';
    }

    if (debt_ratio > 100) {
      advice += '2) Seu nível de dívida está alto. Priorize o pagamento de dívidas com juros altos e considere consolidar dívidas.\n';
    }

    if (emergency_fund_months < 3) {
      advice += '3) Seu fundo de emergência está abaixo do recomendado (3-6 meses). Foque em aumentar suas economias antes de investir.\n';
    }

    if (advice === '') {
      advice = '1) Continue mantendo suas boas práticas financeiras!\n2) Considere diversificar seus investimentos.\n3) Revise seu orçamento regularmente.';
    }

    return advice;
  }

  private generateFinancialTips(text: string): string[] {
    const tips: string[] = [];
    const lowerText = text.toLowerCase();

    if (lowerText.includes('investimento') || lowerText.includes('investir')) {
      tips.push('💡 Considere diversificar seus investimentos para reduzir riscos');
      tips.push('📊 Mantenha um fundo de emergência antes de investir');
    }

    if (lowerText.includes('dívida') || lowerText.includes('emprestimo') || lowerText.includes('cartão')) {
      tips.push('🚨 Priorize o pagamento de dívidas com juros altos');
      tips.push('💰 Considere consolidar dívidas com taxas menores');
    }

    if (lowerText.includes('poupança') || lowerText.includes('economizar')) {
      tips.push('🏦 Automatize suas economias mensais');
      tips.push('📈 Aumente gradualmente sua taxa de poupança');
    }

    if (lowerText.includes('gasto') || lowerText.includes('despesa')) {
      tips.push('📋 Mantenha um controle detalhado de suas despesas');
      tips.push('🎯 Identifique e corte gastos desnecessários');
    }

    if (lowerText.includes('renda') || lowerText.includes('salário')) {
      tips.push('💼 Considere fontes de renda adicionais');
      tips.push('📊 Não gaste mais que 50% da sua renda em necessidades básicas');
    }

    if (tips.length === 0) {
      tips.push('💰 Crie um orçamento mensal e siga-o rigorosamente');
      tips.push('🏦 Mantenha um fundo de emergência com 3-6 meses de despesas');
      tips.push('📊 Revise suas finanças regularmente');
      tips.push('🎯 Defina metas financeiras específicas e mensuráveis');
    }

    return tips;
  }

  async getAgentsHealth() {
    try {
      const [agent1Health, agent2Health, financeAgentHealth] = await Promise.allSettled([
        axios.get(`${this.agent1Url}/health`),
        axios.get(`${this.agent2Url}/health`),
        axios.get(`${this.financeAgentUrl}/health`)
      ]);

      return {
        agent1: agent1Health.status === 'fulfilled' ? agent1Health.value.data : { status: 'unhealthy' },
        agent2: agent2Health.status === 'fulfilled' ? agent2Health.value.data : { status: 'unhealthy' },
        financeAgent: financeAgentHealth.status === 'fulfilled' ? financeAgentHealth.value.data : { status: 'unhealthy' },
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Health check error:', error);
      return {
        agent1: { status: 'unhealthy' },
        agent2: { status: 'unhealthy' },
        financeAgent: { status: 'unhealthy' },
        timestamp: new Date().toISOString(),
        error: 'Health check failed'
      };
    }
  }

  async collaborativeAnalysis(text: string) {
    try {
      const [textAnalysis, dataProcessing] = await Promise.all([
        this.analyzeText(text),
        this.processData(text)
      ]);

      return {
        success: true,
        collaborative_result: {
          text_analysis: textAnalysis.data,
          data_processing: dataProcessing.data,
          summary: {
            total_agents: 2,
            analysis_complete: true
          }
        },
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      throw new HttpException(
        `Error in collaborative analysis: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
} 