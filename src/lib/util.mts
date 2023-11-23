import { isStream, openStream } from './stream/util.mjs';

enum Endianness {
  Little = 1,
  Big = 2,
}

const getStream = (source, endianness = Endianness.Little): Stream =>
  isStream(source) ? source : openStream(source, endianness);

const getType = (type): IoType => {
  if (typeof type === 'function') {
    type = type();
  }

  if (typeof type.read !== 'function') {
    throw new Error('Missing required function: read');
  }

  return type;
};

const resolveValue = (ref, ...objects) => {
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

export { Endianness, getStream, getType, resolveValue };
