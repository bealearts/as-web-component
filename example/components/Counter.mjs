import { html, render } from 'https://unpkg.com/htm/preact/standalone.module.js';
import asWebComponent, { invalidate, isConnected } from 'https://unpkg.com/as-web-component/standalone.mjs';

function* Counter() {
  let count = 0;

  const inc = () => {
    count++;
    invalidate(this);
  };

  const dec = () => {
    count--;
    invalidate(this);
  };

  while (isConnected(this)) {
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
      <span>${count}</span>
      <button onClick=${inc}>+</button>
  `;
  }
}

export default asWebComponent(Counter, render);
