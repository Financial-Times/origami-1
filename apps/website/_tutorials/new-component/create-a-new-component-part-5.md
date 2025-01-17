---
title: Create A New Origami Component - Part 5 JavaScript
description: A step-by-step tutorial which teaches you how to build and deploy a new Origami component.
cta: Learn how to create an Origami component
collection_listing_display: false

# Redirect from legacy URLs
redirect_from:
  - /docs/tutorials/create-a-new-component-part-5/
---

# {{page.title}}

The "Create A New Origami Component" tutorial is split into nine parts and is intended to be followed sequentially from start to finish:
1. [Intro & Boilerplate](/documentation/tutorials/create-a-new-component-part-1/)
2. [Base Styles](/documentation/tutorials/create-a-new-component-part-2/)
3. [Themes & Brands](/documentation/tutorials/create-a-new-component-part-3/)
4. [Demos](/documentation/tutorials/create-a-new-component-part-4/)
5. JavaScript
6. [Storybook](/documentation/tutorials/create-a-new-component-part-6/)
7. [Testing](/documentation/tutorials/create-a-new-component-part-7/)
8. [Documentation](/documentation/tutorials/create-a-new-component-part-8/)
9. [Component Lifecycle](/documentation/tutorials/create-a-new-component-part-9/)

In part five we will add interactivity to our component using JavaScript. For reference, there is a [JavaScript part of the component specification](/specification/v1/components/javascript/) which we will be conforming to.

We'll increment a counter within the component which will update every time the button is clicked. The counter will have an option to display a customisable message after a given count e.g. after 10 clicks display the word "lots" instead.

## Initialising Component JavaScript

