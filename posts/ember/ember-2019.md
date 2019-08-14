---
title: #EmberJS2019, let's make things simple for developers
date: May 30, 2019
description: My thoughts on EmberJS after three years of working with it.
tags: EmberJS
code: true
order: 41
featured: true
showComments: true
---

For the first time in the last few years, I feel **happy** about the state of Ember. The last few months
have seen tremendous effort from Ember contributors who have shipped a lot of modern features that have
put Ember on the path to success that it has deserved for a long time.

I am glad about projects like Embroider. I love the work that's being done on Broccoli that enables
memoisation and will end up saving a lot of rebuild time. I can't wait for the relevant changes to land in
ember-cli!

What I would like to see in this year's edition of Ember is developer friendliness. There are certain simple
things that are annoyingly difficult to accomplish on EmberJS or are confusing to developers.
Here are a few things that I would like to see  addressed(or I will address them myself if there is enough support).


### **1) Addon templates were detected, but there are no template compilers registered**

One of Ember's main strength is ember-cli. Developers use ember-cli to create applications
and addons using the generators provided by it. When creating an addon, `ember-cli-htmlbars`,
the required template compiler is added to the project's `devDependencies` instead of
`dependencies`. As a result, the error
`Addon templates were detected, but there are no template compilers registered` will be thrown
when building the project with a template file. While there are valid reasons to do this,
it almost always ends up annoying the developer or confusing beginners. The fix is simple -
move the package from `devDependencies` to `dependencies`. However, since this is done manually,
there is a good chance that people miss this until the build error is thrown.
I seriously believe that this should be a part of ember-cli itself(what else do we have it for?).
Maybe, when `ember g` is called, the generator should add it to the project's dependencies if it
doesn't exist already. Come to think of it, I am going to create a PR for this in the weekend.

### **2) `ember-cli-build.js` should be placed inside `tests/dummy` in addons**

Another big confusion I have seen with beginners is how they try to change stuff in `ember-cli-build.js`
in addons and expect it to reflect in the consuming apps. To be frank, I am totally with them.
All Ember applications have an `ember-cli-build.js` at their root and it is the primary **go-to** place
for all configurations. So when the addon has the same file at the root, it is quite natural for
people to fall for this. Logically, this file should be in `tests/dummy` in addons. In fact, I even
[created a PR](https://github.com/ember-cli/ember-cli/pull/7907) for this a year back. There were
some concerns about this blocking multiple dummy apps so I ended up closing it. Maybe, I should
explore this again following @rwjblue's idea of using a command line argument to determine the path
of `ember-cli-build.js`.

### **3) How does one write non-UI addons?**

As someone who has written/is writing addons that mostly deal with build-time stuff rather than
run-time visual stuff, I cannot put into words how hard this is. For example, how to conditionally
include an asset depending on the build environment? Whenever I run into these situations, I end up
looking through the code of other addons that do similar things. The disadvantage with this approach
is that there is a lot of black magic stuff that gets copy-pasted from one project to another, and
if I may safely say, without being properly understood. I am a huge fan of the work that the Ember Learning
team has done over the last one year or so and really appreciate the current state of the documentation.
I would love to see stuff like this getting documented too! Maybe a cookbook curated by the community?

> Side Note: I spent a while trying to figure out how to include SVGs in an addon's component. After
  messing around for a while, I went the React way and made them all components ¯\\\_(ツ)\_/¯.

### **4) More built-in helpers?**

This might be an unpopular opinion but I seriously believe that Ember needs a few more built-in helpers.
Consider this simple scenario: Display "Hello, World!" if `canShowHello` is equal to `"yes"`. In React,
you can use the good ol' `===` with JSX. In Vue, you would do `v-if="canShowHello === 'yes'"`. In Ember?

* Use a computed property. This feels a bit too much for cases like these. Also, the
  template and JS file will both have to be checked to determine the behaviour of the
  code. Colocation of related code is a good thing and this goes against it.
* Write a helper(need to learn it if you haven't done so already).
* Use an [addon](https://www.npmjs.com/package/ember-truth-helpers).

Needless to say, they are not as simple as the ones provided by other frameworks/libraries. I understand
that has got more to do with Handlebars than Ember but still...it's basic things like these that make
beginners feel Ember is difficult. Not just beginners, even I have been annoyed at times when I have had to
write helpers for what I consider basic utilities in new addons.

### **5) Hot Module Reloading**

Trust me, when your rebuilds take upwards of 12 seconds, you end up losing your thought train. Sadly, the current
state of Ember dictates developers of large projects to batch changes and do all sorts of counter-intuitive stuff
to reduce this. You will have to reproduce the state of the application that was present before the reload. All
this cognitive overload isn't really good for developers. Hot Module Reloading can be a lifesaver here!
While there are experimental addons that try to achieve this, none of them really come close to the experience
that you get out of projects written in React or Vue. My honest opinion is that this has to be built into
Ember proper itself.

### **6) Lightweight Links**

If you profile your apps, you will be surprised to see how long a `{{link-to}}` takes to render. There are
[addons](https://github.com/intercom/ember-href-to) that solve this. There is also an
[RFC](https://github.com/emberjs/rfcs/pull/391) related to this and I would love to see improvements in this space.
Links are a vital part of all Ember applications and an improvement in their rendering performance would benefit
all Ember apps.

### **7) Code Assistance**

I really look forward to these in Ember - using native classes in Ember instead of Ember objects and a proper
unified file structure. These would both unlock proper code assistance from editors. Developing both React
and Ember projects, I have always felt that Ember lacks severely in this area. A welcome change in Ember
this year was using native getters instead of `this.get( )`. However, to set values, one still needs to use
`this.set( )`. While I understand the decision behind this, I would really love to see this changed.

### **8) Differential Builds**

This is something that's immensely helpful when you support customers with legacy browsers. It enables shipping
what's needed for the user and has very obvious improvements with respect to the bundle size and JS parse/eval times.
This is something that is either out of the box or easily accomplished in all other major JS frameworks. These
include React, Vue, Angular and Meteor. While I did find [a way to do this in Ember](https://siva.dev/ember-differential-bundles/),
I feel that modern approaches like these should be supported by the frameworks themselves. There is a
[pre-RFC](https://github.com/emberjs/rfcs/issues/383) for this but sadly, it's inactive.

Well...that's it for now. Please share your feedback and if possible, do write your own version of this! It can be a
series of tweets, a gist or a blog post!
