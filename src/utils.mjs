import funcArgs from 'fn-args';
import { paramCase } from "param-case";
import shortid from 'shortid';

export function getAttributes(func) {
  const args = funcArgs(func);
  return args.map(arg => paramCase(arg));
}

export function getName(func) {
  return `${paramCase(func.name || 'anonymous')}-${shortid().toLowerCase().replace(/[-_]*/, '')}`;
}
