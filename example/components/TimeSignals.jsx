import { render } from 'preact';
import { signal, effect } from '@preact/signals';
import asWebComponent from '../..';

async function* TimeSignals() {
  this.ts = signal(now());

  const timer = setInterval(() => {
    this.ts.value = now();
  }, 1000);

  for await (const { ts } of this) {
    yield (
      <>
        <style>
          {`
              :host {
                display: inline-flex;
              }
          `}
        </style>
        {/* NOTE: To use just {ts} optimization - don't assign the Signal to this */}
        <span>{ts.value}</span>
      </>
    );
  }

  clearInterval(timer);
}

export default asWebComponent(TimeSignals, render, { effect });

function now() {
  return new Date().toLocaleTimeString();
}
