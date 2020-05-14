import funcArgs from 'fn-args';
import { paramCase } from "param-case";
import uid from 'uid';

export function getAttributes(func) {
  const args = funcArgs(func);
  return args.map(arg => paramCase(arg));
}

export function getName(func) {
  return `${paramCase(func.name || 'anonymous')}-${uid().toLowerCase()}`;
}
