import { html, render } from 'https://unpkg.com/htm/preact/standalone.module.js'
import asWebComponent from '../src/asWebComponent.mjs';

function* PasswordField(showChars = false) {
  let password = '';

  const input = (event) => {
    password = event.target.value;
    this.invalidate();
  }

  while(this.isConnected) {
    [showChars = false] = yield html`
      <style>
        :host {
          display: inline-flex;
        }
      </style>

      <input type="${showChars ? 'text' : 'password'}" value="${password}" onInput=${input} />
  `;
  }
}

export default asWebComponent(PasswordField, render);
