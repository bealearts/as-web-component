import { $instance, $invalidate, getFieldValues } from './utils.mjs';

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
    },
    count: 0
  };

  const state = {};
  return new Proxy(base, {
    get(target, prop, receiver) {
      if (prop in target) {
        return Reflect.get(target, prop, receiver);
      }
      return state[prop];
    },

    set(target, prop, value) {
      // if (prop in base) {
      //   throw new TypeError(`${prop} is a reserved property`);
      // }

      target[prop] = value;
      target[$invalidate].call(target);

      return true;
    }
  });
}
