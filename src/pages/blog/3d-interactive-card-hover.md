---
templateKey: 'blog-post'
title: '3D Interactive Card Hover Animation'
date: 2022-06-24
featuredpost: false
listed: true
featuredimage: /img/3d-card-hover.png
description: See how I made this neat little animation
  
tags:
  - Dev Blog
  - CSS
  - JavaScript
---

<style>
 /*
 * Synthwave '84 Theme originally by Robb Owen [@Robb0wen] for Visual Studio Code
 * Demo: https://marc.dev/demo/prism-synthwave84
 *
 * Ported for PrismJS by Marc Backes [@themarcba]
 */

code[class*="language-"],
pre[class*="language-"] {
	color: #fba7dc;
	text-shadow: 0 0 2px #100c0f, 0 0 5px #dc078e33, 0 0 10px #fff3;
	background: none;
	font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
	font-size: 1em;
	text-align: left;
	white-space: pre;
	word-spacing: normal;
	word-break: normal;
	word-wrap: normal;
	line-height: 1.5;

	-moz-tab-size: 4;
	-o-tab-size: 4;
	tab-size: 4;

	-webkit-hyphens: none;
	-moz-hyphens: none;
	-ms-hyphens: none;
	hyphens: none;
}

/* Code blocks */
pre[class*="language-"] {
	padding: 1em;
	margin: .5em 0;
	overflow: auto;
}

