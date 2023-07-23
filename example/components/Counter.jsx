import { render } from 'preact';
import asWebComponent from '../..';

async function* Counter() {
  this.count = 0;

  const inc = () => {
    this.count++;
  };

  const dec = () => {
    this.count--;
  };

  for await (const { count } of this) {
    yield (
      <>
        <style>
          {`
            :host {
              display: inline-flex;
            }

            span {
              margin: 0 1rem;
            }
          `}
        </style>

        <button type="button" onClick={dec}>
          -
        </button>
        <span>{count}</span>
        <button type="button" onClick={inc}>
          +
        </button>
      </>
    );
  }
}

export default asWebComponent(Counter, render);
