import { html, render } from 'https://unpkg.com/lit-html'
import asWebComponent from 'https://unpkg.com/as-web-component/standalone.mjs';

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
