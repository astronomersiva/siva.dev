title: Moving to AWS. The journey.
date: July, 2015
description: How I redesigned my site with Flask and moved it to AWS.
tags: Python, Flask, AWS, General
order: 14

I had started learning Flask and felt that a good way to practice it would be redesigning my site with it. 

It was pretty easy and the documentation was really good. As a Pythonista, I loved it. The only problem I had was that my hosting provider was GoDaddy(a blunder that I committed in my early days) and that meant hosting a Flask app was impossible. Luckily for me, my hosting plan with GoDaddy was going to expire pretty soon and I was looking for other hosting providers. 

I had been given a 100 dollar credit on Amazon Web Services in a hackathon and I decided to give it a try. I host some of my applications on Heroku and I thought migrating completely to AWS might make it a lot simpler and give me more control. Plus, having to setup everything from scratch made it interesting and I was all set for the task.

The initial setup on AWS like installing Apache, Flask were simple.

I just had to run a few commands like 

- `sudo apt-get install apache2 libapache2-mod-wsgi`
- ```
	wget https://bootstrap.pypa.io/get-pip.py
	python get-pip.py
  ```
- `pip install flask`
- `pip install flask-flatpages`

The next step was to get the Flask app up and running with Apache. This is where I ran into some troubles as most tutorials and documentations that I could find online were leading to 500 or 404 errors. I played around for several hours and finally managed to get it to work. These were the steps I followed:

- `sudo su`
- `cd /var/www`
- `git clone urlto://git.repo` (say flaskapp)
- `cd flaskapp`

After this, create a name.wsgi file where name is the name of the file containing the `app = Flask(__name__)` line.

The contents of the name.wsgi file should be as follows:

<pre>
import sys
sys.path.insert(0, '/var/www/flaskapp')

from app import app as application
</pre>

Then, run the following commands:

`cd /etc/apache2/sites-available`

`nano amazonaws.com.conf`

Type the following contents into the amazonaws.com.conf file:

<pre>
NameVirtualHost *:80

&lt;VirtualHost *:80&gt;
        ServerName  'Public DNS of your EC2 Instance'
        WSGIScriptAlias / /var/www/flaskapp/name.wsgi
        &lt;Directory /var/www/flaskapp/&gt;
                Order allow,deny
                Allow from all
        &lt;/Directory&gt;
        ErrorLog ${APACHE_LOG_DIR}/error.log
        LogLevel info
        CustomLog ${APACHE_LOG_DIR}/access.log combined
&lt;/VirtualHost&gt;
</pre>

After this, enable the Flask app by disabling the default Apache page and enabling the newly created one.

- `a2dissite default`
- `a2ensite amazonaws.com.conf`
- `/etc/init.d/apache2 restart`

And voila, the app should now be live and you can access it using your EC2 instance's public DNS.