from flask import Flask, render_template, request, redirect, url_for, flash
WEBHOOK_LISTEN = "0.0.0.0"

app = Flask(__name__)


@app.route('/')
def index_page():
    return render_template('index.html')



if __name__ == '__main__':
    app.run(debug=True, host=WEBHOOK_LISTEN)
