
export default function self(instance, invalidateComponent) {
  return {
    get isConnected() {
      return instance.isConnected;
    },

    invalidate() {
      invalidateComponent.call(instance);
    }
  }
}
