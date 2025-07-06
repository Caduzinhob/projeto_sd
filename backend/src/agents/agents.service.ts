import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AgentsService {
  private readonly agent1Url = process.env.AGENT1_URL || 'http://localhost:5000';
  private readonly agent2Url = process.env.AGENT2_URL || 'http://localhost:5001';

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

  async getAgentsHealth() {
    try {
      const [agent1Health, agent2Health] = await Promise.allSettled([
        axios.get(`${this.agent1Url}/health`),
        axios.get(`${this.agent2Url}/health`)
      ]);

      return {
        agent1: agent1Health.status === 'fulfilled' ? agent1Health.value.data : { status: 'unhealthy' },
        agent2: agent2Health.status === 'fulfilled' ? agent2Health.value.data : { status: 'unhealthy' },
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      throw new HttpException(
        `Error checking agents health: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
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