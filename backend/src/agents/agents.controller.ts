import { Controller, Post, Get, Body, HttpStatus } from '@nestjs/common';
import { AgentsService } from './agents.service';

@Controller('agents')
export class AgentsController {
  constructor(private readonly agentsService: AgentsService) {}

  @Post('analyze')
  async analyzeText(@Body() body: { text: string }) {
    return this.agentsService.analyzeText(body.text);
  }

  @Post('predict')
  async getPrediction(@Body() body: { input: string }) {
    return this.agentsService.getPrediction(body.input);
  }

  @Post('calculate')
  async calculateStatistics(@Body() body: { numbers: number[]; operation?: string }) {
    return this.agentsService.calculateStatistics(body.numbers, body.operation);
  }

  @Post('process')
  async processData(@Body() body: { text: string }) {
    return this.agentsService.processData(body.text);
  }

  @Get('health')
  async getAgentsHealth() {
    return this.agentsService.getAgentsHealth();
  }

  @Post('collaborative')
  async collaborativeAnalysis(@Body() body: { text: string }) {
    return this.agentsService.collaborativeAnalysis(body.text);
  }
} 