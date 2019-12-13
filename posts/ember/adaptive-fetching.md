---
title: Adaptive Loading Based on the User's Network
date: November 20, 2019
description: Deliver experiences best suited to a user's network constraints
tags: EmberJS
code: true
order: 45
featured: true
showOnHomePage: true
---

During the recent Chrome Dev Summit, [Addy Osmani announced react-adaptive-hooks](https://twitter.com/addyosmani/status/1194158823948177408),
a way to deliver the best possible experience to users based on their network and hardware limits.

I wanted to see what it will take to achieve something similar with Ember.js.
[react-adaptive-hooks](https://github.com/GoogleChromeLabs/react-adaptive-hooks) consists of several utilities that provide information
about the CPU cores, hardware concurrency and memory among others. In this blog, let's just consider the user's network.

The [effectiveType property on the NetworkInformation interface](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/effectiveType)
is an **experimental technology** that currently works only on Chrome, Opera, Android Webview, and, Chrome, Opera and Firefox on Android.
Its value is a string containing one of `slow-2g`, `2g`, `3g`, or `4g`. Based on this value, it's possible to dynamically change the assets
that are fetched. Let's see how this can be used to load different versions of the same image.

First, let's write an Ember component that displays an `img`. This would be the template.

```handlebars
  <img alt="Adaptive Loading" src={{this.src}}>
```

In the constructor of this component's backing class definition, let's check if the `effectiveType` feature is available
in the current browser. Let's have different `src`s based on this.

```javascript
import Component from '@glimmer/component';

export default class AdaptiveImageComponent extends Component {
  constructor() {
    super(...arguments);

    if (
      'connection' in navigator &&
      'effectiveType' in navigator.connection
    ) {
      let syntaxHighlighting;
      let breaks;
      let withoutThese = '¯\_(ツ)_/¯';

      // concentrate here
      this.canAdapt = true;
    }
  }

  get src() {
    if (this.canAdapt) {
      return 'this-image.png';
    }

    return 'that-image.png';
  }
}
```

Let's now try and make use of the `effectiveType` property. Let's track changes to this property as well.


```js
import Component from '@glimmer/component';

export default class AdaptiveImageComponent extends Component {
  constructor() {
    super(...arguments);

    if (
      'connection' in navigator &&
      'effectiveType' in navigator.connection
    ) {
      let syntaxHighlighting;
      let breaks;
      let withoutThese = '¯\_(ツ)_/¯';

      // concentrate here
      // set current network type
      this.effectiveType = navigator.connection.effectiveType;

      this.canAdapt = true;
    }
  }

  @tracked effectiveType = null;

  get src() {
    if (this.canAdapt) {
      let { effectiveType } = this;
      // return the highest possible resolution on 4g
      if (effectiveType === '4g') {
        return 'large.jpg';
      }

      // return medium resolution on 3g
      if (effectiveType === '3g') {
        return 'medium.jpg';
      }

      // return the smallest resolution otherwise
      return 'small.jpg';
    }

    // Return the highest resolution when NetworkInformation is unavailable.
    return 'large.jpg';
  }
}
```

Now to respond to changes in the network speed, we can add an event listener.

```js
import Component from '@glimmer/component';

export default class AdaptiveImageComponent extends Component {
  constructor() {
    super(...arguments);

    if (
      'connection' in navigator &&
      'effectiveType' in navigator.connection
    ) {
      // set current network type
      this.effectiveType = navigator.connection.effectiveType;

      // watch for network changes
      this.handleEffectiveTypeChanged = this.onEffectiveTypeChanged.bind(this);
      navigator.connection.addEventListener(
        'change',
        this.handleEffectiveTypeChanged
      );

      this.canAdapt = true;
    }
  }

  @tracked effectiveType = null;

  // update effectiveType whenever the event listener is triggered
  onEffectiveTypeChanged(event) {
    this.effectiveType = event.target.effectiveType;
  }

  get src() {
    if (this.canAdapt) {
      let { effectiveType } = this;
      // return the highest possible resolution on 4g
      if (effectiveType === '4g') {
        return 'large.jpg';
      }

      // return medium resolution on 3g
      if (effectiveType === '3g') {
        return 'medium.jpg';
      }

      // return the smallest resolution otherwise
      return 'small.jpg';
    }

    // Return the highest resolution when NetworkInformation is unavailable.
    return 'large.jpg';
  }

  // remove event listener
  willDestroy() {
    if (this.canAdapt) {
      navigator.connection.removeEventListener(
        'change',
        this.handleEffectiveTypeChanged
      );
    }

    super.willDestroy(...arguments);
  }
}
```

We can also go ahead and use the `saveData` property(also experimental) that returns `true` if
the user has set a reduced data usage option on the user agent.

```js
import Component from '@glimmer/component';

export default class AdaptiveImageComponent extends Component {
  constructor() {
    super(...arguments);

    if (
      'connection' in navigator &&
      'effectiveType' in navigator.connection
    ) {
      // set current network type
      this.effectiveType = navigator.connection.effectiveType;

      // watch for network changes
      this.handleEffectiveTypeChanged = this.onEffectiveTypeChanged.bind(this);
      navigator.connection.addEventListener(
        'change',
        this.handleEffectiveTypeChanged
      );

      this.canAdapt = true;
    }
  }

  @tracked effectiveType = null;

  // update effectiveType whenever the event listener is triggered
  onEffectiveTypeChanged(event) {
    this.effectiveType = event.target.effectiveType;
  }

  get src() {
    if (this.canAdapt) {
      // return lowres when data saver is on
       if (NetworkInformation.saveData) {
         return 'small.jpg';
      }

      let { effectiveType } = this;
      // return the highest possible resolution on 4g
      if (effectiveType === '4g') {
        return 'large.jpg';
      }

      // return medium resolution on 3g
      if (effectiveType === '3g') {
        return 'medium.jpg';
      }

      // return the smallest resolution otherwise
      return 'small.jpg';
    }

    // Return the highest resolution when NetworkInformation is unavailable.
    return 'large.jpg';
  }

  // remove event listener
  willDestroy() {
    if (this.canAdapt) {
      navigator.connection.removeEventListener(
        'change',
        this.handleEffectiveTypeChanged
      );
    }

    super.willDestroy(...arguments);
  }
}
```

### Warning

When I was playing around with this, I realised that there's a huge gotcha with this technique.
Since there is a listener for changes on `navigator.connection`, during network fluctuations, it's easy to end up re-fetching
assets that were already fetched. One example of this would be how the data speeds vary a lot while travelling. If
there is an image that was already fetched but is no longer in viewport(but still present in the DOM), a network change event will
end up changing this image's `src` as well. As a result, this image's new `src` will be fetched even though it's
not even needed anymore. If your use-case does not demand listening to this event, you can skip adding the event listener
and avoid this issue.

I have filed this as an [issue on react-adaptive-hook](https://github.com/GoogleChromeLabs/react-adaptive-hooks/issues/28)'s
repo and there are a few patterns that are being worked on by the devs at Google that you can check out.
