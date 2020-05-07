import { html, render } from 'https://unpkg.com/htm/preact/standalone.module.js'
import asWebComponent from '../';

function PreactComponent(name) {
  return html`<p>Hello ${name}</p>`;
}

export default asWebComponent(PreactComponent, rendner);
