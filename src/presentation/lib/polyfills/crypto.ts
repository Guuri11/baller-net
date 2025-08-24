// Polyfill for crypto.getRandomValues using expo-crypto for React Native/Expo
import * as ExpoCrypto from 'expo-crypto';

// Only polyfill if not present
if (typeof global.crypto !== 'object') {
  // @ts-ignore
  global.crypto = {};
}

if (typeof global.crypto.getRandomValues !== 'function') {
  global.crypto.getRandomValues = function <T extends ArrayBufferView>(array: T): T {
    if (!(array instanceof Uint8Array || array instanceof Int8Array || array instanceof Uint16Array || array instanceof Int16Array || array instanceof Uint32Array || array instanceof Int32Array)) {
      throw new TypeError('Expected Uint8Array, Int8Array, Uint16Array, Int16Array, Uint32Array, or Int32Array');
    }
    const randomBytes = ExpoCrypto.getRandomBytes(array.byteLength);
    array.set(randomBytes);
    return array;
  };
}
