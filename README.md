# Sistema de Agentes de IA - Arquitetura Distribuída

Este projeto implementa um sistema de agentes inteligentes com arquitetura distribuída, microserviços e comunicação entre agentes.

## 🏗️ Arquitetura

- **Frontend**: React + TypeScript + React Router
- **Backend**: NestJS + TypeScript + PostgreSQL
- **Agente 1**: Python Flask (Análise de Texto)
- **Agente 2**: Python Flask (Processamento Estatístico)
- **Containerização**: Docker + Docker Compose

## 📋 Pré-requisitos

- Node.js 18+
- Python 3.10+
- Docker e Docker Compose
- PostgreSQL (opcional, já incluído no docker-compose)

## 🚀 Instalação e Execução

### Opção 1: Docker Compose (Recomendado)

1. **Clone o repositório e navegue até a pasta:**
   ```bash
   cd projeto
   ```

2. **Execute todos os serviços:**
   ```bash
   docker-compose up --build
   ```

3. **Acesse as aplicações:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000
   - Agente 1: http://localhost:5000
   - Agente 2: http://localhost:5001

### Opção 2: Execução Manual

#### 1. Backend
```bash
cd backend
npm install
npm run start:dev
```

#### 2. Agente 1
```bash
cd agent1-ia
python -m venv venv
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate
pip install -r requirements.txt
python main.py
```

#### 3. Agente 2
```bash
cd agent2-ia
python -m venv venv
# Windows
venv\Scripts\activate
# Linux/Mac
source venv/bin/activate
pip install -r requirements.txt
python main.py
```

#### 4. Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Backend
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=1695
DB_NAME=banco_dados

# Agentes
AGENT1_URL=http://localhost:5000
AGENT2_URL=http://localhost:5001

# Frontend
VITE_BACKEND=http://localhost:3000/
```

## 📡 Endpoints da API

### Backend (NestJS)
- `POST /agents/analyze` - Análise de texto
- `POST /agents/predict` - Predições
- `POST /agents/calculate` - Cálculos estatísticos
- `POST /agents/process` - Processamento de dados
- `GET /agents/health` - Status dos agentes
- `POST /agents/collaborative` - Análise colaborativa

### Agente 1 (Porta 5000)
- `GET /health` - Status do agente
- `POST /analyze` - Análise de texto
- `POST /predict` - Predições

### Agente 2 (Porta 5001)
- `GET /health` - Status do agente
- `POST /process` - Processamento de dados
- `POST /calculate` - Cálculos estatísticos

## 🎯 Funcionalidades

### ✅ Requisitos Atendidos

1. **Agentes de IA (10 pts)**
   - ✅ Mínimo de dois agentes de IA (3 pts)
   - ✅ Pelo menos um agente containerizado (7 pts)

2. **Comunicação (10 pts)**
   - ✅ Comunicação entre IAs (4 pts)
   - ✅ Microserviços (3 pts)
   - ✅ API na solução (3 pts)

### 🔄 Fluxo de Comunicação

1. **Frontend** → **Backend API** → **Agente 1** → **Agente 2**
2. **Agente 1** pode se comunicar diretamente com **Agente 2**
3. **Backend** orquestra as chamadas e retorna resultados consolidados

## 🧪 Testando o Sistema

1. **Faça login** no frontend (http://localhost:5173)
2. **Acesse a página de Agentes** clicando no botão "Agentes de IA"
3. **Teste as funcionalidades:**
   - Análise de texto
   - Predições
   - Cálculos estatísticos
   - Análise colaborativa

## 📁 Estrutura do Projeto

```
projeto/
├── frontend/                 # React + TypeScript
│   ├── src/
│   │   ├── pages/           # Páginas da aplicação
│   │   ├── components/      # Componentes reutilizáveis
│   │   └── services/        # Serviços HTTP
├── backend/                  # NestJS + TypeScript
│   ├── src/
│   │   ├── agents/          # Módulo de agentes
│   │   ├── auth/            # Autenticação
│   │   └── user/            # Usuários
├── agent1-ia/               # Agente Python Flask
│   ├── main.py
│   ├── requirements.txt
│   └── Dockerfile
├── agent2-ia/               # Agente Python Flask
│   ├── main.py
│   ├── requirements.txt
│   └── Dockerfile
└── docker-compose.yml       # Orquestração dos containers
```

## 🔍 Monitoramento

- **Health Check**: `GET /agents/health` verifica o status de todos os agentes
- **Logs**: Use `docker-compose logs [service]` para ver logs específicos
- **Métricas**: Os agentes retornam timestamps e informações de processamento

## 🛠️ Desenvolvimento

### Adicionando Novos Agentes

1. Crie uma nova pasta `agent3-ia/`
2. Implemente o agente com Flask
3. Adicione ao `docker-compose.yml`
4. Atualize o `AgentsService` no backend

### Modificando Agentes Existentes

1. Edite os arquivos Python nos agentes
2. Rebuild: `docker-compose build [agent-name]`
3. Restart: `docker-compose restart [agent-name]`

## 🚨 Troubleshooting

### Problemas Comuns

1. **Porta já em uso**: Mude as portas no `docker-compose.yml`
2. **Agentes não respondem**: Verifique `docker-compose logs agent1` ou `agent2`
3. **Erro de conexão**: Verifique se todos os serviços estão rodando

### Comandos Úteis

```bash
# Ver logs de todos os serviços
docker-compose logs

# Ver logs de um serviço específico
docker-compose logs backend

# Rebuild e restart
docker-compose down
docker-compose up --build

# Executar apenas um serviço
docker-compose up backend
```

## 📄 Licença

Este projeto é para fins educacionais e de demonstração. 