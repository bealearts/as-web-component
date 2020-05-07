import funcArgs from '/web_modules/fn-args.js';
import { paramCase } from "/web_modules/param-case.js";
import shortid from '/web_modules/shortid.js';

export function getAttributes(func) {
  const args = funcArgs(func);
  return args.map(arg => paramCase(arg));
}

export function getName(func) {
  return `${paramCase(func.name || 'anonymous')}-${shortid().toLowerCase()}`;
}