:not(pre) > code[class*="language-"],
pre[class*="language-"] {
	background-color: transparent !important;
	background-image: linear-gradient(to bottom, #2a2139 75%, #34294f);
}

/* Inline code */
:not(pre) > code[class*="language-"] {
	padding: 2px 3px;
	border-radius: .3em;
	white-space: normal;
  font-size: .95rem;
}

.token.comment,
.token.block-comment,
.token.prolog,
.token.doctype,
.token.cdata {
	color: #8e8e8e;
}

.token.punctuation {
	color: #ccc;
}

.token.tag,
.token.attr-name,
.token.namespace,
.token.number,
.token.unit,
.token.hexcode,
.token.deleted {
	color: #e2777a;
}

.token.property,
.token.selector {
	color: #72f1b8;
	text-shadow: 0 0 2px #100c0f, 0 0 10px #257c5575, 0 0 35px #21272475;
}

.token.function-name {
	color: #6196cc;
}

.token.boolean,
.token.selector .token.id,
.token.function {
	color: #fdfdfd;
	text-shadow: 0 0 2px #001716, 0 0 3px #03edf975, 0 0 5px #03edf975, 0 0 8px #03edf975;
}

.token.class-name {
	color: #fff5f6;
	text-shadow: 0 0 2px #000, 0 0 10px #fc1f2c75, 0 0 5px #fc1f2c75, 0 0 25px #fc1f2c75;
}

.token.constant,
.token.symbol {
	color: #f92aad;
	text-shadow: 0 0 2px #100c0f, 0 0 5px #dc078e33, 0 0 10px #fff3;
}

.token.important,
.token.atrule,
.token.keyword,
.token.selector .token.class,
.token.builtin {
	color: #f4eee4;
	text-shadow: 0 0 2px #393a33, 0 0 8px #f39f0575, 0 0 2px #f39f0575;
}

.token.string,
.token.char,
.token.attr-value,
.token.regex,
.token.variable {
	color: #f87c32;
}

.token.operator,
.token.entity,
.token.url {
	color: #67cdcc;
}

.token.important,
.token.bold {
	font-weight: bold;
}

.token.italic {
	font-style: italic;
}

.token.entity {
	cursor: help;
}

.token.inserted {
	color: green;
}
</style>

The <a href="https://codepen.io/joshsalazar/details/GROEmRj">3D Interactive Card Hover Pen</a> is, by far, my most popular Pen on CodePen. I wanted to take this time to share how I created this interactive experience.

Here's what we're going to build:

<iframe height="700" style="width: 100%;" scrolling="no" title="3D Interactive Card Hover" src="https://codepen.io/joshsalazar/embed/GROEmRj?default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href="https://codepen.io/joshsalazar/pen/GROEmRj">
  3D Interactive Card Hover</a> by Joshua Salazar (<a href="https://codepen.io/joshsalazar">@joshsalazar</a>)
  on <a href="https://codepen.io">CodePen</a>.
</iframe>

There are three layers that go into creating this effect:
1. A shadow layer
2. A base card layer
3. A glare layer

All three layers respond to mouse input in their own way to create the 3D effect.

I'll start with setting up the HTML / CSS then get into the JavaScript interaction further down. Let's start with the base card layer 👇

## Base Card Layer

I'm not doing anything too fancy with the base card layer. This is a simple rectangle with a backdrop-filter effect. Since I'm using 3 cards in my Pen, I'm also using CSS Grid to align the items.

HTML:

```html
<div class="wrapper">
  <div class="card card-1">
    <div class="glare-container">
      <div class="glare">
      </div>
    </div>
  </div>
  //Repeat for other two cards, changing `card-1` class name to the respective card number
  ... 
</div>
```

```css
.card {
  backdrop-filter: blur(5px);
  min-width: 35vh;
  height: 55vh;
}

.card-1 {
  background-color: rgba(255, 59, 0, 0.37);
}
//Each card has its own background color
```

I defined the card width on the ```.card``` class with ```min-width: 35vh;```. Using ```vh``` as the width and height allows me to maintain the aspect ratio for the cards while also making them responsive.

### Setting up CSS Grid
The ```.wrapper``` class is the wrapper for our grid. I'm using the ```grid-template-columns``` property and setting each of the three columns to ```1fr```. I'm setting the ```align-items``` and ```justify-items``` properties to center to avoid any centering hacks. Finally, I set the height of the wrapper to ```100vh``` to ensure the cards can properly vertically align in the center of the viewport.

```css
.wrapper{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  justify-items: center;
  align-items: center;
  height: 100vh;
}

```


And here's what I have so far:

<html>

<div class="wrapper margin-50">
  <div class="card card-0">
    <div class="glare-container">
      <div class="glare">
      </div>
    </div>
  </div>
  <div class="card card-1">
    <div class="glare-container">
      <div class="glare">
      </div>
    </div>
  </div>
  <div class="card card-2">
    <div class="glare-container">
      <div class="glare">
      </div>
    </div>
  </div>
</div>
</html>


<style>
  .card {
    backdrop-filter: blur(5px);
    min-width: 75%;
    height: 100%;
  }

  .card-1{
    background-color: rgba(0, 166, 255, 0.3);
  }

  .card-2 {
    background-color: rgba(255, 59, 0, 0.37);
  }

  .card-0 {
    background-color: rgba(255, 0, 0, 0.23);
  }

  .wrapper{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-items: center;
    align-items: center;
    height: 300px;
  }
</style>


## Shadow Layer

For the shadow, I want something that's subtle and smooth. I'm using a ```box-shadow``` property on the ```.card``` class to get me what I'm after.

```css
.card{
  ...
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.051),
    0px 0px 7.2px rgba(0, 0, 0, 0.073), 
    0px 0px 13.6px rgba(0, 0, 0, 0.09),
    0px 0px 24.3px rgba(0, 0, 0, 0.107), 
    0px 0px 45.5px rgba(0, 0, 0, 0.129),
    0px 0px 109px rgba(0, 0, 0, 0.18);
}

```

Each line of the ```box-shadow``` property is another box-shadow. So I'm creating 6 box-shadows with varying levels of blur and black opacity. This gives me the smoothest and most authentic looking shadow possible.

<html>

<div class="wrapper margin-50">
  <div class="card--2 card-0">
    <div class="glare-container">
      <div class="glare">
      </div>
    </div>
  </div>
  <div class="card--2 card-1">
    <div class="glare-container">
      <div class="glare">
      </div>
    </div>
  </div>
  <div class="card--2 card-2">
    <div class="glare-container">
      <div class="glare">
      </div>
    </div>
  </div>
</div>
</html>


<style>
  .card--2 {
    backdrop-filter: blur(5px);
    min-width: 75%;
    height: 100%;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.051),
    0px 0px 7.2px rgba(0, 0, 0, 0.073), 
    0px 0px 13.6px rgba(0, 0, 0, 0.09),
    0px 0px 24.3px rgba(0, 0, 0, 0.107), 
    0px 0px 45.5px rgba(0, 0, 0, 0.129),
    0px 0px 109px rgba(0, 0, 0, 0.18);
  }
