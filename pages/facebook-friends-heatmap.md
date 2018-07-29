title: Facebook friends heatmap
date: May, 2014
description: A Graph API based Python script to plot your friends' locations as a heatmap.
tags: Python, GraphAPI, Javascript  
order: 6

<object data="../static/FBHeatMap.html" width="600" height="400"><embed src="../static/FBHeatMap.html" width="600" height="400">Error: Embedded data could not be displayed.</object>

Update: Recent changes in Facebook's Graph API have made it impossible to do this now.

I came across a Facebook application that plots one's FB friends' locations as a heatmap on Google Maps. Being the inquisitive geek that I am, I decided to make one myself. I went around learning about the Graph API of Facebook. I soon realised that there was a Python module named Facepy to implement this in Python. Soon, the setup was ready and I ran the code to fetch the location of my friends. I hit my first roadblock. Facebook's privacy settings didn't allow me to fetch the locations. I started to look for some loophole in this. I did a quick Google search and realised that the latest Graph API version(2.0) doesn't allow to do what I was planning to do.

I was almost on the verge on giving up when this thought came to me. If the API doesn't allow this, how on earth did the app I had come across earlier work?? It was already late in the night(the next day morning actually) and I was still thinking about this with Snickers, tea and various other junk food. This is when I realised something very important. Version 2.0 doesn't allow to fetch locations. So, what about the previous ones? I had a breakthrough. I quickly went to the Graph Explorer tool on Facebook to check the access token generation tool. There was a small option near that text field where I could choose the API version. Voila! After a few test runs analysing the format in which the response was, I quickly created a heatmap with Google Maps API.

[[Source on Github]](https://github.com/astronomersiva/Facebook-HeatMap/)
