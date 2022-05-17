import { $instance, $invalidate, getFieldValues } from './utils.mjs';

export default function self(instance, attributes) {
  let resolver;
  let pending = new Promise(resolve => {
    resolver = resolve;
  });

  const base = {
    [$instance]: instance,
    [$invalidate]() {
      const fields = getFieldValues(instance, attributes);
      window.requestAnimationFrame(() => resolver(fields));
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

  const state = {};
  return new Proxy(base, {
    get(target, prop, receiver) {
      if (prop in base) {
        return Reflect.get(target, prop, receiver);
      }

      return state[prop];
    },

    set(target, prop, value) {
      if (prop in base) {
        throw new TypeError(`${prop} is a reserved property`);
      }

      state[prop] = value;
      target[$invalidate].call(target[$instance]);

      return true;
    }
  });
}
