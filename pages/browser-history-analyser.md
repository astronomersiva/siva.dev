title: Browser History Analyser  
date: June, 2015
description: Fetch your most visited sites and plot a graph.  
tags: Python, matplotlib  
order: 1    

I wanted to write a Python script to analyse my browsing history and view the most visited sites.

I wrote a Python script to do this and used matplotlib to plot the visited sites as a graph.

Initially, I had to figure out a way to access the browser history from the Python script and [this blog](http://digital-forensics.sans.org/blog/2010/01/21/google-chrome-forensics/) proved to be a great reference. After using the sqllite3 package to access the browser history, I used the urlparse package to get the website's name.

![](https://raw.githubusercontent.com/astronomersiva/SnoopMyself/master/sample.png){}

<button type="button" class="btn btn-info ">[View on Github](https://github.com/astronomersiva/SnoopMyself)</button>
<script src="https://gist.github.com/astronomersiva/c5597d14059b09865fb2.js"></script>