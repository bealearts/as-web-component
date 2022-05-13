import { html, render } from 'https://unpkg.com/htm/preact/standalone.module.js';
import asWebComponent, { isConnected, invalidate } from 'https://unpkg.com/as-web-component/standalone.mjs';

function* PasswordField(showChars = false) {
  let password = '';

  const input = (event) => {
    password = event.target.value;
    invalidate(this);
  };

  while (isConnected(this)) {
    // eslint-disable-next-line no-param-reassign
    ({ showChars = false } = yield html`
      <style>
        :host {
          display: inline-flex;
        }
      </style>

      <input type="${showChars ? 'text' : 'password'}" value="${password}" onInput=${input} />
  `);
  }
}

export default asWebComponent(PasswordField, render);