</style>


## Glare Layer
<em>Glare layer</em> - heh!

You may have noticed I already added the ```glare-container``` and ```glare``` classes as children to the cards in the HTML.

```css
.glare-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.glare {
  position: absolute;
  left: 100%;
  bottom: -50%;
  width: 150%;
  height: 150%;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0) 20%
  );
  transform: rotateZ(35deg);
  pointer-events: none;
  filter: blur(4px);
}
```

Most of the magic is happening in the ```.glare``` class. Setting ```pointer-events: none;``` is important for making the interactive functional! The glare itself is a linear gradient on a square with a blur effect applied to it. The layer is rotated 35 degrees and moved outside the bounds of the card. The ```.glare-container``` is important in hiding the overflow of the glare.

## JavaScript Interactivity
Now we get to the fun JavaScript portion. I'm changing the CSS when the user mouses over the card object. I'm using JQuery to make changing the CSS easier and cleaner.

Since all interaction is dependent on the position of the mouse within the card, I need to get the user's mouse position within the bounds of the card.

```javascript
$(".card").mousemove(function (e) {
  var rect = e.target.getBoundingClientRect();
  var x = e.clientX - rect.left; //width of the card.
  var y = e.clientY - rect.top; //height of the card.

  var offsetX = x / rect.width; //x mouse position
  var offsetY = y / rect.height; //y mouse position
}
```

Next I need to calculate the rotate angle of the card and the shadow offset position. I use the mouse position (offset) values I calculated above to get these two values. I define a global ```limits``` value to allow me to quickly modify the amount of card rotation.

```JavaScript
var limits = 15.0;

$(".card").mousemove(function (e) {
  ...
  
  var rotateY = (offsetX) * (limits * 2) - limits; // rotation of the card on the x-axis
  var rotateX = (offsetY) * (limits * 2) - limits; // rotation of the card on the y-axis

  var shadowOffsetX = (offsetX) * 32 - 16; // shadow offset on the x-axis
  var shadowOffsetY = (offsetY) * 32 - 16; // shadow offset on the y-axis
```

I need to use those values to modify the CSS. I'm going to use JQuery's ```.css``` function to make this work. That function allows us to change multiple properties. The syntax, in its simplest form is as follows:

```.css("propertyName", "value")```

This works for single properties, but I can also set multiple properties by using object syntax:

```.css("propertyName": "value", "propertyName": "value" ...)```

Since I set the ```box-shadow``` property on the ```.card``` class, and I'm currently scoped to the ```.card``` class within the ```.mousemove``` function, I can use ```$(this)``` to target the actively hovered card element.:

```JavaScript
  ...
  $(this).css({
    "box-shadow": (1 / 6) * shadowOffsetX * -1 + "px " + (1 / 6) * shadowOffsetY * -1 + "px 3px rgba(0, 0, 0, 0.051), " +
      (2 / 6) * shadowOffsetX * -1 + "px " + (2 / 6) * shadowOffsetY * -1 + "px 7.2px rgba(0, 0, 0, 0.073), " +
      (3 / 6) * shadowOffsetX * -1 + "px " + (3 / 6) * shadowOffsetY * -1 + "px 13.6px rgba(0, 0, 0, 0.09), " +
      (4 / 6) * shadowOffsetX * -1 + "px " + (4 / 6) * shadowOffsetY * -1 + "px 24.3px rgba(0, 0, 0, 0.107), " +
      (5 / 6) * shadowOffsetX * -1 + "px " + (5 / 6) * shadowOffsetY * -1 + "px 45.5px rgba(0, 0, 0, 0.129), " +
      shadowOffsetX * -1 + "px " + shadowOffsetY * -1 + "px 109px rgba(0, 0, 0, 0.18)",
    transform: "perspective(1000px) rotateX(" + -rotateX + "deg) rotateY(" + rotateY + "deg)"
  });
```
<small><em>Notice ```box-shadow``` is wrapped in quotes</em></small>

