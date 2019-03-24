---
title: Deploying sourcemaps in production and loading them only for your developers
date: March, 2019
description: Sourcemaps can be of immense help while debugging production issues. This post suggests approaches that can deploy sourcemaps while not revealing the sourcecode.
tags: JavaScript, Tooling, EmberJS
code: true
order: 39
featured: true
draft: true
---

Almost all major frontend applications use transpilers and minifiers on their JavaScript code
to reduce the size of their assets. This results in a code that looks nothing like the original
and it makes it difficult for developers to debug issues in production, when the stack trace
points to line and column numbers in this minified code.
asdad
Sourcemaps were invented for this reason. They help in making the mangled code more readable
and most importantly, more debuggable. Unfortunately, most companies are not okay with deploying
sourcemaps to production. They claim that sourcemaps will result in the code getting leaked
and that it might harm the business.

I personally do not agree with this for the following reasons,

* If somebody is really worried about business secrets getting leaked, they shouldn't be putting
  them in frontend code that is available to every single person using the app, even if it is in
  an uglified state. **Uglification and obfuscation !== Security**.
* It is trivial to beautify the code and get a reasonable representation of the original code.
* The web must be open. I grew up learning stuff by doing `Inspect Element` and `View Source`
  and I believe that is a pathway that should be kept to the future generations as well.
* Sourcemaps were invented precisely for this reason 🤷‍♂️.

Unfortunately, most companies that I know of are scared of sourcemaps for some reason and the only
compromise that we could settle on were generating and deploying sourcemaps to help at least the
companies' developers in debugging issues while still keeping the sourcemaps hidden from public view.

### **Hidden Sourcemaps**

Sourcemaps usually work with the help of a pragma(a special comment) added
to the end of JS files. It looks like this - `//# sourceMappingURL=app.js.map`. When the `app.js`
file is opened in DevTools, the sourcemap `app.js.map` is fetched and applied automatically. With
the hidden sourcemaps technique, this pragma comment is not added and as a result the sourcemap
will not be applied when the file is opened in DevTools.

The link to sourcemap files can be manually inserted in the browser. As far as I know, Chrome is the
only major browser to support this. When righ-clicking on the JS file, an option to `Add Source Map`
is displayed and you can enter the URL to the sourcemap file here.

To implement this, you will have to allow only calls from your office network to access `*.map` files.
I am not a fan of this technique because this isn't supported by browsers like Firefox and this technique
is not possible if you use a CDN.

### **Sourcemaps behind a firewall**

The approach that I think is best suited is to generate sourcemaps and deploy them to an internal
server. Only the minified JS files should be deployed to your static servers. The sourcemap pragma
should be configured to refer to this internal network like `//# sourceMappingURL=http://internal-network/app.js.map`.
When your users open the JS file in DevTools, the network call to `http://internal-network/app.js.map` will
fail and as a result the sourcemap will not load. They will load for developers inside the internal network.

### Implementation

* Run a production build with sourcemaps enabled and pointing to the internal network.
* Deploy the sourcemaps to an internal server.
* Deploy the rest of the files to static servers accessible publicly.

If you are using webpack for bundling, it offers
[several options](https://webpack.js.org/configuration/devtool/#production) to achieve these techniques. You can make
use of the `publicPath` option to change the `sourceMappingUrl` like I pointed above.

### Doing this in EmberJS
