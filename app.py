from flask import Flask, render_template, request, redirect, url_for, flash, jsonify

app = Flask(__name__)
app.config['SECRET_KEY'] = "893728917hiudkajsh9812"


@app.route('/index', methods=['GET', 'POST'])
@app.route('/', methods=['GET', 'POST'])
def index():
    return render_template('index.html') 


if __name__ == '__main__':
    app.run(debug=False)
