import { getInstance, getInvalidate } from './utils.mjs';

export function isConnected(selfInstance) {
  return getInstance(selfInstance).isConnected;
}

export function invalidate(selfInstance) {
  return getInvalidate(selfInstance).call(getInstance(selfInstance));
}

export function dispatchEvent(selfInstance, ...args) {
  const instance = getInstance(selfInstance);
  return instance.dispatchEvent.call(instance, ...args);
}

export function addEventListener(selfInstance, ...args) {
  const instance = getInstance(selfInstance);
  return instance.addEventListener.call(instance, ...args);
}

export function removeEventListener(selfInstance, ...args) {
  const instance = getInstance(selfInstance);
  return instance.removeEventListener.call(instance, ...args);
}
