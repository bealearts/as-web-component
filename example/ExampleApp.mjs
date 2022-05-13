import { html, render } from 'https://unpkg.com/htm/preact/standalone.module.js';
import asWebComponent, { isConnected, invalidate } from 'https://unpkg.com/as-web-component/standalone.mjs';

import Header from './components/Header.mjs';
import GeolocationState from './components/GeolocationState.mjs';
import Time from './components/Time.mjs';
import Counter from './components/Counter.mjs';
import PasswordField from './components/PasswordField.mjs';
import Dialog from './components/Dialog.mjs';

function* ExampleApp(name) {
  let dialogOpen = false;

  const openDialog = () => {
    dialogOpen = true;
    invalidate(this);
  };

  const closeDialog = () => {
    dialogOpen = false;
    invalidate(this);
  };

  while (isConnected(this)) {
    yield html`
      <main>
        <${Header} name=${name}/>

        <${GeolocationState} />

        <p>Current time is: <${Time} /></p>

        <p><${Counter} /></p>

        <p>
          <form>
            <label>Password: </label>
            <${PasswordField} show-chars=${true}/>
          </form>
        </p>

        <p>
          <button disabled=${dialogOpen} onClick=${openDialog}>Show Dialog</button>
          <${Dialog} open=${dialogOpen} onClose=${closeDialog} />
        </p>
      </main>
  `;
  }
}

export default asWebComponent(ExampleApp, render);
