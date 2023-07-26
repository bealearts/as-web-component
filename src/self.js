import mutationIterator from 'mutation-iterator';
import { $instance, getFieldValues, $emit } from './utils.js';

export default function self(instance, attributes) {
  let selfObj;
  let defaultArgs;
  function base(localArgs) {
    defaultArgs = localArgs;
    return selfObj;
  }

  base[$instance] = instance;
  Object.defineProperty(base, 'props', {
    get() {
      const fields = getFieldValues(instance, attributes, defaultArgs);
      return { ...fields };
    }
  });
  Object.defineProperty(base, 'children', {
    get() {
      return [...instance.childNodes];
    }
  });

  selfObj = mutationIterator(base, {
    yieldInit: true,
    receiveEmitter: (emitter) => {
      base[$emit] = emitter;
    }
  });
  return selfObj;
}
