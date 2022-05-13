import { getInstance, getInvalidate } from './utils.mjs';

export function isConnected(selfInstance) {
  return getInstance(selfInstance).isConnected;
}

export function invalidate(selfInstance) {
  return getInvalidate(selfInstance).call(getInstance(selfInstance));
}
