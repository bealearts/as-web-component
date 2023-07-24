import { render } from 'preact';
import asWebComponent from '../..';

async function* Loading() {
  yield <p>Loading: In Progress</p>;

  await delay(1000);

  yield <p>Loading: Complete</p>;
}

export default asWebComponent(Loading, render);

// eslint-disable-next-line no-promise-executor-return
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
