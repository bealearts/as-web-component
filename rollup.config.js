import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import { terser } from "rollup-plugin-terser";
import pkg from './package.json';

export default {
  input: 'src/asWebComponent.mjs',
  output: {
    file: 'standalone.mjs',
    format: 'es'
  },
  plugins: [
    resolve(),
    commonjs(),
    nodePolyfills(),
  //  terser()
  ]
}
