from flask import render_template
from flask import Flask
from flask_flatpages import FlatPages
from flask_frozen import Freezer
from flask_static_compress import FlaskStaticCompress

DEBUG = True
FLATPAGES_AUTO_RELOAD = DEBUG
FLATPAGES_EXTENSION = '.md'

a = Flask(__name__)
a.config.from_object(__name__)
pages = FlatPages(a)
freezer = Freezer(a)
compress = FlaskStaticCompress(a)

FREEZER_RELATIVE_URLS = True

@a.route('/')
@a.route('/index')
@a.route('/index/')
def index():
    return render_template("index.html", pages=pages)

@a.route('/about')
@a.route('/about/')
def about():
    return render_template("about.html")

@a.route('/<path:path>')
@a.route('/<path:path>/')
def page(path):
    page = pages.get_or_404(path)
    return render_template("page.html", page=page, pages=pages)

@a.route('/tag/<string:tag>')
@a.route('/tag/<string:tag>/')
def tag(tag):
    return render_template('tag.html', pages=pages, tag=tag)

@a.route('/404.html')
def handle_404():
    return render_template('404.html')

@a.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404

if __name__ == "__main__":
    freezer.freeze()
    a.run(debug = True, host = '0.0.0.0')
