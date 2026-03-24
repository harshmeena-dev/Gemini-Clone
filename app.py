from flask import Flask, render_template, request, jsonify
from AI import GeminiChat

chat = GeminiChat()

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        # This receives the JSON string you sent via fetch
        data = request.get_json()
        
        # Access the key "user_input" you defined in JS
        user_prompt = data.get('user_input')
        
        response=chat.send(user_prompt)

        return jsonify({"response":response})
    return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True, port=8888)
