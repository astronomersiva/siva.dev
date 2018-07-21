title: ember-line-graph
date: June, 2018
description: A tiny(1.74kb gzipped), zero-dependency ember-addon to draw line-charts.
tags: EmberJS
order: 29
code: true

ember-line-graph is a tiny(1.74kb gzipped), zero-dependency ember-addon to draw line charts.

It uses SVGs to create charts so it is scalable and supports animations and gradients.

<div>
  <svg width="100%" height="25%" stroke-width="2" style="padding: " viewBox="0 0 300 75">
    <defs>
      <linearGradient id="ember-line-graph-896528374" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0" stop-color="#EB6B9D"></stop>
          <stop offset="1" stop-color="#EE8C68"></stop>
      </linearGradient>
    </defs>

    <path style="
        animation: ember-line-animation-896528374 2500ms ease-in,
        ember-line-animation-cleanup-896528374 1ms 2500ms
      "
      id="ember-line-graph-path-896528374"
      fill="none"
      stroke="url(#ember-line-graph-896528374)"
      d="M 10,63.625 C 13.733333333333334,57.19 33.644444444444446,12.969999999999999 41.111111111111114,10 C 48.57777777777778,7.029999999999999 64.75555555555556,32.275 72.22222222222223,38.875 C 79.6888888888889,45.475 95.86666666666666,65 103.33333333333333,65 C 110.8,65 126.97777777777779,44.65 134.44444444444446,38.875 C 141.91111111111113,33.1 158.08888888888887,17.205000000000002 165.55555555555554,16.875 C 173.0222222222222,16.545 189.2,34.805 196.66666666666666,36.125 C 204.13333333333333,37.445 220.3111111111111,29.525000000000002 227.77777777777777,27.875 C 235.24444444444444,26.225 251.42222222222225,19.57 258.8888888888889,22.375 C 266.35555555555555,25.18 286.26666666666665,47.785000000000004 290,51.25">
    </path>
  </svg>

  <style>
    @keyframes ember-line-animation-896528374 {
      0% {
        stroke-dasharray: 370.5884704589844;
        stroke-dashoffset: 370.5884704589844;
      }
      100% {
        stroke-dasharray: 370.5884704589844;
        stroke-dashoffset: 0;
      }
      100% {
        stroke-dashoffset: '';
        stroke-dasharray: '';
      }
    }

    @keyframes ember-line-animation-cleanup-896528374 {
      to {
        stroke-dasharray: '';
        stroke-dashoffset: '';
      }
    }
  </style>
</div>

### Installation

`ember install ember-line-graph`

### Usage

<pre>
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
</pre>

<br>

[Detailed Docs](https://astronomersiva.github.io/ember-line-graph/)

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

Head out to the [Github repo](https://github.com/astronomersiva/ember-line-graph/) if you want to contribute or file an issue!
