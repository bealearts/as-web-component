import mutationIterator from 'mutation-iterator';
import { $instance, getFieldValues } from './utils.js';

export default function self(instance, attributes) {
  const base = {
    [$instance]: instance,
    get props() {
      const fields = getFieldValues(instance, attributes);
      return { ...fields };
    }
  };

  return mutationIterator(base, { yieldInit: true });
}
