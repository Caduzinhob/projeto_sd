import requests
import json

def test_finance_agent():
    base_url = "http://localhost:5002"
    
    try:
        health_response = requests.get(f"{base_url}/health")
        print("Health check:", health_response.json())
    except Exception as e:
        print("Health check failed:", e)
        return False
    
    test_data = {
        "monthly_income": 5000,
        "monthly_expenses": 3500,
        "total_savings": 8000,
        "total_debt": 12000
    }
    
    try:
        analyze_response = requests.post(f"{base_url}/analyze", json=test_data)
        print("Analysis:", analyze_response.json())
    except Exception as e:
        print("Analysis failed:", e)
        return False
    
    try:
        advice_response = requests.post(f"{base_url}/advise", json=test_data)
        print("Advice:", advice_response.json())
    except Exception as e:
        print("Advice failed:", e)
        return False
    
    return True

if __name__ == "__main__":
    print("Testing Finance Agent...")
    success = test_finance_agent()
    if success:
        print("Finance Agent is working correctly!")
    else:
        print("Finance Agent has issues!") 