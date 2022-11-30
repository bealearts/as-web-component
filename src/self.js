import { $instance, $invalidate, getFieldValues } from './utils.js';

export default function self(instance, attributes) {
  let resolver;
  let pending = new Promise(resolve => {
    resolver = resolve;
  });

  const base = {
    [$instance]: instance,
    [$invalidate]() {
      window.requestAnimationFrame(() => resolver(this));
    },
    get props() {
      const fields = getFieldValues(instance, attributes);
      return {...fields};
    },
    async* [Symbol.asyncIterator]() {
      while (instance.isConnected) {
        yield await pending; // eslint-disable-line no-await-in-loop
        pending = new Promise(resolve => { // eslint-disable-line no-loop-func
          resolver = resolve;
        });
      }
    }
  };

  return new Proxy(base, {
    get(target, prop, receiver) {
      if (prop in target) {
        return Reflect.get(target, prop, receiver);
      }
    },

    set(target, prop, value) {
      target[prop] = value;
      target[$invalidate].call(target);

      return true;
    }
  });
}
