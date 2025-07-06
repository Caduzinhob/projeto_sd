import textwrap
from autogen_core import CancellationToken
from autogen_agentchat.agents import AssistantAgent
from autogen_agentchat.messages import TextMessage
from autogen_ext.models.openai import OpenAIChatCompletionClient

from agents.financial_analysis_agent import _store

model_client = OpenAIChatCompletionClient(
    model="llama3.2:3b",
    base_url="https://9455-191-53-41-230.ngrok-free.app",
    api_key="ollama",
    model_info={"vision": False, "function_calling": False, "json_output": False},
)

async def run_financial_advice_agent():
    metrics = _store.get('metrics')
    prompt = f"""
Você é um agente de conselho financeiro pessoal. Recebeu as métricas:
{metrics}

Forneça três recomendações práticas:
1) Como aumentar a taxa de poupança (savings_rate).
2) Como reduzir despesas se expense_ratio > 0.5.
3) Estratégia para diminuir debt_ratio se > 1.0.

Formate como:
1) ...
2) ...
3) ...
"""
    agent = AssistantAgent(
        name="FinancialAdviceAgent",
        description="Gera dicas de finanças pessoais",
        system_message=textwrap.dedent(prompt),
        model_client=model_client,
    )
    resp = await agent.on_messages(
        [TextMessage(content="", source="user")],
        cancellation_token=CancellationToken(),
    )
    advice_text = resp.chat_message.content.strip()
    _store['advice'] = advice_text
    return advice_text