echo "Iniciando Agente Financeiro..."

cd my_finance_agents

if [ ! -d "venv" ]; then
    echo "Criando ambiente virtual..."
    python -m venv venv
fi

source venv/bin/activate

echo "Instalando dependências..."
pip install -r requirements.txt

echo "Iniciando agente financeiro na porta 5002..."
python app.py 