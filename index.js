/**
 * Lazyload component
 * IE &  edge: https://msdn.microsoft.com/en-us/ie/dn369270(v=vs.94)
 */
const opts = {
  // The root to use for intersection.
  // If not provided, use the top-level documentÃ¢â‚¬â„¢s viewport.
  root: null,
  // Same as margin, can be 1, 2, 3 or 4 components, possibly negative lengths.
  // If an explicit root element is specified, components may be percentages of the
  // root element size.  If no explicit root element is specified, using a percentage
  // is an error.
  rootMargin: "0px",
  // Threshold(s) at which to trigger callback, specified as a ratio, or list of
  // ratios, of (visible area / total area) of the observed element (hence all
  // entries must be in the range [0, 1]).  Callback will be invoked when the visible
  // ratio of the observed element crosses a threshold in the list.
  threshold: [0]
}

const toPrefetch = new Set();
function prefetch(url) {
  toPrefetch.add(url)
  fetch(url, {credentials: `include`, cache: 'force-cache'}).then(async res => await res.blob())
}

function callback(entries){
  entries.forEach((entry) => {
      if(entry.isIntersecting && !entry.target.getAttribute('data-swapeded')){
        const link = entry.target.getAttribute('link');
        if(link){
          entry.target.addEventListener('load', () => prefetch(link), {once: true});
          entry.target.removeAttribute('link');
        }
        entry.target.removeAttribute('srcset');
        entry.target.setAttribute('data-swapeded', true);
        
        //this.disconnect(entry.target);
      }
  });
}

const io = new IntersectionObserver(callback, opts);

export default class LazyLoadable extends HTMLImageElement {
  constructor(width, height){
    super(width, height);
  }

  get isModern(){
    return ('loading' in HTMLImageElement.prototype)
  }

  connectedCallback(){
    if(!this.isModern){
      return io.observe(this);
    }
    this.removeAttribute('srcset');
  }

  disconnectedCallback(){
    io.disconnect(this);
  }
}