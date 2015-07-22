title: IPL Flask  
date: June, 2015
description: A simple Flask application to fetch and display cricket scores.   
tags: Python, Flask   
order: 12

I was looking for a quick solution to see cricket scores from my college without having to use proxies. I thought I would design one myself using Python and host it in Heroku. That's how this project was born.

You can check the site [here](http://ipl-flask.sivasubramanyam.me). I kept the design as minimal as possible to avoid attracting any unnecessary attention.

I had to do the following steps to get Flask running on Heroku: installed toolbet.

*   use 'source bin/activate' for swiching to virtualenv in the flask folder
*   use 'which python' to verify
*   use './run.py' to run the app.
*   'pip install BeautifulSoup4'
*   git add all files in the folder except bin, include, lib, local and tmp dirs
*   use git -rm --cached dirname if necessary
*   create requirements.txt file.
*   I used 'pip freeze>requirements.txt'
*   Create Procfile with contents as "web: gunicorn app:app"

<button type="button" class="btn btn-info ">[View on Github](http://github.com/astronomersiva/IPLFlask/)</button>
<script src="https://gist.github.com/astronomersiva/c661cc44997c41d7c4ad.js"></script>