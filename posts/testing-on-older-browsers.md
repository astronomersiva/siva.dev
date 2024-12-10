---
title: Testing on older versions of browsers
date: December 10, 2024
description: A guide on how to test your website or app on older versions of browsers.
tags: Tooling, Web Development
order: 51
showOnHomePage: true
---

One of the most common challenges that developers face is reproducing bugs that are specific to older versions of browsers. In this post, I'll share how I go about testing my websites and apps on older versions of browsers.

### Firefox

* This is rather straightforward. Visit [https://ftp.mozilla.org/pub/firefox/releases/](https://ftp.mozilla.org/pub/firefox/releases/) and select the version that you want. Then, select your OS and language. For example, `mac` and `en-US`.
* Download the dmg file and copy it to `Applications`.
* Make sure you select the `Keep both` option when prompted.
* To disable updates, go to `Preferences -> Advanced -> Update` and select the `Never check for updates` option. This ensures that the newly installed older version doesn't update itself when restarted.
* Delete this old version after you are done testing.

### Chrome(and other Chromium-based browsers)

Chrome does not allow downloading older versions for security reasons. However, you can still access older versions of Chromium. Since Chrome is based on Chromium, this is sufficient for most purposes.

There was an official way to do this until March 2023. However, this has been discontinued now.

If the required version is `113.0.5672.0` or later, you can use [Chrome for Testing](https://developer.chrome.com/blog/chrome-for-testing)
using `@puppeteer/browsers`. Here's how you can do it:

```
npx @puppeteer/browsers install chrome@113.0.5672.0
npx @puppeteer/browsers launch chrome@113.0.5672.0
```

I will update this post if I find some reliable way to download versions of Chromium that are older than `113.0.5672.0`.

### Safari

Playwright is a great workaround for testing on older versions of Safari. You can use Playwright to launch a specific version of WebKit. Here's how you can do it:

* Go to the [Playwright releases page](https://github.com/microsoft/playwright/releases) and find a version that mentions the WebKit version you want to test on. For example, if you want to test on Safari 14, find a version that mentions WebKit 14.
* Run `npx playwright@<version> wk <url>`. For example,

```
npx playwright@1.13 wk someUrl
```

This will launch Safari 14. You can now test your website on this version.
