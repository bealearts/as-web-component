import { render } from 'preact';
import asWebComponent from '../..';

async function GeolocationState() {
  const result = await navigator.permissions.query({
    name: 'geolocation'
  });

  return (
    <span>
      Geolocation Permission: <strong>{result.state}</strong>
    </span>
  );
}

export default asWebComponent(GeolocationState, render);
