# Craft-FocusPoint

A plugin for Craft CMS based on jQuery FocusPoint (https://github.com/jonom/jquery-focuspoint). This create a new field type "Focus Point" where you can choose coordinates on an image for the focus point. It's a good way to use the same field/image for multiple crops or responsive images.

## How to install

Put the focuspoint folder in the plugins directory and install it via the administration.

## How to use

Create a new field with the type "Focus Point". On an entry (or any content), choose coordinates for each uploaded assets on the field.

In your template, you can access the focus point data this way (you should load jQuery FocusPoint javascript on the front-end and initialize it) :

```html
{% set image = entry.image.first() %}
<div class="focuspoint"
	data-focus-x="{{ image.x }}"
	data-focus-y="{{ image.y }}"
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
    position: image.getPctX() ~ '% ' ~ image.getPctY() ~ '%'
})
<img src="{{ transformedImage.url }}">
```

or as a background image in css :

```html
{% set image = entry.image.first() %}
<div style="background-image: url('{{ image.url }}');
    background-size: cover;
    background-position: {{ image.getPctX() }}% {{ image.getPctY() }}%;">
</div>
```

## Roadmap

* Find a better way to integrate the UI on the administration pages