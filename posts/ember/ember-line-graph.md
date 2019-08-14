---
title: ember-line-graph
date: June, 2018
description: A tiny(1.74kb gzipped), zero-dependency ember-addon to draw line-charts.
tags: EmberJS
code: true
order: 29
---

ember-line-graph is a tiny(1.74kb gzipped), zero-dependency ember-addon to draw line charts.

It uses SVGs to create charts so it is scalable and supports animations and gradients.

::: include svg-graph.html :::

#### **Installation**

`ember install ember-line-graph`

#### **Usage**

[Detailed Docs](https://astronomersiva.github.io/ember-line-graph/)

```
  {{line-graph
    points=points
    strokeWidth=5
    type="smooth"
    smoothness=10
    colors=colors
    animation=true
    animationDuration=3500
    animationTimingFunction="ease-in"
    width=500
    height=125
    padding=10}}
```

<br>

* **points** - an array of values, example - `[1, 10, 45, 3, 4, 6]`.
* **strokeWidth** - width of the SVG path stroke.
* **strokeOpacity** - opacity of the line in the chart. A number between 0 and 1.
* **strokeLinecap** - Specifies the ending style of the line path. One of `butt`, `round` or `square`.
* **strokeDasharray** - Controls the pattern of dashes and gaps used to stroke paths. Refer [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray). Not recommended to use this with animation as the animation will first draw a undashed path and the chart will then turn to dashes.
* **type** - `line`(default) or `smooth`.
* **smoothness** - a number between 1 and 10 to determine the curve around the chart's points. Applicable only when `type` is `smooth`.
* **colors** - A color or an array of colors for defining the chart's colors. A color can be any valid CSS color value.
* **animation** - A boolean to specify if the path should be animated from left to right.
* **animationDuration** - A number(in ms) to specify the duration for the animation.
* **animationTimingFunction** - Any valid CSS [animation-timing-function](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function) for the animation.
* **width** - A number to specify the width of the chart.
* **height** - A number to specify the height of the chart. Optional. Defaults to `width/4`.
* **padding** - A number to specify padding for the chart inside the SVG so that lines are not cut at the edges. Optional.

<br>

Head out to the [GitHub repo](https://github.com/astronomersiva/ember-line-graph/) if you want to contribute or file an issue!
