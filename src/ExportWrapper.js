// eslint-disable-next-line max-classes-per-file
export default class ExportWrapper extends String {
  constructor(name, Comp) {
    super(name);

    this.element = Comp;
  }

  define(
    elementName,
    customElementRegistry = window.customElements,
    options = undefined
  ) {
    class Clone extends this.element {}
    customElementRegistry.define(elementName, Clone, options);
  }
}
