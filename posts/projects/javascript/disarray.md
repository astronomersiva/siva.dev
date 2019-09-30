---
title: Sonic Disarray
date: September 26, 2019
description: An attempt at making Cubic Disarrays interactive.
tags: General, Art
code: true
draft: true
order: 43
featured: true
special: interactive
relatedPosts: 40, 39, 38, 36
---

I recently came across [this amazing site](https://generativeartistry.com/) by Tim Holman and Ruth John.
While reading their tutorial on creating Cubic Disarrays, I had one of those *I have an idea* moments and
decided to make it interactive by making the displacements a function of the ambient noise.

The Web Audio API provides a way to do this. MDN has a nice [beginner's guide](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API)
on getting started with it.

Here's the end result.

Try whistling, screaming, clapping or just play some
audio on your device and see it respond. You will have to allow this site access your microphone for this
to work.

*Please note that all the audio is processed in your browser and **no data is sent to any servers**, so please be assured that your privacy is not violated in any way because of this.*

**<a class="pointer" role="button" onclick="respondToAmbientNoise()">Start Interaction ▶️</a>**
<canvas></canvas>
<script defer inline src="/static/js/art/disarray.js"></script>
