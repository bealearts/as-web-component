import { html, render } from 'https://unpkg.com/htm/preact/standalone.module.js';
import asWebComponent, { isConnected } from 'https://unpkg.com/as-web-component/standalone.mjs';

async function* Counter() {
  this.count = 0;

  const inc = () => {
    this.count++;
  };

  const dec = () => {
    this.count--;
  };

  for await (const _ of this) {
    yield html`
      <style>
        :host {
          display: inline-flex;
        }

        span {
          margin: 0 1rem;
        }
      </style>

      <button onClick=${dec}>-</button>
      <span>${this.count}</span>
      <button onClick=${inc}>+</button>
  `;
  }
}

export default asWebComponent(Counter, render);
