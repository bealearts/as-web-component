import { render, h } from 'preact';
import asWebComponent from '../..';

function List() {
  return (
    <ul>
      {this.children.map((child, index) => (
        <li key={index}>
          <DomNode>{child}</DomNode>
        </li>
      ))}
    </ul>
  );
}

export default asWebComponent(List, render);

/** Render a DOM node in Preact */
function DomNode({ children }) {
  this.shouldComponentUpdate = () => false;
  return Object.defineProperty(h(children.localName), '__e', {
    get: () => children,
    set: Object
  });
}
