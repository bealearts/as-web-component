import { getName, getAttributes } from './utils.mjs';
import ExportWrapper from './ExportWrapper.mjs';
import self from './self.mjs';

export default function asWebComponent(func, renderer) {
  const name = getName(func);
  const attributes = getAttributes(func);

  class Comp extends HTMLElement {
    constructor() {
      super();

      this.attachShadow({ mode: 'open' });

      this.func = func.bind(self(this, invalidate));
      this.generator = null;
    }

    static get observedAttributes() {
      return attributes;
    }

    connectedCallback() {
      invalidate.call(this);
    }

    adoptedCallback() {
      invalidate.call(this);
    }

    attributeChangedCallback() {
      invalidate.call(this);
    }
  }

  function invalidate() {
    window.requestAnimationFrame(() => render.call(this));
  }

  async function render() {
    const args = attributes
      .map(attr => {
        const value = this.getAttribute(attr);
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

  const exportWrapper = new ExportWrapper(name, Comp);
  exportWrapper.define(name);

  return exportWrapper;
}
