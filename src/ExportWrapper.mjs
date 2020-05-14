// eslint-disable-next-line max-classes-per-file
export default class ExportWrapper extends String {
  constructor(name, Comp) {
    super(name);

    this.Comp = Comp;
  }

  define(elementName, customElementRegistry = window.customElements) {
    class Clone extends this.Comp {}
    customElementRegistry.define(elementName, Clone);
  }

  element() {
    return this.Comp;
  }
}
