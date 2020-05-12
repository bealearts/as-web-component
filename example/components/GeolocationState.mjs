import { html, render } from 'https://unpkg.com/htm/preact/standalone.module.js';
import asWebComponent from '../../src/asWebComponent.mjs';

async function GeolocationState() {
  const result = await navigator.permissions.query({
    name:'geolocation'
  });

  return html`
    <span>Geolocation Permission: <strong>${result.state}</strong></span>
`;
}

export default asWebComponent(GeolocationState, render);
