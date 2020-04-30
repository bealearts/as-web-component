import { html, render } from 'https://unpkg.com/htm/preact/standalone.module.js'
import ExampleApp from './ExampleApp.mjs';

render(html`<${ExampleApp} title="as-component example" />`, document.body);
