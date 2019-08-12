# Native lazy load boilerplate

* 🧱 Pollyfill for modern browsers not supporting it yet
* 👵 Gracefully degrades for old browsers
* 🤖 Future proof markup
* 🚉 Using the platform

The whole idea is to create a copy-past boilerplate that works today. If by a miracle all browser vendors agree to ship native lazy load, you would **only have to change one place**.

## Boilerplate
```html
<!-- 1. Markup -->
<img 
    is="lazy-loadable" 
    loading="lazy" 
    lazyload="1" 
    importance="low" 
    srcset="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAEElEQVR42gEFAPr/AP///wAI/AL+Sr4t6gAAAABJRU5ErkJggg==" 
    src="https://placekitten.com/400/400" 
    width="400" 
    height="400" 
    alt=""
>
<!-- 2. Safari - Custom elements pollyful -->
<script>
    if(this.customElements)
    try{customElements.define('built-in',document.createElement('p').constructor,{'extends':'p'})}
    catch(s){document.write('<script src="//unpkg.com/@ungap/custom-elements-builtin"><\x2fscript>')}
    else
    document.write('<script src="//unpkg.com/document-register-element"><\x2fscript>');
</script>
<!-- 3. Img HTML extension -->
<script type="module">
    import LazyLoadable from '../index.js';
    customElements.define('lazy-loadable', LazyLoadable, { extends: "img" });
</script>
```


## Custom elements
custom elements instead of querySelectorAll cuz no forEach needed
better for inifinity scroll when images are not present when the for each loads
## src-set instead of data-src use the platform, because removing it will fallback to browser default behaviour
## In future all we would
## data-src swap techinique is not exactly compatible with picture source
##
lazyload="1" importance="low"


  

## Installation

```
$ npm install @github/custom-element-element
```

## Usage

```js
import '@github/custom-element-element'
```

```html
<custom-element></custom-element>
```

## Browser support

Browsers without native [custom element support][support] require a [polyfill][].

- Chrome
- Firefox
- Safari
- Microsoft Edge

[support]: https://caniuse.com/#feat=custom-elementsv1
[polyfill]: https://github.com/webcomponents/custom-elements

## Development

```
npm install
npm test
```

## License

Distributed under the MIT license. See LICENSE for details.
