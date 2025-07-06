import textwrap
from autogen_core import CancellationToken
from autogen_agentchat.agents import AssistantAgent
from autogen_agentchat.messages import TextMessage
from autogen_ext.models.openai import OpenAIChatCompletionClient

model_client = OpenAIChatCompletionClient(
    model="llama3.2:3b",
    base_url="https://9455-191-53-41-230.ngrok-free.app",
    api_key="ollama",
    model_info={"vision": False, "function_calling": True, "json_output": True},
)

_store = {}

def set_finance_input(data: dict):
    """Dados brutos de finanças pessoais"""
    _store.update(data)

async def run_financial_analysis_agent():
    prompt = f"""
Você é um agente de análise financeira pessoal. A partir destes dados,
retorne EM JSON as métricas:
  
savings_rate: total_savings / monthly_income
expense_ratio: monthly_expenses / monthly_income
debt_ratio: total_debt / monthly_income
emergency_fund_months: total_savings / monthly_expenses

Input:
{{
  "monthly_income": {_store.get('monthly_income')},
  "monthly_expenses": {_store.get('monthly_expenses')},
  "total_savings": {_store.get('total_savings')},
  "total_debt": {_store.get('total_debt')}
}}
"""
    agent = AssistantAgent(
        name="FinancialAnalysisAgent",
        description="Calcula métricas financeiras básicas",
        system_message=textwrap.dedent(prompt),
        model_client=model_client,
    )
    resp = await agent.on_messages(
        [TextMessage(content="", source="user")],
        cancellation_token=CancellationToken(),
    )
    metrics_json = resp.chat_message.content.strip()
    _store['metrics'] = metrics_json
    return metrics_json