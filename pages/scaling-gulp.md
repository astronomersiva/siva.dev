title: Scaling Gulp
date: April, 2018
description: How Gulp can be (re)used for very large projects
tags: Gulp, Node
code: true
order: 20

About a year back, I started to work on unifying the development, build and deployment process of several websites. All these websites had almost the same structure and dependencies and were using [Gulp](https://gulpjs.com/).

The main problem was the verbosity of the gulp tasks and code duplication. Each gulpfile was over 250 lines long and was incomprehensible even to experienced developers. The same gulpfile was present in each repository and making one change meant changing it in all the repos. Consider this `gulpfile.js`.

<pre>
  const gulp = require('gulp');
  const pug = require('gulp-pug');
  const less = require('gulp-less');
  const minifyCSS = require('gulp-csso');
  const concat = require('gulp-concat');
  const sourcemaps = require('gulp-sourcemaps');

  gulp.task('html', function() {
    return gulp.src('client/templates/*.pug')
      .pipe(pug())
      .pipe(gulp.dest('build/html'));
  });

  gulp.task('css', function() {
    return gulp.src('client/templates/*.less')
      .pipe(less())
      .pipe(minifyCSS())
      .pipe(gulp.dest('build/css'));
  });

  gulp.task('js', function() {
    return gulp.src('client/javascript/*.js')
      .pipe(sourcemaps.init())
      .pipe(concat('app.min.js'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('build/js'));
  });

  gulp.task('default', [ 'html', 'css', 'js' ]);
</pre>

Ugh. The largest contributor to the verbosity is the task definition. In days of Gulp 3, the task ordering `gulp.task('default', ['html', 'css', 'js']);` was even more confusing but was largely solved by plugins such as [gulp-sequence](https://www.npmjs.com/package/gulp-sequence).

Fortunately, this could easily be addressed by moving out the tasks to separate files.

For example,

<pre>
  const gulp = require('gulp');

  const getTask = (task) => {
    return require(`./${task}`);
  }

  gulp.task('html', getTask('html');
  gulp.task('css', getTask('css');
  gulp.task('js', getTask('js');
  gulp.task('default', [ 'html', 'css', 'js' ]);
</pre>

and

<pre>
  module.exports = function() {
    return function() {
      const pug = require('gulp-pug');
      return gulp.src('client/templates/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('build/html'));
    }
  }
</pre>

accomplishes the same thing!

You can see that the gulpfile is now simpler and the tasks act as separate modules which I feel is much more intuitive than putting them all in the same place.

As an added bonus, requiring `gulp-pug` inside the task this way makes sure that it will be required only when the task is actually run. `require()` is expensive and when you require a lot of modules in plain gulpfiles, they tend to slow down the startup. But by moving these to tasks and in a way, lazy-requiring them, you can see significant performance gains(especially on large websites). 

One another signifact thing that was done was to package this gulpfile(and its associated tasks and utils) into an NPM package. The consuming websites were then asked to provide a configuration file that this package could simply require. We now had one gulpfile for all websites and this meant, there was just one place where all our efforts were focussed on. By adding `./gulpfile` to the `package.json`s `bin` field, we could call the tasks as `myFastGulp taskName`.

For example,
<pre>
  return gulp.src('websiteA/templates/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('build/html'));
</pre>

was changed to

<pre>
  const path = require('path');
  const config = require(path.join(process.cwd(), 'myFastGulp.js'));

  return gulp.src(`${config.websiteName}/client/templates/*.pug`)
    .pipe(pug())
    .pipe(gulp.dest('build/html'));
</pre>

In some cases like copying a large number of files(in the range of tens of thousands), gulp tended to be very slow. In these cases, just using an equivalent NPM package(or just plain Node's `fs`) accelerated things. `gulp-util` which is used by most packages for Gulp 3 and by gulp itself for logging was also slowing down gulp's startup by about 4-5 seconds. Removing it and using the excellent [ora](https://github.com/sindresorhus/ora) and [chalk](https://www.npmjs.com/package/chalk) also helped in accelerating Gulp's speed(especially startup).

Happy gulping!

PS: I highly recommend that you guys checkout [time-require](https://github.com/Jaguard/time-require/) to profile your startup times(even in your non-Gulp projects). You will be in for surprises.
