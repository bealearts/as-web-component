import { html, render } from 'https://unpkg.com/htm/preact/standalone.module.js';
import asWebComponent, { watch } from 'https://unpkg.com/as-web-component/standalone.mjs';

async function* PasswordField(showChars) {
  this.password = '';

  const input = (event) => {
    this.password = event.target.value;
  };

  // eslint-disable-next-line no-param-reassign
  for await ({ showChars } of watch({ showChars })) {
    yield html`
      <style>
        :host {
          display: inline-flex;
        }
      </style>

      <input type="${showChars ? 'text' : 'password'}" value="${this.password}" onInput=${input} />
    `;
  }
}

export default asWebComponent(PasswordField, render);
