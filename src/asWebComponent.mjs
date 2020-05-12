import { getName, getAttributes } from './utils.mjs';

export default function asWebComponent(func, renderer) {
  const name = getName(func);
  const attributes = getAttributes(func);

  class Comp extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({ mode: 'open' });

      this.render = render.bind(this);
      this.invalidate = this.invalidate.bind(this);

      this.func = func.bind(this);
      this.generator = null;
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

  async function render() {
    const args = attributes
      .map(attr => {
        const value =  this.getAttribute(attr);
        return value === null ? undefined : value;
      });

    if (!this.generator) {
      const result = this.func(...args);
      if (!result.next) {
        const content = await result;
        renderer(content, this.shadowRoot);
      } else {
        this.generator = result;
      }
    }

    if (this.generator) {
      const iteration = await this.generator.next(args);
      if (iteration.done) return;
      renderer(iteration.value, this.shadowRoot);
    }
  }

  Comp.define(name);

  return name;
}
