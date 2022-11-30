import { html, render } from 'https://unpkg.com/htm/preact/standalone.module.js';
import asWebComponent from 'https://unpkg.com/as-web-component/standalone.mjs';

async function* Time() {
  this.ts = now();

  const timer = setInterval(() => {
    this.ts = now();
  }, 1000);

  for await (const { ts } of this) {
    yield html`
      <style>
        :host {
          display: inline-flex;
        }
      </style>

      <span>${ts}</span>
    `;
  }

  clearInterval(timer);
}

export default asWebComponent(Time, render);

function now() {
  return (new Date()).toLocaleTimeString();
}
