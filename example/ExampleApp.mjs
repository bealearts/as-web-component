import { html, render } from 'https://unpkg.com/htm/preact/standalone.module.js'
import asComponent from '../src/asComponent.mjs';

function ExampleApp(title) {
  return html`
    <main>
      <h1>${title}</h1>
    </main>
`;
}

export default asComponent(ExampleApp, render);
