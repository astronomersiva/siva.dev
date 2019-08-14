---
title: Eagerly Prefetching a Route's Model to Make Apps Faster
date: September, 2018
description: Improving perceived performance in Ember Apps
code: true
# hero: /static/images/hero-images/eager-large.jpeg
# heroMobile: /static/images/hero-images/eager.jpeg
# heroPosition: bottom
# thishack: is needed because colon in data image/jpeg breaks the parser
# heroPlaceholder: image/jpeg;base64,/9j/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAcADIDASIAAhEBAxEB/8QAGwAAAgMAAwAAAAAAAAAAAAAABQYAAwQCBwj/xAAoEAABBAEDAwMFAQAAAAAAAAABAAIDBBEFEiEGMVETYXEiIyRCgZH/xAAWAQEBAQAAAAAAAAAAAAAAAAABAgD/xAAZEQEBAQEBAQAAAAAAAAAAAAAAARECEjH/2gAMAwEAAhEDEQA/APN9KNhe7JcT7IrHVrOqOe+UteP1Kvq6XbjfmGDv5RCDpy5Zfmb02D5RrYFaDFHK8yyTBoacY9lqnr0oNQeWH6XhEn9JRxNybbWnwCqX6Gx52mR0jh2IW9Q+aWNQ0/8AK3Rnc3vwtj6Dq1MTYOHJmqdNzsrl8zdrRzk+ED1u6Y4jWjI2ArS6bzZ9A958qKnf7KJSYBrtyQ49THwtVe9am4Mr/wDUArAbwmirEyOFrmjlBglp1EzkOncf6Ux1xVqMHAyl6nK8MLs8hZnWZXeo4u5HZTmrnWCfUeu/aMUbsZ74XW2py75ScrfqEz3yEudlBpyS85VSYi3VWSouGVEh/9k=
tags: EmberJS
order: 31
featured: true
showOnHomePage: true
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
```
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
```

<br>

**templates/components/eager-link.hbs**
```
{{link-to text href}}
```

<br>

and this component can be used in the application as
```
{{eager-link href="cars" text="See your cars!"}}
```

<br>

Whenever the link is hovered for more than 200ms, the model will be fetched and used when the route is visited.

Here is a working example.

::: video src="../static/images/eager-prefetch.mp4" :::

Notice the following:

* It takes around 400ms to get the API response.
* There is a delay of about 570ms between hovering and clicking the link to the `cars` route.

By eagerly prefetching the model, we have completely eliminated the waiting time for the model
while entering the `cars` route.

Obviously, this number will change based on the API response time and the behaviour of the
users but there will almost always be an improvement in the order of a few hundred milliseconds.
