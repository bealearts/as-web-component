import funcArgs from 'fn-args';
import { paramCase } from 'param-case';
import uid from 'uid';

export function getAttributes(func) {
  const args = funcArgs(func);
  return new Map(args.map(arg => [paramCase(arg), arg]));
}

export function getName(func) {
  return paramCase(func.name) || 'anonymous';
}

export function getUniqueName(func) {
  return `${getName(func)}-${uid(5).toLowerCase()}`;
}

export function getArgumentValues(instance, attributes) {
  const args = Object.fromEntries(
    Array.from(attributes.entries())
      .map(([attr, arg]) => {
        let value = instance.getAttribute(attr);
        value = value === null ? undefined : value;
        return [arg, value];
      })
  );

  return args;
}

export function getFieldValues(instance, attributes) {
  const fields = Object.fromEntries(
    Array.from(attributes.entries())
      .map(([, arg]) => {
        let value = instance[arg];
        value = value === null ? undefined : value;
        return [arg, value];
      })
  );

  return fields;
}

export function decorateWithProps(Comp, attributes, privateFields, invalidate) {
  attributes.forEach((arg) => {
    Object.defineProperty(Comp.prototype, arg, {
      get() {
        return privateFields.get(this)[arg];
      },
      set(value) {
        if (privateFields.get(this)[arg] !== value) {
          privateFields.get(this)[arg] = value; // eslint-disable-line no-param-reassign
          invalidate.call(this);
        }
      }
    });
  });
}
