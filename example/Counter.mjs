import { html, render } from 'https://unpkg.com/htm/preact/standalone.module.js'
import asWebComponent from '../src/asWebComponent.mjs';

function* Counter() {
  let count = 0;

  const inc = () => {
    count++;
    this.invalidate();
  }

  const dec = () => {
    count--;
    this.invalidate();
  }

  while(this.isConnected) {
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
