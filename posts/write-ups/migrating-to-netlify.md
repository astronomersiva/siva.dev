---
title: Migrating to Netlify from Github Pages
date: September, 2018
description: Faster TTFB with zero downtime
code: true
tags: General
order: 32
imagesToPreload: /static/images/webpagetest-after.png,/static/images/webpagetest-before.png
---

I recently worked on improving the Lighthouse score of this site. After performing numerous
optimisations that I will eventually write about, the score came to 98. The reason for those
2 missing points - Slow initial response time from the server.

Github Pages was taking about 900-1200ms to send the response(TTFB). Initially, I
wasn't sure if this was due to Github Pages itself or Cloudflare so I went around looking for
similar complaints. There were multiple blog articles that pointed out that this could be
because of using a root domain for the site(this site was earlier being served from `https://sivasubramanyam.me`).
Unfortunately, many of those blogs were too old(2014-2016) and I wasn't exactly convinced
that this could be causing such a slow response time.

I have had my eyes on Netlify for a long time and after getting amazed by the TTFBs I saw
on some developers' blogs, I decided to try it out and see if I could get any
improvements. I wanted to make sure that my site didn't go down during this so I tested out
with a subdomain initially.

I set up a subdomain `beta.sivasubramanyam.me` and started measuring the TTFB. It was around
200-400ms with a few occasional spikes in the order of 800ms. This seeemed exciting! I had never
seen response times below 600ms in GH Pages(600ms was very rare) and the other features offered
by Netlify were also attractive. I cross-checked on webpagetest.org and verified
that this difference was actually real. The TTFB came down from around 0.9s to 0.16s.
It was time to move!

#### **Before**

::: lazy-image src="/static/images/lowres/webpagetest-before.png" alt="Before" :::

#### **After**

::: lazy-image src="/static/images/lowres/webpagetest-after.png" alt="After" :::

I set up a CNAME for the subdomain `www` aliasing it to Netlify. After it was provisioned with
SSL, I set up a 301 permanent redirect from the root domain to the www subdomain. This ensured that
the existing links kept working. After this, I removed the CNAME file in my Github repo and
disabled deploying from there. 

An added benefit I got out of this was that, I no longer have to commit the `build` directory
to the website repo. I use a non-standard build mechanism to build this site(more on this later)
and this meant I had to commit the build folder and use that to deploy to Github Pages. With
Netlify, this was no longer necessary!

I would really recommend Netlify for hosting static sites like this. The features and the
performance provided by them is amazing especially when you consider the fact that they are a
free service.
