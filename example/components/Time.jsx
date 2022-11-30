import { h, render, Fragment } from 'preact';
import asWebComponent from '../..';

async function* Time() {
  this.ts = now();

  const timer = setInterval(() => {
    this.ts = now();
  }, 1000);

  for await (const { ts } of this) {
    yield (
      <Fragment>
        <style>
          {`
            :host {
              display: inline-flex;
            }
          `}
        </style>

        <span>{ts}</span>
      </Fragment>
    );
  }

  clearInterval(timer);
}

export default asWebComponent(Time, render);

function now() {
  return (new Date()).toLocaleTimeString();
}
