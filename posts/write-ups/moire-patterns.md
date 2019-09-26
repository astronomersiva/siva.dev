---
title: Moiré Patterns
date: March, 2019
description: Do not see this if you are prone to motion sickness
tags: General, JavaScript, Art
code: true
order: 38
special: interactive
featured: true
relatedPosts: 43, 40, 39, 36
---

I recently came across this [tweet](https://twitter.com/Rainmaker1973/status/1103631346633707523)
where I learnt of Moiré Pattern.

**Warning: Please do not see the GIF if you suffer from motion sickness**

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">A moiré pattern is a large-scale interference pattern that can be produced when an opaque ruled pattern with transparent gaps is overlaid on another similar pattern <a href="https://t.co/7bfY5NXaWz">https://t.co/7bfY5NXaWz</a> [source of the gif: <a href="https://t.co/svcCgIrbsL">https://t.co/svcCgIrbsL</a> ] <a href="https://t.co/YEMh3it0mp">pic.twitter.com/YEMh3it0mp</a></p>&mdash; Massimo (@Rainmaker1973) <a href="https://twitter.com/Rainmaker1973/status/1103631346633707523?ref_src=twsrc%5Etfw">March 7, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<br>

This is essentially a pattern caused when a layer `A` containing
some opaque and transparent regions is superimposed on another layer `B` with a similar pattern.

The beauty of this is that, when the layers `A` and `B` are at superimposed without any rotation
or displacement, there won't be any Moiré effect. But when the layers have some rotation or
displacement, the patterns keep changing and produce some interesting effects. 

When I read about this, it struck me! Even though I had never heard of this effect till then,
I had come across practical implications of this so often!

Have you ever noticed how striped shirts look weird on TV? That's because of Moiré patterns!
This is because of the shirts' stripes interfering with the scan lines of a television. This is
more pronounced when the person is moving(leading to displacement and/or rotation).

In printing, the colored dots are often placed strategically to avoid Moiré effect.

::: lazy-image src="/static/images/lowres/halftone.jpg" alt="Half Tone" :::

<small>^By derivative work: <a href="//commons.wikimedia.org/wiki/User:Pbroks13" title="User:Pbroks13">Pbroks13</a> (<a href="//commons.wikimedia.org/wiki/User_talk:Pbroks13" title="User talk:Pbroks13"><span class="signature-talk">talk</span></a>)<a href="//commons.wikimedia.org/wiki/File:Halftoningcolor.png" title="File:Halftoningcolor.png">Halftoningcolor.png</a>: <a href="//commons.wikimedia.org/w/index.php?title=User:Slippens&amp;action=edit&amp;redlink=1" class="new" title="User:Slippens (page does not exist)">Slippens</a> - <a href="//commons.wikimedia.org/wiki/File:Halftoningcolor.png" title="File:Halftoningcolor.png">Halftoningcolor.png</a>, Public Domain, <a href="https://commons.wikimedia.org/w/index.php?curid=5656963">Link</a></small>


I wanted to try creating some of these patterns on my own. I put together
some Moiré pattern generators using some simple canvas and CSS techniques.

**Please do not continue if you suffer from motion sickness**

### Moiré Patterns with Dots

::: include moire-dots.html :::

<br>
<br>

### Moiré Patterns with Triangles

::: include moire-triangles.html :::
