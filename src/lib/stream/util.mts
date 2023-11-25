import ArrayBufferStream from './ArrayBufferStream.mjs';
import FsStream from './FsStream.mjs';
import { Endianness } from '../util.mjs';

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
  if (typeof source === 'string' || typeof source === 'number') {
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
