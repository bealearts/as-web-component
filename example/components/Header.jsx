import { render } from 'preact';
import asWebComponent from '../..';

function Header(name) {
  return (
    <>
      <style>
        {`
          h1 {
            color: darkred;
          }
        `}
      </style>
      <header>
        <h1>{name}</h1>
      </header>
    </>
  );
}

export default asWebComponent(Header, render);
