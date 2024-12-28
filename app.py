from flask import Flask

app = Flask(__name__)
app.config['SECRET_KEY'] = "893728917hiudkajsh9812"

@app.route('/')
@app.route('/index', methods=['GET', 'POST'])
def index():
    return "flask app"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=False)