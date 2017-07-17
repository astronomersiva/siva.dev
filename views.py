from flask import render_template, send_from_directory
from flask import Flask
from flask_flatpages import FlatPages
from flask_frozen import Freezer

DEBUG = True
FLATPAGES_AUTO_RELOAD = DEBUG
FLATPAGES_EXTENSION = '.md'

app = Flask(__name__)
app.config.from_object(__name__)

pages = FlatPages(app)
freezer = Freezer(app)

FREEZER_RELATIVE_URLS = True

@app.route('/')
@app.route('/index')
@app.route('/index/')
def index():
    return render_template("index.html", pages=pages)

@app.route('/about')
@app.route('/about/')
def about():
    return render_template("about.html")

@app.route('/<path:path>')
@app.route('/<path:path>/')
def page(path):
    page = pages.get_or_404(path)
    return render_template("page.html", page=page, pages=pages)

@app.route('/tag/<string:tag>')
@app.route('/tag/<string:tag>/')
def tag(tag):
    return render_template('tag.html', pages=pages, tag=tag)

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

@app.route('/sw.js')
def sw():
    response = send_from_directory('static', 'js/sw.js')
    response.headers['Content-Type'] = 'application/javascript; charset=utf-8'
    return response


if __name__ == "__main__":
	freezer.freeze()
	app.run(debug = True)
