
from flask import Flask, request, jsonify
import requests
import os

app = Flask(__name__)

AGENT2_URL = os.getenv('AGENT2_URL', 'http://localhost:5001')

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy', 'agent': 'agent1-ia'})

@app.route('/analyze', methods=['POST'])
def analyze_text():
    try:
        data = request.get_json()
        text = data.get('text', '')
        
        if not text:
            return jsonify({'error': 'Text is required'}), 400
        
        word_count = len(text.split())
        char_count = len(text)
        
        try:
            response = requests.post(f'{AGENT2_URL}/process', 
                                   json={'text': text, 'from_agent': 'agent1'})
            agent2_result = response.json()
        except requests.RequestException:
            agent2_result = {'error': 'Agent 2 unavailable'}
        
        result = {
            'agent': 'agent1-ia',
            'text_analysis': {
                'word_count': word_count,
                'char_count': char_count,
                'text_length': len(text)
            },
            'agent2_collaboration': agent2_result
        }
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        input_data = data.get('input', '')
        
        prediction = {
            'agent': 'agent1-ia',
            'prediction': f'Prediction for: {input_data}',
            'confidence': 0.85,
            'model': 'text_analyzer_v1'
        }
        
        return jsonify(prediction)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True) 