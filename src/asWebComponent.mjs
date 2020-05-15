import { getName, getAttributes, getArgumentValues, getFieldValues, decorateWithProps } from './utils.mjs';
import ExportWrapper from './ExportWrapper.mjs';
import self from './self.mjs';

export default function asWebComponent(func, renderer) {
  const name = getName(func);
  const attributes = getAttributes(func);

  const privateProps = new WeakMap();
  const privateFields = new WeakMap();

  class Comp extends HTMLElement {
    constructor() {
      super();
      privateProps.set(this, {});
      privateFields.set(this, {});

      this.attachShadow({ mode: 'open' });

      privateProps.get(this).func = func.bind(self(this, invalidate));
      privateProps.get(this).generator = null;
    }

    static get observedAttributes() {
      return Array.from(attributes.keys());
    }

    connectedCallback() {
      const args = getArgumentValues(this, attributes);

      Object.entries(args).forEach(([arg, value]) => {
        if (value) this[arg] = value;
      });

      invalidate.call(this);
    }

    adoptedCallback() {
      invalidate.call(this);
    }

    attributeChangedCallback(attr, oldValue, newValue) {
      const arg = attributes.get(attr);
      this[arg] = newValue;
    }
  }

  function invalidate() {
    window.requestAnimationFrame(() => render.call(this));
  }

  async function render() {
    const fields = getFieldValues(this, attributes);

    const func = privateProps.get(this).func;
    let generator = privateProps.get(this).generator;

    if (!generator) {
      const result = func(...Object.values(fields));
      if (!result.next) {
        const content = await result;
        renderer(content, this.shadowRoot);
      } else {
        privateProps.get(this).generator = result;
      }
    }

    generator = privateProps.get(this).generator;
    if (generator) {
      const iteration = await generator.next(fields);
      if (iteration.done) return;
      renderer(iteration.value, this.shadowRoot);
    }
  }

  decorateWithProps(Comp, attributes, privateFields, invalidate);

  const exportWrapper = new ExportWrapper(name, Comp);
  exportWrapper.define(name);

  return exportWrapper;
}
