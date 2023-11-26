import { resolveValue } from '../util.js';
import { openStream } from '../stream/util.js';

const STRING_TERMINATOR = 0x00;
const DEFAULT_ENCODING = 'utf-8';

type StringOptions = {
  encoding?: string;
  reverse?: boolean;
  size?: number | string;
  terminate?: boolean;
};

class StringIo implements IoType {
  #options: StringOptions;
  #decoder: TextDecoder;
  #encoder: TextEncoder;
  #terminate: boolean;

  constructor(options: StringOptions = {}) {
    this.#options = options;
    this.#terminate = options.terminate !== false;
    this.#decoder = new TextDecoder(this.#options.encoding ?? DEFAULT_ENCODING);
    this.#encoder = new TextEncoder();
  }

  getSize(value: string) {
    const encodedSize = this.#encoder.encode(value).byteLength;
    return this.#terminate ? encodedSize + 1 : encodedSize;
  }

  #readRawBytes(stream: IoStream, size: number | undefined) {
    if (typeof size === 'number') {
      const untrimmedBytes = stream.readBytes(size);

      if (this.#terminate && untrimmedBytes.at(-1) === STRING_TERMINATOR) {
        return new Uint8Array(
          untrimmedBytes.buffer,
          0,
          untrimmedBytes.byteLength - 1,
        );
      } else {
        return untrimmedBytes;
      }
    }

    return stream.readBytesTerminated(STRING_TERMINATOR);
  }

  read(source: IoSource, context: IoContext = {}) {
    const stream = openStream(source);
    const size = resolveValue(this.#options.size, context.local, context.root);

    const rawBytes = this.#readRawBytes(stream, size);
    const value = this.#decoder.decode(rawBytes);

    return this.#options.reverse ? value.split('').reverse().join('') : value;
  }

  write(source: IoSource, value: string, context: IoContext = {}) {
    const stream = openStream(source);

    const finalValue = this.#options.reverse
      ? value.split('').reverse().join('')
      : value;
    const encodedValue = this.#encoder.encode(finalValue);
    stream.writeBytes(encodedValue);

    if (this.#terminate) {
      stream.writeUint8(STRING_TERMINATOR);
    }
  }
}

export default StringIo;
export { StringOptions };
