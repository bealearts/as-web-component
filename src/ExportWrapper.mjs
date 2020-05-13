
export default class ExportWrapper extends String {
  constructor(name, Comp) {
    super(name);

    this.Comp = Comp;
  }

  define(elementName, customElementRegistry = window.customElements) {
      customElementRegistry.define(elementName, this.Comp);
  }

  element() {
    return this.Comp;
  }
}
