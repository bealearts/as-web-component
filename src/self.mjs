
export default function self(instance, invalidateComponent) {
  return {
    get isConnected() {
      return instance.isConnected;
    },

    invalidate() {
      invalidateComponent.call(instance);
    },

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
