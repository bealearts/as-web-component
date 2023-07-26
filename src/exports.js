import { getInstance } from './utils.js';

export { default as stringRenderer } from './stringRender.js';

export function isConnected(selfInstance) {
  return getInstance(selfInstance).isConnected;
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

export function getDom(selfInstance) {
  return getInstance(selfInstance).shadowRoot;
}
