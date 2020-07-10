# Compressor
The online image compressor. Reduce image size of JPEG, PNG files online.
Compress images and photos for displaying on web pages.

## How does it work?
Compressing image with HTML5 canvas.

- Read the files using the HTML5 FileReader API.
- Image file to base64 format.
- Send the image to the canvas. The canvas size is set to desired output size.
- On backend, read the dataURI, decode from Base64, and save it


## Can you tell the difference?

## Browser Compatibility

| Browser | Version |
| :------ | :-----: |
| IE      | 10+     |
| Chrome  | 22+     |
| Firefox | 16+     |
| Safari  | 8+      |
| Android Browser | 4+ |
| Chrome for Android | 32+ |
| iOS Safarri | 7+ |