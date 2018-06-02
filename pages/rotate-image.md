title: rotate-image
date: May, 2018
description: Rotates an image by n degrees using node-canvas
tags: Javascript, Node
order: 24

I had been looking for an NPM package that allowed me to rotate an image by `n` degrees. To my surprise, I found packages that only supported rotation in multiples of 90.

I thought this would be an easy task and jumped into action. Boy! It was tough. I was using all my trigonometry lessons(finally) and found myself often on [math.stackexchange](http://math.stackexchange.com/). It felt so good when I finally got it working :D

You can see the code on [Github](https://github.com/astronomersiva/rotate-image)

#### **Install**

* Run `npm install -g @astronomersiva/rotate-image`.

#### **Usage**

<pre>
(async () => {
  const rotate = require('rotate-image');
  const options = {
    src: 'hello.png',
    dest: 'rotated.png', // optional, defaults to `${src}-rotated`
    rotation: 60
  };

  await rotate(options);
})();
</pre>
