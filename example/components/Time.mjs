import { html, render } from 'https://unpkg.com/htm/preact/standalone.module.js'
import asWebComponent from '../../src/asWebComponent.mjs';

function* Time() {
  const timer = setInterval(this.invalidate, 1000);

  while(this.isConnected) {
    yield html`
      <style>
        :host {
          display: inline-flex;
        }
      </style>

      <span>${now()}</span>
  `;
  }

  clearInterval(timer);
}

export default asWebComponent(Time, render);

function now() {
  return (new Date()).toLocaleTimeString();
}
