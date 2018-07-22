from flask import render_template
from flask import Flask
from flask_flatpages import FlatPages
from flask_frozen import Freezer
from flask_static_compress import FlaskStaticCompress
from flask_htmlmin import HTMLMIN

DEBUG = True
FLATPAGES_AUTO_RELOAD = DEBUG
FLATPAGES_EXTENSION = '.md'

app = Flask(__name__)
app.config.from_object(__name__)
app.config['MINIFY_PAGE'] = True

pages = FlatPages(app)
freezer = Freezer(app)
compress = FlaskStaticCompress(app)
HTMLMIN(app)

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

@app.route('/404.html')
def handle_404():
    return render_template('404.html')

@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

if __name__ == "__main__":
    freezer.freeze()
    app.run(debug = True, host = '0.0.0.0')
