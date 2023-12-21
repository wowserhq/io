import { IoType } from './types.js';

enum Endianness {
  Little = 1,
  Big = 2,
}

enum IoMode {
  Read = 1,
  Write = 2,
}

const ENDIANNESS_CHECK = new Uint32Array(
  new Uint8Array([0xaa, 0xbb, 0xcc, 0xdd]).buffer,
);
const RUNTIME_ENDIANNESS =
  ENDIANNESS_CHECK[0] === 0xddccbbaa ? Endianness.Little : Endianness.Big;

const validateType = (type: IoType) => {
  if (typeof type.getSize !== 'function') {
    throw new Error('Missing required function: getSize');
  }

  if (typeof type.read !== 'function') {
    throw new Error('Missing required function: read');
  }
};

const resolveValue = (ref: number | string, ...objects: object[]) => {
  if (ref === undefined || typeof ref === 'number') {
    return ref;
  }

  for (const object of objects) {
    const value = object[ref];
    if (value) {
      return value;
    }
  }
};

export { RUNTIME_ENDIANNESS, Endianness, IoMode, validateType, resolveValue };
