from flask import render_template
from flask import Flask
from flask_flatpages import FlatPages

DEBUG = True
FLATPAGES_AUTO_RELOAD = DEBUG
FLATPAGES_EXTENSION = '.md'

a = Flask(__name__)
a.config.from_object(__name__)
pages = FlatPages(a)

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
    return render_template("page.html", page=page)	

@a.route('/tag/<string:tag>')
@a.route('/tag/<string:tag>/')
def tag(tag):
    return render_template('tag.html', pages=pages, tag=tag)
    
if __name__ == "__main__":
	a.run(debug = True)
