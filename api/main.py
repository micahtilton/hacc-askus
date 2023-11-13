from flask import Flask, request, jsonify
from ai.prompt_injection import is_prompt_injection

app = Flask(__name__)


@app.route('/prompt_injection', methods=['POST'])
def prompt_injection():
    text = request.json.get('text')
    data = {"prompt_injection": is_prompt_injection(text)}
    return jsonify(data)


if __name__ == '__main__':
    app.run(port=8000)