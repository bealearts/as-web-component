import mutationIterator from 'mutation-iterator';
import { $instance, getFieldValues } from './utils.js';

export default function self(instance, attributes) {
  let selfObj;
  let defaultArgs;
  function base(localArgs) {
    defaultArgs = localArgs;
    return selfObj;
  }

  base[$instance] = instance;
  // TODO: [$emit]: emit
  Object.defineProperty(base, 'props', {
    get() {
      const fields = getFieldValues(instance, attributes, defaultArgs);
      return { ...fields };
    }
  });

  selfObj = mutationIterator(base, { yieldInit: true });
  return selfObj;
}
