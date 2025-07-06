echo "Iniciando Agentes de IA..."

create_venv() {
    local agent_dir=$1
    echo "Criando ambiente virtual para $agent_dir..."
    cd $agent_dir
    python -m venv venv
    echo "Ambiente virtual criado para $agent_dir"
    cd ..
}

install_deps() {
    local agent_dir=$1
    echo "Instalando dependências para $agent_dir..."
    cd $agent_dir
    source venv/bin/activate
    pip install -r requirements.txt
    echo "Dependências instaladas para $agent_dir"
    cd ..
}

run_agent() {
    local agent_dir=$1
    local port=$2
    echo "Iniciando $agent_dir na porta $port..."
    cd $agent_dir
    source venv/bin/activate
    python main.py &
    echo "$agent_dir iniciado na porta $port"
    cd ..
}

if ! command -v python &> /dev/null; then
    echo "Python não encontrado. Instale Python 3.10+ primeiro."
    exit 1
fi

if [ ! -d "agent1-ia/venv" ]; then
    create_venv "agent1-ia"
fi

if [ ! -d "agent2-ia/venv" ]; then
    create_venv "agent2-ia"
fi

install_deps "agent1-ia"
install_deps "agent2-ia"

run_agent "agent1-ia" 5000
run_agent "agent2-ia" 5001

echo ""
echo "🎉 Agentes iniciados com sucesso!"
echo "📊 Agente 1: http://localhost:5000"
echo "📊 Agente 2: http://localhost:5001"
echo ""
echo "Para parar os agentes, pressione Ctrl+C"
echo ""

wait 