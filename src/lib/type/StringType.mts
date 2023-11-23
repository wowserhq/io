import { getStream, resolveValue } from '../util.mjs';

const STRING_TERMINATOR = 0x00;
const DEFAULT_ENCODING = 'utf-8';

type StringOptions = {
  encoding?: string;
  reverse?: boolean;
  size?: number | string;
  terminate?: boolean;
};

class StringType implements IoType {
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

  #readRawBytes(stream: Stream, size: number | undefined) {
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

  read(source: Source, context: Context = {}) {
    const stream = getStream(source);
    const size = resolveValue(this.#options.size, context.local, context.root);

    const rawBytes = this.#readRawBytes(stream, size);
    const value = this.#decoder.decode(rawBytes);

    return this.#options.reverse ? value.split('').reverse().join('') : value;
  }

  write(source: Source, value: string, context: Context = {}) {
    const stream = getStream(source);

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

export default StringType;
