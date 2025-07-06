import asyncio
from flask import Flask, request, jsonify
from agents.financial_analysis_agent import set_finance_input, run_financial_analysis_agent
from agents.financial_advice_agent import run_financial_advice_agent

app = Flask(__name__)

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()
    if not data:
        return jsonify(error="No data provided"), 400

    set_finance_input(data)
    metrics = asyncio.run(run_financial_analysis_agent())
    return jsonify({"metrics": metrics}), 200

@app.route("/advise", methods=["POST"])
def advise():
    data = request.get_json()
    if not data:
        return jsonify(error="No data provided"), 400

    advice = asyncio.run(run_financial_advice_agent())
    return jsonify({"advice": advice}), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)