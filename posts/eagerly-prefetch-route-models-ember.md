---
title: Eagerly prefetching a route's models to make apps faster
date: September, 2018
description: Improving perceived performance in Ember Apps
tags: EmberJS
order: 31
---

**In most cases, there will be a 200-300ms interval between a user hovering on a link and actually clicking it.**

If we use this time to prefetch the target route's model in our Ember applications, the app will feel faster and
users will have a better experience.

Luckily, implementing this in Ember apps is trivial. We can make use of the store's built-in caching mechanism
and [ember-concurrency](https://github.com/machty/ember-concurrency)
(the implementation looks much neater with this compared to just using the run loop).

To make sure the store doesn't make redundant calls, you can make use of the [`shouldBackgroundReloadAll`](https://www.emberjs.com/api/ember-data/3.4/classes/DS.Adapter/methods/shouldBackgroundReloadAll?anchor=shouldBackgroundReloadAll)
method in your application adapter.
