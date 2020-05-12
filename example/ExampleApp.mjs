import { html, render } from 'https://unpkg.com/htm/preact/standalone.module.js'
import asWebComponent from '../src/asWebComponent.mjs';

import Time from './Time.mjs';
import Counter from './Counter.mjs';
import PasswordField from './PasswordField.mjs';

function ExampleApp(name) {
  return html`
    <main>
      <h1>${name}</h1>

      <p>Current time is: <${Time} /></p>

      <p><${Counter} /></p>

      <p>
        <form>
          <${PasswordField} show-chars/>
        </form>
      </p>
    </main>
`;
}

export default asWebComponent(ExampleApp, render);
