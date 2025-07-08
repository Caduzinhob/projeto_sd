from flask import Flask, request, jsonify
import json
import math

app = Flask(__name__)

@app.route("/health", methods=["GET"])
def health():
    return jsonify({'status': 'healthy', 'agent': 'finance-agent'})

@app.route("/analyze", methods=["POST"])
def analyze():
    try:
        data = request.get_json()
        if not data:
            return jsonify(error="No data provided"), 400

        monthly_income = float(data.get('monthly_income', 0))
        monthly_expenses = float(data.get('monthly_expenses', 0))
        total_savings = float(data.get('total_savings', 0))
        total_debt = float(data.get('total_debt', 0))

        if monthly_income == 0:
            return jsonify(error="Monthly income cannot be zero"), 400

        savings_rate = ((monthly_income - monthly_expenses) / monthly_income) * 100
        expense_ratio = (monthly_expenses / monthly_income) * 100
        debt_ratio = (total_debt / monthly_income) * 100
        emergency_fund_months = total_savings / monthly_expenses if monthly_expenses > 0 else 0

        metrics = {
            "savings_rate": round(savings_rate, 2),
            "expense_ratio": round(expense_ratio, 2),
            "debt_ratio": round(debt_ratio, 2),
            "emergency_fund_months": round(emergency_fund_months, 1)
        }

        return jsonify({"metrics": metrics}), 200
    except Exception as e:
        return jsonify(error=str(e)), 500

@app.route("/advise", methods=["POST"])
def advise():
    try:
        data = request.get_json()
        if not data:
            return jsonify(error="No data provided"), 400

        monthly_income = float(data.get('monthly_income', 0))
        monthly_expenses = float(data.get('monthly_expenses', 0))
        total_savings = float(data.get('total_savings', 0))
        total_debt = float(data.get('total_debt', 0))

        if monthly_income == 0:
            return jsonify(error="Monthly income cannot be zero"), 400

        savings_rate = ((monthly_income - monthly_expenses) / monthly_income) * 100
        debt_ratio = (total_debt / monthly_income) * 100
        emergency_fund_months = total_savings / monthly_expenses if monthly_expenses > 0 else 0

        advice_parts = []

        if savings_rate < 20:
            advice_parts.append("1) Sua taxa de poupança está baixa ({}%). Considere reduzir despesas não essenciais e automatizar suas economias mensais.".format(round(savings_rate, 1)))
        
        if debt_ratio > 100:
            advice_parts.append("2) Seu nível de dívida está alto ({}% da renda). Priorize o pagamento de dívidas com juros altos e considere consolidar dívidas.".format(round(debt_ratio, 1)))
        
        if emergency_fund_months < 3:
            advice_parts.append("3) Seu fundo de emergência está abaixo do recomendado ({} meses). Foque em aumentar suas economias antes de investir.".format(round(emergency_fund_months, 1)))

        if not advice_parts:
            advice_parts = [
                "1) Continue mantendo suas boas práticas financeiras!",
                "2) Considere diversificar seus investimentos.",
                "3) Revise seu orçamento regularmente."
            ]

        advice = "\n".join(advice_parts)

        return jsonify({"advice": advice}), 200
    except Exception as e:
        return jsonify(error=str(e)), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5002, debug=True)