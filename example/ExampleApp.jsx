import { render } from 'preact';
import asWebComponent from '..';

import Header from './components/Header.jsx';
import GeolocationState from './components/GeolocationState.jsx';
import Time from './components/Time.jsx';
import Counter from './components/Counter.jsx';
import PasswordField from './components/PasswordField.jsx';
import Dialog from './components/Dialog.jsx';
import Loading from './components/Loading.jsx';

async functiodn* ExampleApp(name) {
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
        <Loading />
        <p>
          Current time is: <Time />
        </p>
        <p>
          <Counter />
        </p>
        <p>
          <form>
            <label htmlFor="password">Password: </label>
            <PasswordField id="password" showChars />
          </form>
        </p>
        <p>
          <button type="button" disabled={dialogOpen} onClick={openDialog}>
            Show Dialog
          </button>
          <Dialog open={dialogOpen} onClose={closeDialog} />
        </p>
      </main>
    );
  }
}

export default asWebComponent(ExampleApp, render);