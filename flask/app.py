from flask import Flask, request, jsonify
from transformers import pipeline
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This allows all domains to access the API (for development purposes)

summarizer = pipeline("summarization")

@app.route('/summarize', methods=['POST'])
def summarize():
    data = request.get_json()
    text = data['text']
    print(text)
    summary = summarizer(text, max_length=250, min_length=30, do_sample=False)
    print()
    print()
    print()
    print(summary)
    return jsonify({'summary': summary[0]['summary_text']})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8081, debug=True)

