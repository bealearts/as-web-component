import './ExampleApp.jsx';

new EventSource('/esbuild').addEventListener('change', () =>
  window.location.reload()
);
