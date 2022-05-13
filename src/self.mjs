import { $instance, $invalidate } from './utils.mjs';

export default function self(instance, invalidate) {
  return {
    [$instance]: instance,
    [$invalidate]: invalidate
  };
}
