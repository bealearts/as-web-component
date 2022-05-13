import { $instance, $invalidate } from './utils.mjs';

export default function self(instance, invalidate) {
  return {
    [$instance]: instance,
    [$invalidate]: invalidate,

    dispatchEvent(...args) {
      return instance.dispatchEvent.call(instance, ...args);
    },

    addEventListener(...args) {
      return instance.addEventListener.call(instance, ...args);
    },

    removeEventListener(...args) {
      return instance.removeEventListener.call(instance, ...args);
    }
  };
}
