import { html, render } from 'lit-html';
import asWebComponent from '../..';

function Header(name) {
  return html`
      <style>
        h1 {
          color: darkred;
        }
      </style>

      <header>
        <h1>${name}</h1>
      </header>
  `;
}

export default asWebComponent(Header, render);
