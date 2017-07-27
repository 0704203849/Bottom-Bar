# Mendix Croppie widget

## Description
A fast and easy to use image cropping widget based on the Croppie library from Foliotek.

## Typical usage scenario
- Uploading and cropping out part of an image and saving the result for use in the application.

## Limitations
No known limitations at the time of development.

## Configuration
In order to start using the Croppie widget, you need to place it inside a mendix dataview of an entity that inherits from System.Image.
That is all you need to do get the widget to work in your project. Further settings / properties are discussed below.

## Properties
* Width of view port - The width of the view port of the cropper
* Height of view port - The height of the view port of the cropper
* View port type - The type of the view port. This can either be a square or circle
* Width of boundary - The width of the outer container of the cropper
* Height of boundary - The height of the outer container of the cropper
* Enable orientation - Enable or disable support for specifying a custom orientation when binding images
* Enable zoom - Enable zooming functionality. If set to false - scrolling and pinching would not zoom
* Enforce boundary - Restricts zoom so image cannot be smaller than viewport
* Enable mouse wheel zoom - Enable or disable the ability to use the mouse wheel to zoom in and out on a croppie instance
* Show zoomer - Hide or Show the zoom slider

## Known bugs
No known limitations at the time of development.


