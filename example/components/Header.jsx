import { h, render } from 'preact';
import asWebComponent from '../..';

function Header(name) {
  return (
    <header>
      <style>
        {`
          h1 {
            color: darkred;
          }
        `}
      </style>
      <h1>{name}</h1>
    </header>
  );
}

export default asWebComponent(Header, render);