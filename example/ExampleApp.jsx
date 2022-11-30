import { h, render } from 'preact';
import asWebComponent from '../';

import Header from './components/Header.jsx';
import GeolocationState from './components/GeolocationState.jsx';
import Time from './components/Time.jsx';
// import Counter from './components/Counter.mjs';
// import PasswordField from './components/PasswordField.mjs';
// import Dialog from './components/Dialog.mjs';

async function* ExampleApp(name) {
  this.dialogOpen = false;

  const openDialog = () => {
    this.dialogOpen = true;
  };

  const closeDialog = () => {
    this.dialogOpen = false;
  };

  for await (const _ of this) {
    yield (
      <main>
        <Header name={name}/>

        <GeolocationState />

        <p>Current time is: <Time /></p>

      </main>
    );
  }
}

export default asWebComponent(ExampleApp, render);


        // <p><${Counter} /></p>

        // <p>
        //   <form>
        //     <label>Password: </label>
        //     <${PasswordField} show-chars=${true}/>
        //   </form>
        // </p>

        // <p>
        //   <button disabled=${this.dialogOpen} onClick=${openDialog}>Show Dialog</button>
        //   <${Dialog} open=${this.dialogOpen} onClose=${closeDialog} />
        // </p>