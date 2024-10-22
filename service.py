#!/usr/bin/python3

import flask

app = flask.Flask('service')

def read_file(path: str) -> str:
    with open(path, 'r') as f:
        return f.read()
    
@app.errorhandler(404)
def page_not_found(e):
    return read_file("404.html"), 404

@app.route('/index')
def index():
    if 'user' not in flask.request.args:
        return read_file('401.html'), 401

    user = flask.request.args['user']
    if user == 'admin':
        return read_file('index.html'), 200
    
    return read_file('401.html'), 401

@app.route('/test')
def test():
    return read_file('test.html')

@app.route('/potos/<img>')
def get_poto(img):
    with open(f"potos/{img}.gz", "rb") as f:
        file = f.read()
    response = flask.Response(file)
    response.headers["Content-Type"] = "image/png"
    response.headers["Content-Encoding"] = "gzip"
    return response


@app.route('/main.js')
def main_js():
    response = flask.Response(read_file("main.js"))
    response.headers["Content-Type"] = "application/javascript"
    return response

@app.route('/styles.css')
def styles_css():
    response = flask.Response(read_file("styles.css"))
    response.headers["Content-Type"] = "text/css"
    return response

@app.route('/verse')
def verse():
    response = flask.Response(read_file("verse.txt"))
    response.headers["Content-Type"] = "text/plain"
    return response

import os
@app.route('/files')
def files():
    return os.listdir("content")
