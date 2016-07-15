# Focus point field type for Craft CMS

A plugin for Craft CMS based on jQuery FocusPoint (https://github.com/jonom/jquery-focuspoint). This create a new field type "Focus Point" where you can choose coordinates on an image for the focus point. It's a good way to use the same field/image for multiple crops or responsive images.

## Requirements

Tested on Craft 2.5 and 2.6. No other specific requirement.

## How to install

Download the latest release and unzip the focuspoint folder in the plugins directory. Install it via the administration plugins page.

## How to use

Create a new field with the type "Focus Point". On an entry (or any content), choose coordinates for each uploaded assets on the field.

In your template, you can access the focus point data this way (you should load jQuery FocusPoint javascript on the front-end and initialize it) :

```html
{% set image = entry.image.first() %}
<div class="focuspoint"
	data-focus-x="{{ image.focusX }}"
	data-focus-y="{{ image.focusY }}"
	data-image-w="{{ image.width }}"
	data-image-h="{{ image.height }}">
	<img src="{{ image.url }}">
</div>
```

Alternatively, you can use it in combination with Imager (https://github.com/aelvan/Imager-Craft) without the need to load any javascript :

```html
{% set image = entry.image.first() %}
{% set transformedImage = craft.imager.transformImage(image, {
    width: 800,
    height: 600,
    mode: 'crop',
    position: image.focusPctX ~ '% ' ~ image.focusPctY ~ '%'
}) %}
<img src="{{ transformedImage.url }}">
```

or as a background image in css :

```html
{% set image = entry.image.first() %}
<div style="background-image: url('{{ image.url }}');
    background-size: cover;
    background-position: {{ image.focusPctX }}% {{ image.focusPctY }}%;">
</div>
```

## Screenshots

![Edit field](https://raw.githubusercontent.com/smcyr/Craft-FocusPoint/master/screenshots/field.JPG)

![Edit Focus point popup](https://raw.githubusercontent.com/smcyr/Craft-FocusPoint/master/screenshots/fieldedit.JPG)