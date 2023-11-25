import { isStream, openStream } from './stream/util.mjs';

enum Endianness {
  Little = 1,
  Big = 2,
}

const getStream = (source: Source, endianness = Endianness.Little): Stream =>
  isStream(source) ? (source as Stream) : openStream(source, endianness);

const getType = (type: Function | IoType): IoType => {
  const resolvedType = typeof type === 'function' ? type() : type;

  if (typeof resolvedType.read !== 'function') {
    throw new Error('Missing required function: read');
  }

  return resolvedType;
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

export { Endianness, getStream, getType, resolveValue };
