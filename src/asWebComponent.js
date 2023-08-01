import {
  getUniqueName,
  getName,
  getAttributes,
  getArgumentValues,
  getFieldValues,
  decorateWithProps,
  isGeneratorFunction,
  $emit
} from './utils.js';
import ExportWrapper from './ExportWrapper.js';
import self from './self.js';

export * from './exports.js';

export default function asWebComponent(
  func,
  renderer,
  { baseElement = undefined, baseClass = HTMLElement, effect = undefined } = {}
) {
  const component = getName(func);
  const name = getUniqueName(component);
  const attributes = getAttributes(func);
  const isGenerator = isGeneratorFunction(func);

  const privateProps = new WeakMap();
  const privateFields = new WeakMap();

  class Comp extends baseClass {
    constructor() {
      super();
      privateProps.set(this, {});
      privateFields.set(this, {});

      this.attachShadow({ mode: 'open' });

      privateProps.get(this).self = self(this, attributes);
      privateProps.get(this).componentFunc = func.bind(
        privateProps.get(this).self
      );
      privateProps.get(this).isFirstRender = true;
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

    attributeChangedCallback(attr, _, newValue) {
      const arg = attributes.get(attr);
      this[arg] = newValue;
    }
  }

  async function renderLoop() {
    const { componentFunc } = privateProps.get(this);

    if (!isGenerator) {
      for await (const _ of privateProps.get(this).self) {
        const fields = getFieldValues(this, attributes);
        const content = await componentFunc(...Object.values(fields));
        renderer(content, this.shadowRoot);
      }

      return;
    }

    const fields = getFieldValues(this, attributes);
    for await (const content of componentFunc(...Object.values(fields))) {
      renderer(content, this.shadowRoot);
      // Render on use of this prop .value which is a signal
      if (privateProps.get(this).isFirstRender && effect) {
        privateProps.get(this).isFirstRender = false;
        for (const prop in privateProps.get(this).self) {
          if (
            typeof privateProps.get(this).self[prop] === 'object' &&
            'value' in privateProps.get(this).self[prop]
          ) {
            effect(() => {
              const _ = privateProps.get(this).self[prop]?.value;
              privateProps.get(this).self[$emit]();
            });
          }
        }
      }
    }
  }

  decorateWithProps(Comp, attributes, privateFields, privateProps);

  const exportWrapper = new ExportWrapper(name, Comp);
  exportWrapper.define(
    name,
    undefined,
    baseElement ? { extends: baseElement } : undefined
  );

  return exportWrapper;
}
