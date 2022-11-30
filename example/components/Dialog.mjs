import { html, render } from 'https://unpkg.com/htm/preact/standalone.module.js';
import asWebComponent, { dispatchEvent } from 'https://unpkg.com/as-web-component/standalone.mjs';

async function* Dialog(open) {
  const close = () => {
    dispatchEvent(this, new Event('close'));
  };

  // eslint-disable-next-line no-param-reassign
  for await (const { props } of this) {
    yield html`
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

      <dialog open=${props.open}>
        <header>
          <h2>Dialog</h2>
          <button onClick=${close}>X</button>
        </header>
        <section>Hello World!</section>
      </dialog>
    `;
  }
}

export default asWebComponent(Dialog, render);
