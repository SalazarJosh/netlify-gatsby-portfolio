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

Here's what I'm going to build:

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

I'm not doing anything too fancy with the base card layer. This is a slightly-transparent rectangle with a backdrop-filter effect. The backdrop-filter allows me to blur the background image and add a bit more texture to the card. Since I'm using 3 cards in my Pen, I'm also using CSS Grid to align the items.

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
The ```.wrapper``` class is the wrapper for our grid. I'm using the ```grid-template-columns``` property and setting each of the three columns to ```1fr```. Learn more about the 'fr' unit from <a href="https://www.w3.org/TR/css3-grid-layout/#fr-unit">the W3 spec here</a>. I'm setting the ```align-items``` and ```justify-items``` properties to center to align the cards within the center of their respective containers. Finally, I set the height of the wrapper to ```100vh``` to ensure the cards can vertically align to the full height of the viewport.

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

Each line of the ```box-shadow``` property is another box-shadow. So I'm creating 6 box-shadows with varying levels of blur and black opacity. This gives me a smooth and authentic looking shadow.

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

You may have noticed I already added the ```glare-container``` and ```glare``` classes as children to the cards in the HTML. The layers, as children to the card layer, will allow us to contain the visual elements within the bounds of the card and take any transforms from the card.

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

Setting ```pointer-events: none;``` on the glare is important for making the interaction functional. I only want to detect mouse movement on the card itself. Since the glare is on top of the card, if I didn't ignore mouse interactions on it, the pointer will be blocked by the glare layer and won't make it through to the card layer.

Most of the magic is happening in the ```.glare``` class. The glare itself is a linear gradient on a square with a blur effect applied to it. The layer is rotated 35 degrees and moved outside the bounds of the card. The ```.glare-container``` is hiding the overflow of the glare, setting the width and height, and positioning it relative to the card.

## JavaScript Interactivity
Now we get to the fun JavaScript portion. In summary, I want to change the CSS when the user mouses over the card object. I'm using JQuery to make changing the CSS easier to write and read.

Since all interaction is dependent on the position of the mouse within the card, I need to get the user's mouse position within the bounds of the card.

I'll use the JQuery ```.mousemove()``` on the ```$("card")``` layer to accomplish this.

The rest of the variables are simply getting the mouse position within the card.

```javascript
$(".card").mousemove(function (e) {
  var rect = e.target.getBoundingClientRect();
  var x = e.clientX - rect.left; //width of the card.
  var y = e.clientY - rect.top; //height of the card.

  var offsetX = x / rect.width; //x mouse position
  var offsetY = y / rect.height; //y mouse position
}
```
Next I want to calculate the rotation angle of the card and the shadow offset position. I want to make it appear as if the card is rotating away from the user's mouse by manipulating the card's shadow and by rotating the card.

I use the mouse position (offsetX and offsetY) values I calculated above to get the shadow and rotation values.

```JavaScript
var limits = 15.0;

$(".card").mousemove(function (e) {
  ...
  
  var rotateY = (offsetX) * (limits * 2) - limits; // rotation of the card on the x-axis
  var rotateX = (offsetY) * (limits * 2) - limits; // rotation of the card on the y-axis

  var shadowOffsetX = (offsetX) * 32 - 16; // shadow offset on the x-axis
  var shadowOffsetY = (offsetY) * 32 - 16; // shadow offset on the y-axis
```

### Explanation of rotation values
The global ```limits``` value allows me to quickly modify the maximum amount of degrees I want to rotate the card. I can increase the value to get more dramatic results on hover, or decrease the value to get the opposite effect.

I'm going to use these values and plug them into the CSS to change the display of the card. For the rotation, I'll use the ```transform: rotateX()``` and ```transform: rotateY()``` CSS functions. The values plugged into these functions are degrees. So, for example, ```transform: rotateX(15deg)``` would rotated the card 15 degrees.

The ```offsetX``` and ```offsetY``` values (mouse position) are a range from 0 to 1; The coordinate 0, 0 being the upper-left corner of the card, and coordinate 1,1 being the lower-right corner, and coordinate .5, .5 being the middle of the card. To convert that to a range of -15 to 15 I multiply that value by twice the limits (which, again, is 15). That will get me a range from 0 to 30. If I left it there the card would rotate up to 30 degrees to the right and up to 30 degrees down, but would not rotate to the left or up. 

To rotate left and/or up, I need to use negative values. To rotate the card in the negative direction, I shift that range down by 15 by subtracting the limits from the result. That gives me a final range of -15 to 15.

### Explanation of shadow values
I could actually just leave it here! Since I'm rotating the card in 3D space, the shadows will automatically rotate respective to the card. However, it doesn't look very natural as the shadow will always be directly under the card.

So instead, I'm going to move each shadow layer individually depending on where the user's mouse is within the card. I'm going to use the same ```box-shadow``` I defined on the ```.card``` CSS but change the values.  This will create an additional layer of depth as the card rotates.

Examining the ```box-shadow``` <a href="https://www.w3schools.com/cssref/css3_pr_box-shadow.asp">propery syntax</a>, the first two values are the horizontal-offset and vertical-offset. These two values are required. Initially I set each of them to 0 so each layer of the box-shadow is directly under the card. For example, ```box-shadow: 10px 10px #fff``` would shift the box-shadow 10px to the right and 10px down. Negative values shift the shadows up and to the left.

I want to shift the shadows by up to 16 px in each direction. Similar to the rotation values, I'll take the mouse position (which is a range from 0 - 1) and multiply by twice the desired rotation (in this case, 16). That will give me a range from 0 - 32. In other words, the shadow will now move up to 32 pixels to the right and up to 32 pixels down. To shift that range down by 16 pixels I'll simply subtract 16 from the result.

### Plugging the values into the CSS

Now I'll use those values and plug them into the CSS. I'm going to use JQuery's ```.css``` function to make this work. The syntax, in its simplest form, is as follows:

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
I'm using the ```shadowOffsetX``` and ```shadowOffsetY``` values and plugging them into the 6 shadows that I defined previously in the CSS. Then I'm rotating the card using the ```transform``` property.

The ```shadowOffset``` values are a range from -16 to 16, depending on where the user is hovering on the card. I move each shadow layer by that value, but I also multiply the offset by a fraction for each layer. Since each layer of the box-shadow represents a different shadow, and each shadow is used to show different levels of depth, I shift each layer by a fraction of the offset to keep that feeling of depth. I move the closest layers the most, and furthest layers the least.

### Glare movement

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

### Resetting the values

The final thing we need to do is reset all these CSS values when the user's mouse leaves the bounds of the card:

```JavaScript
$(".card").mouseleave(function (e) {
  $(".card").css({"box-shadow": "0px 0px 3px rgba(0, 0, 0, 0.051), 0px 0px 7.2px rgba(0, 0, 0, 0.073), 0px 0px 13.6px rgba(0, 0, 0, 0.09), 0px 0px 24.3px rgba(0, 0, 0, 0.107), 0px 0px 45.5px rgba(0, 0, 0, 0.129), 0px 0px 109px rgba(0, 0, 0, 0.18)", "transform": "scale(1.0)"});
  $(".glare").css("left", "100%");
});
```

### All the JavaScript together
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

I know this was a bit more dense of a read, but I personally love exploring the details of how something works. It's easier for me to take the code and adjust the values and use console.log to see what's happening. Simply reading how it's done will not allow me to grasp the concept. If you're like me and would benefit more from playing with the code yourself, I would encourage you to <a href="https://codepen.io/joshsalazar/pen/GROEmRj?editors=1111">fork the CodePen</a> and play with the values.

Happy learning! 👍