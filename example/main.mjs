import { html, render } from 'https://unpkg.com/htm/preact/standalone.module.js'
import ExampleApp from './ExampleApp.mjs';

render(html`<${ExampleApp} name="as-web-component example" />`, document.body);
