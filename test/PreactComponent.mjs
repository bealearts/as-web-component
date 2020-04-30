import { html, render } from 'https://unpkg.com/htm/preact/standalone.module.js'
import asComponent from '../';

function PreactComponent(name) {
  return html`<p>Hello ${name}</p>`;
}

export default asComponent(PreactComponent, rendner);
