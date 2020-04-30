import funcArgs from '/web_modules/fn-args.js';
import { paramCase } from "/web_modules/param-case.js";
import shortid from '/web_modules/shortid.js';

export default function asComponent(func, renderer) {
  const name = getName(func);
  const attributes = getAttributes(func);

  class Comp extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({ mode: 'open' });

      this.render = render.bind(this);
    }

    static define(elementName, customElementRegistry = window.customElements) {
        customElementRegistry.define(elementName, Comp);
    }

    static get element() {
      return Comp;
    }

    static get observedAttributes() {
      return attributes;
    }

    connectedCallback() {
      this.invalidate();
    }

    adoptedCallback() {
      this.invalidate();
    }

    attributeChangedCallback() {
      this.invalidate();
    }

    invalidate() {
      window.requestAnimationFrame(this.render);
    }
  }

  function render() {
    if (!this.isConnected) return;

    const args = attributes
      .map(attr => this.getAttribute(attr));

    renderer(func.apply(this, args), this.shadowRoot);
  }

  Comp.define(name);

  return name;
}


function getAttributes(func) {
  const args = funcArgs(func);
  return args.map(arg => paramCase(arg));
}

function getName(func) {
  return `${paramCase(func.name)}-${shortid().toLowerCase()}`;
}