Our boilerplate JavaScript `main.js` and `/src/js/example` has all we need to [run (initialise) the component JavaScript](/specification/v1/components/javascript/#initialisation) and get any options we may want to allow users to configure.

All Origami components provide [an `init` method](/specification/v1/components/javascript/#initialisation) for running component JavaScript. Notice the JavaScript class for our component and its `init` method is defined in `/src/js/example` (where `example` is the component name without the `o-` prefix).

By default the `init` method will initialise any elements on the page which have the `data-o-component="o-example"` attribute. If a `HTMLElement` object or valid [`querySelector` expression](https://developer.mozilla.org/en-US/docs/Web/API/Document_object_model/Locating_DOM_elements_using_selectors) is given the `init` method will initialise the element given, or any children, with the `data-o-component="o-example"` attribute.

`main.js` has some standard code to automatically run the component's `init` method when the `o.DOMContentLoaded` Origami event is fired (see [o-autoinit](https://registry.origami.ft.com/components/o-autoinit@2.0.4/readme)). It also exports the component so users may alternatively import `main.js` and directly run `init` with relevant options for themselves.

For example a user could initialise all `o-example` elements on the page by including `o-autoinit`, which will fire the `o.DOMContentLoaded` event when the page is ready:

<pre><code class="o-syntax-highlight--js">// Initialise all elements on the page which have the
// `data-o-component="o-example"` attribute when
// `o-autoinit` fires the `o.DOMContentLoaded` event.
import 'o-autoinit';
import 'o-example';</code></pre>

Or by calling the `init` method with no arguments:

<pre><code class="o-syntax-highlight--js">// Initialise all elements on the page which have the
// `data-o-component="o-example"` attribute.
import oExample from 'o-example';
oExample.init();</code></pre>

Or a user could initialise a specific element, or its child elements, by calling the `init` method with an argument

<pre><code class="o-syntax-highlight--js">// Initialise the `.my-selector` element or any of its children
// which have the `data-o-component="o-example"` attribute.
import oExample from 'o-example';
const myElement = document.querySelector('.my-selector');
oExample.init(myElement);</code></pre>

<pre><code class="o-syntax-highlight--js">// Initialise the `.my-selector` element or any of its children
// which have the `data-o-component="o-example"` attribute.
import oExample from 'o-example';
oExample.init('.my-selector');</code></pre>

For more details see the [JavaScript initialisation](/specification/v1/components/javascript/#initialisation) section of the Origami specification.

## User Configuration

The second `init` argument is `options`, an `Object` of options for the user to configure the component. So users of [o-autoinit](https://registry.origami.ft.com/components/o-autoinit@2.0.4/readme) or the [Origami Build Service](https://www.ft.com/__origami/service/build/v3/) can also configure components, data attributes may alternatively be used to set component configuration.

In `/src/js/example` setting component configuration is handled in the constructor. The `this.options` property is assigned to the given `options` object, which is merged with any data attributes that have a namespace `data-o-example-[option]`.

For instance the `o-table` component has a sort feature which may be disabled by either passing `{sortable: false}` to the [`o-table` `init` method](https://registry.origami.ft.com/components/o-table@8.0.11/jsdoc?brand=core) or by adding the [`data-o-table-sortable="false"`](https://registry.origami.ft.com/components/o-table@8.0.11/readme?brand=core#disable-sort) attribute to the `o-table` element.

We'll add configuration options later to demonstrate. For full details see the [JavaScript configuration](/specification/v1/components/javascript/#configuration) section of the Origami specification.

## Interactivity

Lets start work on making our example component interactive.

We'll start by adding a `count` property, and listen for clicks on `o-example` buttons using the [`handleEvent`](https://medium.com/@WebReflection/dom-handleevent-a-cross-platform-standard-since-year-2000-5bf17287fd38) method to increment the count property.

Origami components use browser apis directly for [<abbr title="Document Object Model">DOM</abbr>](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model) manipulation. For instance [`Document.querySelector`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) to get an element and [`HTMLElement.innerText`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/innerText) to set an elements text content.

<pre><code class="o-syntax-highlight--js">// src/js/example.js

	/**
	 * Class constructor.
	 * @param {HTMLElement} [exampleEl] - The component element in the DOM
	 * @param {Object} [options={}] - An options object for configuring the component
	 */
	constructor (exampleEl, options) {
		this.exampleEl = exampleEl;
		this.options = Object.assign({}, {
		}, options || Example.getDataAttributes(exampleEl));
		// A property to store the current count.
		this.count = 0;
		// Listen to all click events on the o-example instance.
		this.exampleEl.addEventListener('click', this);
	}

	/**
	 * A method to handle event listeners.
	 * https://medium.com/@WebReflection/dom-handleevent-a-cross-platform-standard-since-year-2000-5bf17287fd38
	 * https://dom.spec.whatwg.org/#dom-eventlistener-handleevent
	 * @param {Event} event - The browser event which was triggered.
	 * @returns {void}
	 */
	handleEvent(event) {
		// When any button within the `o-example` component is clicked
		// increment the count.
		if (event.target.tagName === 'BUTTON') {
			this.count++;
			// Log the count temporarily so we can see this working.
			console.log(this.count);
		}
	}</code></pre>

<figure>
	<img alt="" src="/assets/images/tutorial-new-component/hello-world-demo-12-js.png" />
	<figcaption>
        The `o-example` component with the browsers developer tools open. The numbers 1 to 5 have been logged as the button has been clicked five times.
	</figcaption>
</figure>

Next we want to update our component to display the current count instead of logging the count to the browsers developer console. One way we could do that is my adding a `<span>` element to contain the current count and update its text content when the button is clicked. We'll identify the current count span with a namespaced data attribute `data-o-example-current-count`.

<pre><code class="o-syntax-highlight--diff">&lt;!-- demos/src/demo.mustache -->

&lt;div class="o-example &#123;&#123;#theme}}o-example--&#123;&#123;theme}}&#123;&#123;/theme}}" data-o-component="o-example">
-    Hello world, I am a component named o-example!
+    Hello world, I am a component named o-example! You have clicked this lovely button &lt;span data-o-example-current-count>0&lt;/span> times.
    &lt;button class="o-example__button">count&lt;/button>
&lt;/div>
</code></pre>

Now in our JavaScript we can get any current count element and update it when our click count is incremented.

<pre><code class="o-syntax-highlight--js">// src/js/example.js

handleEvent(event) {
    // When any button within the `o-example` component is clicked
    // increment the count.
    if (event.target.tagName === 'BUTTON') {
        this.count++;
        // Get all the elements within o-example with
        // the attribute data-o-example-current-count.
        const countElements = this.exampleEl.querySelectorAll('[data-o-example-current-count]');
        // For each count element found, update the count.
			for (const element of countElements) {
				element.innerText = this.count;
			}
    }
}</code></pre>

<figure>
	<img alt="" src="/assets/images/tutorial-new-component/hello-world-demo-13-js.png" />
	<figcaption>
        The `o-example` component now displays how many times the button has been clicked. Here it has been clicked over 10 times.
	</figcaption>
</figure>

Our example component now displays the click count. In the example above the button has been clicked over 10 times (what fun!) Instead of counting clicks infinitely, we should update the count to display a message "lots and lots of" after a user defined number of clicks.

To do that add an option `highCount` in the constructor, with a default value of `10`:

<pre><code class="o-syntax-highlight--js">// src/js/example.js

constructor (exampleEl, options) {
        this.exampleEl = exampleEl;
        // Get the `highCount` option from the `options` argument or
        // from a `data-o-example-high-count` data attribute, or
        // default to `10` if not set.
		this.options = Object.assign({}, {
            highCount: 10
		}, options || Example.getDataAttributes(exampleEl));
		// A property to store the current count.
		this.count = 0;
		// Listen to all click events on the o-example instance.
		this.exampleEl.addEventListener('click', this);
	}</code></pre>

And in the event handler update the counter element with the text "lots and lots of" after the button has been clicked the high count or more:

<pre><code class="o-syntax-highlight--js">// src/js/example.js

handleEvent(event) {
    // When any button within the `o-example` component is clicked
    // increment the count.
    if (event.target.tagName === 'BUTTON') {
        this.count++;
        // Get all the elements within o-example with
        // the attribute data-o-example-current-count.
        const countElements = this.exampleEl.querySelectorAll('[data-o-example-current-count]');
        // For each count element found, update the count.
        // If the count is equal to or above the high count display a message instead.
        const countText = this.count < this.options.highCount ?
            this.count :
            'lots and lots of';
        countElements.forEach(e => e.innerText = countText);
    }
}</code></pre>

<figure>
	<img alt="" src="/assets/images/tutorial-new-component/hello-world-demo-14-js.png" />
	<figcaption>
        The `o-example` component now says it has been clicked "lots and lots of time" if the click count is 10 or greater.
	</figcaption>
</figure>

## Browser Support

### Core Experience

Most projects which use Origami components serve a reduced "core" experience to older browsers, per the [Financial Times browser support policy](https://docs.google.com/document/d/1z6kecy_o9qHYIznTmqQ-IJqre72jhfd0nVa4JMsS7Q4/). The core experience at a minimum supports key and fundamental features without JavaScript. Origami components need to maintain these standards as a minimum.

A good component to demonstrate this is [o-table](https://registry.origami.ft.com/components/o-table@8.0.11). With JavaScript available `o-table` has client-side sortable columns. When JavaScript is unavailable client side sorting is not possible, and sort buttons are not displayed in table headings. Users without JavaScript have fewer features available but are not left with confusing sort buttons which do nothing, a kind of [graceful degradation](https://developer.mozilla.org/en-US/docs/Glossary/Graceful_degradation). `o-table` also has a responsive variant which allows the table to scroll horizontally on small devices. The scrolling table works for core experience users but is enhanced with JavaScript to include arrows for a more clear indication of when scrolling is possible, a kind of [progressive enhancement](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement).

At present our component displays a useless button for core experience users and when JavaScript [fails for some other reason](https://gds.blog.gov.uk/2013/10/21/how-many-people-are-missing-out-on-javascript-enhancement/). We can update our `o-example` component to hide the count button for core experience users and only display the message we have written.

So we know when our component JavaScript is initiated successfully lets add a data attribute `data-o-example-js` to our component as part of the constructor:

<pre><code class="o-syntax-highlight--diff">// src/js/example.js

constructor (exampleEl, options) {
		this.exampleEl = exampleEl;
		this.options = Object.assign({}, {
		}, options || Example.getDataAttributes(exampleEl));
		// A property to store the current count.
		this.count = 0;
		// Listen to all click events on the o-example instance.
		this.exampleEl.addEventListener('click', this);
+		// Set a data attribute so we know the component is initiated successfully.
+		// The attribute may be used in CSS to style our component conditionally.
+		this.exampleEl.setAttribute('data-o-example-js', '');
	}</code></pre>

Next lets wrap any counter specific part of `o-example` markup in a `span` element with the class `o-example__counter`:

<pre><code class="o-syntax-highlight--html">&lt;!-- demos/src/demo.mustache  -->

&lt;div id="element" class="o-example &#123;&#123;#theme}}o-example--&#123;&#123;theme}}&#123;&#123;/theme}}" data-o-component="o-example">
	Hello world, I am a component named o-example!
	&lt;span class="o-example__counter">
		You have clicked this lovely button &lt;span data-o-example-current-count>0&lt;/span> times.
		&lt;button class="o-example__button">count&lt;/button>
	&lt;/span>
&lt;/div>

</code></pre>

We can then then add CSS to `main.scss` to hide the counter element `o-example__counter` until the data attribute `data-o-example-js` has been added:

<pre><code class="o-syntax-highlight--diff">// main.scss

@mixin oExample ($opts: (
	'themes': ('inverse', 'b2c')
)) {
	// Get the themes to output from the `$opts` argument.
	// If the user has passed an `$opts` map without a
	// `themes` key, default to an empty list.
	$themes: map-get($opts, 'themes');
	$themes: if($themes, $themes, ());

	.o-example {
		@include oTypographyBody();
		border: 1px solid _oExampleGet('border-color');
		background: _oExampleGet('background-color');
		padding: oSpacingByName('s4');
		margin: oSpacingByName('s1');
	}

+	.o-example__counter {
+		display: none;
+	}
+
+	.o-example[data-o-example-js] .o-example__counter {
+		// Show the counter content when the javascript is initiated
+		// and the data attribute is added to the parent element
+		display: inline;
+	}

	.o-example__button {
		@include oButtonsContent($opts: ('type': 'primary'));
	}

	// Call the `oExampleAddTheme` mixin to output css
	// for each theme if the current brand supports it.
	@each $name in $themes {
		@if _oExampleSupports($name) {
			@include oExampleAddTheme($name);
		}
	}
}</code></pre>

<figure>
	<img alt="" src="/assets/images/tutorial-new-component/hello-world-demo-15-js.png" />
	<figcaption>
        With JavaScript unavailable our component falls back to its "Hello World" without the count feature.
	</figcaption>
</figure>

## Part Six: Storybook

In part five we learnt how to make our component interactive with JavaScript, covering:
- JavaScript initialisation using the `init` method.
- JavaScript configuration using the `init` argument or namespaced data attributes.
- How to update the <abbr title="Document Object Model">DOM</abbr> with component JavaScript.
- How to handle no JavaScript at all, to meet Financial Times browser support requirements.

In part six we'll look at writing storybook templates for our component. [Continue to part six](/documentation/tutorials/create-a-new-component-part-6).
