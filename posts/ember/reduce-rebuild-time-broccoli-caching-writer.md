---
title: Reducing rebuild time with Broccoli Caching Writer
date: October, 2017
description: How using proper configuration can cut unnecessary rebuild time
tags: Tooling
order: 19
code: true
---

We use the [ember-bundle-i18n](https://github.com/pragatheeswarans/ember-bundle-i18n) package to perform i18n of our SPA.

One thing that I noticed over time was how this addon was always being printed in the build timing log printed by Ember-CLI on each rebuild. Now the size of our i18n files were huge and it made sense that they took some time. However, rebuilding these for every single change(like JS or CSS) in our app was unnecessary.

While looking around for options, I came across the [broccoli-caching-writer](https://github.com/ember-cli/broccoli-caching-writer) package that acts as a drop-in-replacement for broccoli-plugin.

Using this, one can specify what files can trigger a rebuild and what files cannot trigger rebuilds.

For example,

```
options: {
  cacheInclude: [
    /.properties$/
  ]
}
```

will only trigger rebuilds when `.properties` files are changed. This is exactly what we wanted!

I submitted a [PR](https://github.com/pragatheeswarans/ember-bundle-i18n/pull/93) and after this, our rebuilds got a second or so faster.
