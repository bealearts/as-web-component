import {
  getUniqueName, getName, getAttributes, getArgumentValues, getFieldValues, decorateWithProps
} from './utils.mjs';
import ExportWrapper from './ExportWrapper.mjs';
import self from './self.mjs';

export * from './exports.mjs';

export default function asWebComponent(func, renderer) {
  const component = getName(func);
  const name = getUniqueName(func);
  const attributes = getAttributes(func);

  const privateProps = new WeakMap();
  const privateFields = new WeakMap();

  class Comp extends HTMLElement {
    constructor() {
      super();
      privateProps.set(this, {});
      privateFields.set(this, {});

      this.attachShadow({ mode: 'open' });

      privateProps.get(this).self = self(this, attributes);
      privateProps.get(this).componentFunc = func.bind(privateProps.get(this).self);
    }

    static get observedAttributes() {
      return Array.from(attributes.keys());
    }

    connectedCallback() {
      this.setAttribute('data-component', component);

      const args = getArgumentValues(this, attributes);

      Object.entries(args).forEach(([arg, value]) => {
        if (value) this[arg] = value;
      });

      renderLoop.call(this);
    }
    //
    // adoptedCallback() {
    //   invalidate.call(this);
    // }

    attributeChangedCallback(attr, oldValue, newValue) {
      const arg = attributes.get(attr);
      this[arg] = newValue;
    }
  }

  async function renderLoop() {
    const fields = getFieldValues(this, attributes);
    const { componentFunc } = privateProps.get(this);

    const result = await componentFunc(...Object.values(fields));

    if (!result.next) {
      const content = await result;
      renderer(content, this.shadowRoot);
      return;
    }

    const iterator = result;
    while (true) {
      const iteration = await iterator.next();
      if (iteration.done) break;
      renderer(iteration.value, this.shadowRoot);
    }
  }

  decorateWithProps(Comp, attributes, privateFields, privateProps);

  const exportWrapper = new ExportWrapper(name, Comp);
  exportWrapper.define(name);

  return exportWrapper;
}
