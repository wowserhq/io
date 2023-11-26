import ArrayBufferStream from './ArrayBufferStream.js';
import FsStream from './FsStream.js';
import { Endianness } from '../util.js';

const isStream = (ref: any) => {
  if (ref instanceof ArrayBufferStream) {
    return true;
  } else if (ref instanceof FsStream) {
    return true;
  }

  return false;
};

const openStream = (
  source: IoSource,
  endianness = Endianness.Little,
): IoStream => {
  if (isStream(source)) {
    return source as IoStream;
  } else if (typeof source === 'string' || typeof source === 'number') {
    return new FsStream(source, endianness);
  } else if (ArrayBuffer.isView(source)) {
    return new ArrayBufferStream(
      source.buffer,
      endianness,
      source.byteOffset,
      source.byteLength,
    );
  } else if (source instanceof ArrayBuffer) {
    return new ArrayBufferStream(source, endianness);
  } else {
    throw new Error('Unknown source type');
  }
};

export { isStream, openStream };
