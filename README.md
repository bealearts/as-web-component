# as-web-component [![Build Status](https://travis-ci.org/bealearts/as-web-component.png?branch=master)](https://travis-ci.org/bealearts/as-web-component) [![npm version](https://badge.fury.io/js/as-web-component.svg)](http://badge.fury.io/js/as-web-component) [![Dependency Status](https://david-dm.org/bealearts/as-web-component.png)](https://david-dm.org/bealearts/as-web-component)

Web Components from functions

> UI as a function of state pattern for Web Components.
>
>  Supports;
> * Components from pure functions
> * Components from Async functions
> * Stateful components from Generator functions
> * Render DOM using any library; Preact, lit-html etc
> * Global name clash resolution
> * ESM first
> * Zero build tools required (for modern browsers)

Interactive [Example](https://raw.githack.com/bealearts/as-web-component/master/example/index.html)

## Usage

### Pure Function (lit-html)
```js
import { html, render } from 'https://unpkg.com/lit-html';
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
```

### Async Function (Preact)
```js
import { html, render } from 'https://unpkg.com/htm/preact/standalone.module.js';
import asWebComponent from 'https://unpkg.com/as-web-component/standalone.mjs';

async function GeolocationState() {
  const result = await navigator.permissions.query({
    name:'geolocation'
  });

  return html`
    <span>Geolocation Permission: <strong>${result.state}</strong></span>
  `;
}

export default asWebComponent(GeolocationState, render);
```

### Generator function (Preact)
```js
import { html, render } from 'https://unpkg.com/htm/preact/standalone.module.js';
import asWebComponent from 'https://unpkg.com/as-web-component/standalone.mjs';

function* Counter() {
  let count = 0;

  const inc = () => {
    count++;
    this.invalidate();
  }

  const dec = () => {
    count--;
    this.invalidate();
  }

  while(this.isConnected) {
    yield html`
      <style>
        :host {
          display: inline-flex;
        }

        span {
          margin: 0 1rem;
        }
      </style>

      <button onClick=${dec}>-</button>
      <span>${count}</span>
      <button onClick=${inc}>+</button>
  `;
  }
}

export default asWebComponent(Counter, render);
```

### Using a Component

```js
import SomeComponent from '../SomeComponent.mjs';

// Define a name to reference in HTML
SomeComponent.define('some-component');

// and/or

// Use auto unique name in Template literal
import { html, render } from 'https://unpkg.com/htm/preact/standalone.module.js'
render(html`<${SomeComponent} />`, document.body);

```

# Install
```shell
npm install as-web-component --save
```
