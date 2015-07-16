title: Scraping heavens-above.com for ISS passes  
date: August, 2014
description: A Python based crawler to fetch and display Internation Space Station pass details for your location
tags: Python, mechanize  
order: 7

I wanted to write a Python script that would scrape Heavens-above.com and post ISS pass details to the Chennai Astronomy Club on Facebook. I did a Google search and found something similar written by [Dr Drang](https://github.com/drdrang/heavens-above). However, the heavens-above site had been modified and the code was not working with the current version. So, I decided to modify the code to fit the current site.

To make it more interesting, I added some weather details fetcher to the code.

<button type="button" class="btn btn-info "><a href="http://github.com/astronomersiva/heavens-above/">View on Github</a></button>
<script src="https://gist.github.com/astronomersiva/7b02868b58cbcc698112.js"></script>