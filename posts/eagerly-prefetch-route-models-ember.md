---
title: Eagerly prefetching a route's models to make apps faster
date: September, 2018
description: Improving perceived performance in Ember Apps
code: true
hero: //source.unsplash.com/1vTFoSyWyFQ/1600x900
heroMobile: //source.unsplash.com/1vTFoSyWyFQ
tags: EmberJS
order: 31
---

**There is a 200-300ms interval between a user hovering on a link and actually clicking it.**


If we use this time to prefetch the target route's model in our Ember applications, the app will feel faster and
users will have a better experience.

Implementing this in Ember apps is trivial. We can make use of the store's built-in caching mechanism
and [ember-concurrency](https://github.com/machty/ember-concurrency) to achieve this(the implementation
looks much neater with ember-concurrency compared to just using the run loop).

To make sure the app doesn't make redundant calls, the [shouldBackgroundReloadAll](https://www.emberjs.com/api/ember-data/3.4/classes/DS.Adapter/methods/shouldBackgroundReloadAll?anchor=shouldBackgroundReloadAll)
method in the application adapter can be used.

Then proceed to create a component(say, `eager-link`).

**components/eager-link.js**
<pre>
import Component from '@ember/component';
import { getOwner } from '@ember/application';
import { task, timeout } from 'ember-concurrency';

// This is to prevent flooding the server with requests.
// It is also recommended to have the server return 300 whenever possible.
const DEBOUNCE_INTERVAL = 200;

export default Component.extend({
  eagerPrefetch: task(function* () {
    yield timeout(DEBOUNCE_INTERVAL);

    let container = getOwner(this);
    let targetRoute = container.lookup(`route:${this.get('href')}`);

    yield targetRoute.model();
  }).restartable(),

  mouseEnter() {
    this.get('eagerPrefetch').perform();
  },

  mouseLeave() {
    // cancel all pending tasks
    this.get('eagerPrefetch').cancelAll();
  },
});
</pre>

<br>

**templates/components/eager-link.hbs**
<pre>
{{link-to text href}}
</pre>

<br>

and this component can be used in the application as
<pre>
{{eager-link href="cars" text="See your cars!"}}
</pre>

<br>

Whenever the link is hovered for more than 200ms, the model will be fetched and used when the route is visited.

Here is a working example.

<video autoplay loop muted playsinline src="../static/images/eager-prefetch.mp4" type="video/mp4" style="max-width: 100%;"></video>

Notice the following:

* It takes around 400ms to get the API response.
* There is a delay of about 570ms between hovering and clicking the link to the `cars` route.

By eagerly prefetching the model, we have completely eliminated the waiting time for the model
while entering the `cars` route.

Obviously, this number will change based on the API response time and the behaviour of the
users but there will almost always be an improvement in the order of a few hundred milliseconds.
