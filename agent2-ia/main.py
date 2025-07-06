from flask import Flask, request, jsonify
import statistics
import re
import os

app = Flask(__name__)

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy', 'agent': 'agent2-ia'})

@app.route('/process', methods=['POST'])
def process_data():
    try:
        data = request.get_json()
        text = data.get('text', '')
        from_agent = data.get('from_agent', 'unknown')
        
        if not text:
            return jsonify({'error': 'Text is required'}), 400
        
        words = text.split()
        word_lengths = [len(word) for word in words]
        
        stats = {
            'total_words': len(words),
            'avg_word_length': statistics.mean(word_lengths) if word_lengths else 0,
            'max_word_length': max(word_lengths) if word_lengths else 0,
            'min_word_length': min(word_lengths) if word_lengths else 0,
            'sentence_count': len(re.split(r'[.!?]+', text)),
            'unique_words': len(set(words))
        }
        
        complexity_score = calculate_complexity(text)
        
        result = {
            'agent': 'agent2-ia',
            'from_agent': from_agent,
            'statistical_analysis': stats,
            'complexity_score': complexity_score,
            'processing_type': 'statistical_analysis'
        }
        
        return jsonify(result)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/calculate', methods=['POST'])
def calculate():
    try:
        data = request.get_json()
        numbers = data.get('numbers', [])
        operation = data.get('operation', 'sum')
        
        if not numbers:
            return jsonify({'error': 'Numbers array is required'}), 400
        
        if operation == 'sum':
            result = sum(numbers)
        elif operation == 'mean':
            result = statistics.mean(numbers)
        elif operation == 'median':
            result = statistics.median(numbers)
        elif operation == 'std':
            result = statistics.stdev(numbers) if len(numbers) > 1 else 0
        else:
            return jsonify({'error': 'Invalid operation'}), 400
        
        return jsonify({
            'agent': 'agent2-ia',
            'operation': operation,
            'numbers': numbers,
            'result': result
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def calculate_complexity(text):
    """Calcula um score de complexidade do texto"""
    words = text.split()
    if not words:
        return 0
    
    avg_word_length = statistics.mean([len(word) for word in words])
    unique_ratio = len(set(words)) / len(words)
    sentence_count = len(re.split(r'[.!?]+', text))
    
    complexity = (avg_word_length * 10 + unique_ratio * 50 + sentence_count * 2) / 3
    return min(100, max(0, complexity))

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5001))
    app.run(host='0.0.0.0', port=port, debug=True) 