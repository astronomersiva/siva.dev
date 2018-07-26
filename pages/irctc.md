title: IRCTC redefines CAPTCHA 
date: July, 2014
description: Apparently, IRCTC does not know what CAPTCHA is.
tags: General, IRCTC
order: 2


Update: IRCTC has fixed this now.

Recently, I chanced upon the PNR Enquiry site and then noticed this. Their CAPTCHA was copy-pastable!

<div class="ajanta">
  <img
    class="img-responsive center-block pixelated blur"
    src="/static/images/lowres/irctc1.png" 
    alt="copy-pastable captcha"
    data-image-format="jpg">

  <img class="img-responsive center-block original">
</div>

Seriously, wasn't CAPTCHA designed to prevent bots? I went through the source code and I was flattered. The CAPTCHA was basically a random number being overlayed on an image.

<div class="ajanta">
  <img
    class="img-responsive center-block pixelated blur"
    src="/static/images/lowres/irctc2.png" 
    alt="text overlay for a captcha"
    data-image-format="jpg">

  <img class="img-responsive center-block original">
</div>

After spending some more time in the source code, I was shocked. It was not actually a random number. It was 5 random numbers(each for one digit) concatenated together to form a 5 digit number! Wouldn't it be easier and more efficient if a 5 digit number is generated instead? Whoever designed this website deserves an award! Also notice the 'Test' comment tag. I believe someone uploaded a test version of the site which had not been completely designed due to some urgency or it was a silly goofup.

<div class="ajanta">
  <img
    class="img-responsive center-block pixelated blur"
    src="/static/images/lowres/irctc3.png" 
    alt="random number generator test code"
    data-image-format="jpg">

  <img class="img-responsive center-block original">
</div>

As a responsible citizen, I mailed CRIS, the guys responsible for developing and maintaining the IRCTC site. And like most government offices, I am yet to get a reply.

To demonstrate how easy it is to break this so called CAPTCHA, I wrote a Python script using the Selenium module. The results, well, see them for yourself.

<div class="ajanta">
  <img
    class="img-responsive center-block pixelated blur"
    src="/static/images/lowres/irctc5.png" 
    alt="breaking captcha"
    data-image-format="jpg">

  <img class="img-responsive center-block original">
</div>
