import { isStream, openStream } from './stream/util.mjs';

enum Endianness {
  Little = 1,
  Big = 2,
}

const getStream = (
  source: IoSource,
  endianness = Endianness.Little,
): IoStream =>
  isStream(source) ? (source as IoStream) : openStream(source, endianness);

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

export { Endianness, getStream, validateType, resolveValue };
