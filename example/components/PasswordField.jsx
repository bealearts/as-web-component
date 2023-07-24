import { render } from 'preact';
import asWebComponent from '../..';

async function* PasswordField(showChars = false) {
  this.password = '';

  const input = (event) => {
    this.password = event.target.value;
  };

  for await (const { props, password } of this) {
    yield (
      <>
        <style>
          {`
            :host {
              display: inline-flex;
            }
          `}
        </style>

        <input
          type={props.showChars ? 'text' : 'password'}
          value={password}
          onInput={input}
        />
      </>
    );
  }
}

export default asWebComponent(PasswordField, render);
