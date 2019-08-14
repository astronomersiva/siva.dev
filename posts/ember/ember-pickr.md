---
title: ember-pickr
date: January, 2019
description: An EmberJS color picker addon that wraps Pickr, and works without jQuery
tags: EmberJS
code: true
order: 34
---

ember-pickr provides a wrapper for [Pickr](https://github.com/Simonwep/pickr), a flat, responsive and hackable color picker.

ember-pickr is smart about including pickr. It chooses an ES5 or ES6 version based on the browser
targets of the consuming project. This way, the size of the addon stays as low as possible.

::: lazy-image src="/static/images/lowres/pickr.png" alt="Screenshot" style="max-width: 600px; margin: 0 auto;" :::

#### **Installation**

`ember install ember-line-graph`

#### **Usage**

`{{color-picker value=color format="hex"}}`

You can see live examples and a detailed documentation in the [documentation site](https://astronomersiva.github.io/ember-pickr/).

#### **Contribute**

Head out to the [GitHub repo](https://github.com/astronomersiva/ember-pickr/) if you want to contribute or file an issue!
