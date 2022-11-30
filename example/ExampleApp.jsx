import { render } from 'preact';
import asWebComponent from '..';

import Header from './components/Header.jsx';
import GeolocationState from './components/GeolocationState.jsx';
import Time from './components/Time.jsx';
import Counter from './components/Counter.jsx';
import PasswordField from './components/PasswordField.jsx';
import Dialog from './components/Dialog.jsx';

async function* ExampleApp(name) {
  this.dialogOpen = false;

  const openDialog = () => {
    this.dialogOpen = true;
  };

  const closeDialog = () => {
    this.dialogOpen = false;
  };

  for await (const { dialogOpen } of this) {
    yield (
      <main>
        <Header name={name} />

        <GeolocationState />

        <p>Current time is: <Time /></p>

        <p><Counter /></p>

        <p>
          <form>
            <label>Password: </label>
            <PasswordField showChars />
          </form>
        </p>

        <p>
          <button disabled={dialogOpen} onClick={openDialog}>Show Dialog</button>
          <Dialog open={dialogOpen} onClose={closeDialog} />
        </p>

      </main>
    );
  }
}

export default asWebComponent(ExampleApp, render);