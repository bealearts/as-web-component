import { render } from 'preact';
import asWebComponent from '../..';

async function* Loading(name) {
  yield <p>Loading: In Progress</p>;

  await delay(1000);

  yield <p>Loading: Complete</p>;
}

export default asWebComponent(Loading, render);

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
