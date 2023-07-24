import asWebComponent, { stringRenderer } from '../..';

function Footer(year) {
  return `
    <style>
      :host {
        position: fixed;
        bottom: 0;
      }
    </style>

    <footer>
      <p>Copyright ${year}</p>
    </footer>
  `;
}

export default asWebComponent(Footer, stringRenderer);
