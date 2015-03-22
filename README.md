# Telescope Hero Banner Plugin

A simple plugin that lets you add a configurable hero banner to your Telescope site.  

## Install

```
meteor add jeremy:telescope-plugin-hero
```


## Customization

Once logged in as an admin, you should see a small tab at the top right of the page that will toggle the hero configuration window.  You can configure the background image, main and secondary headings, some additional HTML (appears below the main headings), and some custom CSS.  

Note that any styles entered in the custom CSS box can effect the site globally, so make sure to be specific enough with your selectors. Also, when you turn the hero off with the switch on the overlay, the custom CSS will be disabled as well.

If you'd like to customize the hero with your own CSS, the markup essentially looks like this...

```html
<section class="hero" style="background-image: url('Hero image URL')">
  <div class="hero-inner">
    <div class="copy">
      <h1>Main Heading</h1>
      <h3>Secondary Heading</h3>
      <!-- Extra HTML inserted here -->
    </div>
  </div>
</section>
```


## Future
Feature suggestions and pull requests welcome!

