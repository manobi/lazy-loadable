# Native lazy load boilerplate

* 🧱 Pollyfill for modern browsers not supporting it yet
* 👵 Gracefully degrades for old browsers
* 🤖 Future proof markup
* 🚉 Using the platform

The whole idea is to create a copy-past boilerplate that works today. If by a miracle all browser vendors agree to ship native lazy load, you would **only have to change one place**.

```
npm install lazy-loadable
```

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
<!-- 2. Img HTML extension -->
<script type="module">
    import LazyLoadable from 'lazy-loadable';
    customElements.define('lazy-loadable', LazyLoadable, { extends: "img" });
</script>
```

## Img Attributes breakdown

***is="lazy-loadable"***

Apply the lazy-loadable custom element pollyfill behaviour to your image tag.

***loading="lazy"***

The native way to tell the browser to delay the image loading until it's in the screen. Only Google Chrome have [shipped it yet](https://caniuse.com/#feat=loading-lazy-attr).

***lazyload="1"***

It seems [Microsoft](https://msdn.microsoft.com/en-us/ie/dn369270(v=vs.94)) implemented on IE 11 and Edge 12 a [unofficial attribute](https://caniuse.com/#feat=lazyload) called lazyload.
But it does not work the same way as "loading=lazy", it only tell the browser to decrese the priority of the resource. Actually it's pretty similar to what "importance=low" does.

***importance="low"***

This is a [spec proposal](https://wicg.github.io/priority-hints/) to enabling developers to signal the priority of each resource they need to download. In case a browser vendor never implement the "native lazy load", but for any reason ship the priority hints support, we would at least download the image without high priority.

***srcset***
Since there is no ways yet to know if the browser have native support before images starts loading we need to set a placeholder image.

Our placeholder is the one responsible for the magic. I've chosen to use srcset as placeholder instead of a infamous "data-src". By placing the placeholder on "srcattr", we can hold the "src" loading, until we are sure if the browser handles lazy by default. In future if all browsers support native lazy-load, all you would have to do is remove this attribute from your html.

The great advantage of using "srcattr" instead of "data-src" is that when you remove the placeholder, browsers already knows what to do, respecting the standard fallback src, picture source, media attributes and pixel density.

***width & height***
Explicitally declare the image size to avoid page jumps.

## Safari custom elements pollyfill

Apple have chosen to not ship a complete implementation of Custom elements V1, in order for it to work in Safari I recomend placing the [ungap pollyfill](https://github.com/ungap/custom-elements-builtin) before your scripts:

```html
<script>
    if(this.customElements)
    try{customElements.define('built-in',document.createElement('p').constructor,{'extends':'p'})}
    catch(s){document.write('<script src="//unpkg.com/@ungap/custom-elements-builtin"><\x2fscript>')}
    else
    document.write('<script src="//unpkg.com/document-register-element"><\x2fscript>');
</script>
````

## License

Distributed under the MIT license. See LICENSE for details.