I'm using the ```shadowOffsetX``` and ```shadowOffsetY``` values and plugging them into the 6 shadows that I defined previously in the CSS. Then I'm rotating the card using the ```transform``` property.

For the glare, I want it do something slightly different. I'm going to visualize there's a light source toward the top-left of the screen. As the user rotates the card toward the glare, it becomes more prominent, and as the user rotates away from the light source, the glare diminishes. Sinve I've already calculated the rotational values of the card, I can use those and rotate the sum of the values by 90 degrees:

```JavaScript
  ...
  var glarePos = rotateX + rotateY + 90;
  $(this)
    .children()
    .children()
    .css("left", glarePos + "%");
});
```

The glare objects themselves are grandchildren of the ```.card``` object, so I'll need to use ```.children()``` twice to target the CSS of the active ```card``` element.

The final thing we need to do is reset all these CSS values when the user's mouse leaves the bounds of the card:

```JavaScript
$(".card").mouseleave(function (e) {
  $(".card").css({"box-shadow": "0px 0px 3px rgba(0, 0, 0, 0.051), 0px 0px 7.2px rgba(0, 0, 0, 0.073), 0px 0px 13.6px rgba(0, 0, 0, 0.09), 0px 0px 24.3px rgba(0, 0, 0, 0.107), 0px 0px 45.5px rgba(0, 0, 0, 0.129), 0px 0px 109px rgba(0, 0, 0, 0.18)", "transform": "scale(1.0)"});
  $(".glare").css("left", "100%");
});
```

Whew 😰! We're done! Here it is all together:

```JavaScript
var limits = 15.0;

$(".card").mousemove(function (e) {
  var rect = e.target.getBoundingClientRect();
  var x = e.clientX - rect.left; //x position within the element.
  var y = e.clientY - rect.top; //y position within the element.
  var offsetX = x / rect.width;
  var offsetY = y / rect.height;

  var rotateY = (offsetX) * (limits * 2) - limits;
  var rotateX = (offsetY) * (limits * 2) - limits;

  var shadowOffsetX = (offsetX) * 32 - 16;
  var shadowOffsetY = (offsetY) * 32 - 16;

  $(this).css({
    "box-shadow": (1 / 6) * shadowOffsetX * -1 + "px " + (1 / 6) * shadowOffsetY * -1 + "px 3px rgba(0, 0, 0, 0.051), " +
      (2 / 6) * shadowOffsetX * -1 + "px " + (2 / 6) * shadowOffsetY * -1 + "px 7.2px rgba(0, 0, 0, 0.073), " +
      (3 / 6) * shadowOffsetX * -1 + "px " + (3 / 6) * shadowOffsetY * -1 + "px 13.6px rgba(0, 0, 0, 0.09), " +
      (4 / 6) * shadowOffsetX * -1 + "px " + (4 / 6) * shadowOffsetY * -1 + "px 24.3px rgba(0, 0, 0, 0.107), " +
      (5 / 6) * shadowOffsetX * -1 + "px " + (5 / 6) * shadowOffsetY * -1 + "px 45.5px rgba(0, 0, 0, 0.129), " +
      shadowOffsetX * -1 + "px " + shadowOffsetY * -1 + "px 109px rgba(0, 0, 0, 0.18)",
    transform: "perspective(1000px) rotateX(" + -rotateX + "deg) rotateY(" + rotateY + "deg)"
  });

  var glarePos = rotateX + rotateY + 90;
  $(this)
    .children()
    .children()
    .css("left", glarePos + "%");
});

$(".card").mouseleave(function (e) {
  $(".card").css({"box-shadow": "0px 0px 3px rgba(0, 0, 0, 0.051), 0px 0px 7.2px rgba(0, 0, 0, 0.073), 0px 0px 13.6px rgba(0, 0, 0, 0.09), 0px 0px 24.3px rgba(0, 0, 0, 0.107), 0px 0px 45.5px rgba(0, 0, 0, 0.129), 0px 0px 109px rgba(0, 0, 0, 0.18)", "transform": "scale(1.0)"});
  $(".glare").css("left", "100%");
});
```
