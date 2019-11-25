const opts = {
  root: null,
  rootMargin: "0px",
  threshold: [0]
}

function prefetch(url) {  
  return fetch(url, {credentials: `include`, cache: 'force-cache'}).then(async res => await res.blob())
}

function loadSrc(target, io){
  target.removeAttribute('srcset');
  io.unobserve(target);
}

const io = new IntersectionObserver((entries) => {
  entries.forEach(({isIntersecting, target}) => {
    if(isIntersecting){
      loadSrc(target, io);
      const link = target.getAttribute('link');
      if(link){
        target.addEventListener('load', () => prefetch(link), {once: true});
      }
    }
  })
}, opts);

export default class LazyLoadable extends HTMLImageElement {
  constructor(width, height){
    super(width, height);
  }

  get loading(){
    return this.getAttribute('loading')
  }

  get isModern(){
    return ('loading' in HTMLImageElement.prototype)
  }

  connectedCallback(){
    if(this.loading === 'lazy'){
      return io.observe(this);
    }
    // default behaviour is to eagerly load the image
    loadSrc(this, io);
  }

  disconnectedCallback(){
    io.unobserve(this);
  }
}