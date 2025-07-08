# Sistema de Agentes de IA com Análise Financeira

Este projeto implementa um sistema completo de agentes de IA que fornecem análises de texto, cálculos estatísticos e **dicas financeiras personalizadas**.

##  Funcionalidades

### Análise de Texto
- Análise detalhada de textos com métricas estatísticas
- Colaboração entre agentes para análise mais profunda
- Predições baseadas em IA

### Cálculos Estatísticos
- Soma, média, mediana e desvio padrão
- Processamento de arrays numéricos
- Resultados formatados e organizados

### **NOVA: Análise Financeira**
- **Dados Financeiros**: Insira sua renda, despesas, poupanças e dívidas
- **Descrição Textual**: Descreva sua situação financeira
- **Dicas Personalizadas**: Receba conselhos específicos baseados em IA
- **Métricas Financeiras**: Análise de indicadores como taxa de poupança, ratio de despesas, etc.

## Arquitetura

### Backend (NestJS)
- **Porta**: 3000
- **Agentes**: 
  - Agent1-IA (Porta 5000): Análise de texto
  - Agent2-IA (Porta 5001): Cálculos estatísticos
  - **Finance Agent (Porta 5002)**: Análise financeira

### Frontend (React + TypeScript)
- **Porta**: 5173
- Interface moderna e responsiva
- Cards organizados para resultados
- Formulários intuitivos para dados financeiros

## Instalação e Execução

### 1. Instalar Dependências
```bash
cd backend
npm install

cd frontend
npm install
```

### 2. Iniciar Agentes de IA
```bash
chmod +x start-agents.sh
./start-agents.sh
```

### 3. Iniciar Backend
```bash
cd backend
npm run start:dev
```

### 4. Iniciar Frontend
```bash
cd frontend
npm run dev
```

## Como Usar a Análise Financeira

### Opção 1: Dados Numéricos
1. Acesse a seção "Análise Financeira"
2. Preencha os campos:
   - **Renda Mensal**: Seu salário ou renda mensal
   - **Despesas Mensais**: Total de gastos mensais
   - **Total de Poupanças**: Dinheiro guardado
   - **Total de Dívidas**: Empréstimos, cartões, etc.
3. Clique em "Obter Dicas Financeiras"

### Opção 2: Descrição Textual
1. Na mesma seção, use o campo de texto
2. Descreva sua situação financeira
3. Exemplo: "Tenho dificuldade para economizar, gasto muito com cartão de crédito"
4. Clique em "Obter Dicas Financeiras"

### Resultados Esperados
- **Métricas Financeiras**: Taxa de poupança, ratio de despesas, etc.
- **Conselhos Personalizados**: Dicas específicas baseadas em IA
- **Dicas Gerais**: Recomendações práticas para melhorar suas finanças

## Exemplo de Uso

### Input:
```json
{
  "monthly_income": 5000,
  "monthly_expenses": 3500,
  "total_savings": 8000,
  "total_debt": 12000
}
```

### Output:
- **Taxa de Poupança**: 30%
- **Ratio de Despesas**: 70%
- **Ratio de Dívidas**: 240%
- **Meses de Fundo de Emergência**: 2.3

### Dicas Geradas:
1. Considere consolidar dívidas com taxas menores
2. Não gaste mais que 50% da sua renda em necessidades básicas
3. Automatize suas economias mensais

## Configuração de Variáveis de Ambiente

Crie um arquivo `.env` no backend:

```env
AGENT1_URL=http://localhost:5000
AGENT2_URL=http://localhost:5001
FINANCE_AGENT_URL=http://localhost:5002
```

## Interface

A interface foi redesenhada com:
- **Menu moderno** na Home com animações
- **Cards organizados** para resultados
- **Seção financeira** dedicada
- **Dicas visuais** com ícones e cores
- **Layout responsivo** para mobile

## Próximos Passos

- [ ] Integração com APIs de dados financeiros reais
- [ ] Histórico de análises
- [ ] Metas financeiras e acompanhamento
- [ ] Alertas e notificações
- [ ] Exportação de relatórios

## Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. 