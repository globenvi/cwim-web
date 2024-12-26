from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/")
def home():
    return jsonify({"message": "Hello, Flask is running successfully!"})

if __name__ == "__main__":
    # Запускаем сервер на 0.0.0.0:5000
    app.run(host="0.0.0.0", port=5000)
