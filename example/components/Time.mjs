import { html, render } from 'https://unpkg.com/htm/preact/standalone.module.js';
import asWebComponent, { isConnected } from 'https://unpkg.com/as-web-component/standalone.mjs';

async function* Time() {
  while (isConnected(this)) {
    yield html`
      <style>
        :host {
          display: inline-flex;
        }
      </style>

      <span>${now()}</span>
    `;
    await delay(1000); // eslint-disable-line no-await-in-loop
  }
}

export default asWebComponent(Time, render);

function now() {
  return (new Date()).toLocaleTimeString();
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
