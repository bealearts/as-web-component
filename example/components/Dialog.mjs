import { html, render } from 'https://unpkg.com/htm/preact/standalone.module.js';
import asWebComponent, { isConnected } from 'https://unpkg.com/as-web-component/standalone.mjs';

function* Dialog(open) {
  const close = () => {
    this.dispatchEvent(new Event('close'));
  };

  while (isConnected(this)) {
    // eslint-disable-next-line no-param-reassign
    ({ open } = yield html`
      <style>
          dialog {
            min-width: 300px;
            min-height: 200px;
          }

          header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 1rem;
          }

          h2 {
            margin: 0;
          }
      </style>

      <dialog open=${open}>
        <header>
          <h2>Dialog</h2>
          <button onClick=${close}>X</button>
        </header>
        <section>Hello World!</section>
      </dialog>
  `);
  }
}

export default asWebComponent(Dialog, render);
