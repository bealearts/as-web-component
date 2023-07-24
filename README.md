# as-web-component [![Build Status](https://travis-ci.org/bealearts/as-web-component.png?branch=master)](https://travis-ci.org/bealearts/as-web-component) [![npm version](https://badge.fury.io/js/as-web-component.svg)](http://badge.fury.io/js/as-web-component) [![Dependency Status](https://david-dm.org/bealearts/as-web-component.png)](https://david-dm.org/bealearts/as-web-component)

Web Components from functions

> UI as a function of state pattern for Web Components.
>
> Supports;
>
> - Components from pure functions
> - Components from Async functions
> - Stateful/Lifecycle components from Async Generator functions
> - Render DOM using any library; [Preact](https://preactjs.com/), [lit-html](https://lit-html.polymer-project.org/) etc, with or without [JSX](https://reactjs.org/docs/introducing-jsx.html)
> - Global name clash resolution
> - ESM first
> - Zero build tools required (for modern browsers)
> - Easy DOM testing using data-component attribute

Interactive [Demo](https://raw.githack.com/bealearts/as-web-component/main/example/demo.html)

## Basic Usage

### Pure Function (lit-html)

```js
import { html, render } from 'https://unpkg.com/lit-html';
import asWebComponent from 'https://unpkg.com/as-web-component/standalone.js';

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

```jsx
import { render } from 'preact';
import asWebComponent from 'as-web-component';

async function GeolocationState() {
  const result = await navigator.permissions.query({
    name: 'geolocation'
  });

  return (
    <span>
      Geolocation Permission: <strong>${result.state}</strong>
    </span>
  );
}

export default asWebComponent(GeolocationState, render);
```

### Async Generator function (Preact)

```jsx
import { render } from 'preact';
import asWebComponent from 'as-web-component';

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
```

### Using a Component

#### Reference from static HTML

```js
import SomeComponent from '../SomeComponent.js';

// Reference as <some-component></some-component> in HTML
// Note: If the name does not contain a "-" or is already taken, then a "-{UID}" will be added to the name

// or, optionally define a name to reference in HTML, must contain a "_" and be unique in the page
SomeComponent.define('another-name');
```

#### Use auto unique name in a renderer

```jsx
import SomeComponent from '../SomeComponent.js';
import { render } from 'preact';

render(<SomeComponent />, document.body); // Will render in the DOM as <some-component></some-component>
```

## Install

```shell
npm install as-web-component --save
```

Or, import directly in the browser

```js
import asWebComponent from 'https://unpkg.com/as-web-component/standalone.js';
```
