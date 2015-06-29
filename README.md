AlphaScroll
=======================

An indexed scrollbar plugin using jQuery
___

AlphaScroll adds an alphabetized scrolling widget to lists with specific dividers. The widget addresses the difficulty of quickly scrolling large lists on small mobile device screens.

[Try a demo that uses Bootstrap.](https://rawgit.com/banesto/alphascroll/master/demo/index.html)

_In the example, alphascroll appears only when width is less than 792px so that it does not overflow content._

![Screenshot](https://raw.github.com/banesto/alphascroll/master/example.png)

##Uses:

AlphaScroll is for use on listviews that are alphabetically sorted and include dividers: `data-role="list-divider"`.

AlphaScroll responds to orientation change events to display a shortened list of letters when in landscape mode or when the screen has a height of less than 326 pixels.

##Features
* No jQuery Mobile requirement
* Ability to separate list into wrappers - suitable for Bootstrap
* If content exists in the list, clicking on alphabet navigation letter scrolls content
* Clicking on non-existing content navigation link leads to previous letter's last item ~~or very top of the page~~
* Smooth content scrolling
* Compatible with bootstrap

##Setup

First, include the AlphaScroll CSS and JavaScript files in your HTML:

```html
<link rel="stylesheet" type="text/css" href="css/jquery.alphascroll.css" />
<script type="text/javascript" src="js/jquery.alphascroll.js"></script>
```

Here's the example of html:

```html
<div id="author-list">
  <ul>
    <li data-role="list-divider" role="heading" class="a">A</li>
    <li data-first-letter="a"><a href="#">Amelia Webster</a></li>
    <li data-first-letter="a"><a href="#">Andrew WifKinson</a></li>
    <li data-first-letter="a"><a href="#">Archibald Carrington</a></li>
    <li data-first-letter="a"><a href="#">Ariana Clapton</a></li>
    <li data-first-letter="a"><a href="#">Ashley Carter</a></li>
    <li data-role="list-divider" role="heading" class="b">B</li>
    <li data-first-letter="b"><a href="#">Brenda Brown</a></li>
    <li data-first-letter="b"><a href="#">Brooke Creighton</a></li>
  </ul>
</div>
```

So then you can initiate alphaScroll like that:

```javascript
$('#author-list').alphascroll();
```

##Customization

The AlphaScroll plugin in its current state doesn't take any options. You may alter the look and placement of the scroll widget by editing the CSS in jquery.alphascroll.css.

##Caveats

Testing on an iPhone 5, scrolling rapidly back and forth on the alphascroll widget can cause some screen flashing. This doesn't seem to happen on desktop browsers and is likely due to the slower processor speed of mobile devices.