import { Endianness } from '../util.js';
import { openStream } from '../stream/util.js';
import { IoContext, IoSource, IoType } from '../types.js';

type TlvValueCallback = (
  type: string | number,
  length: number,
) => IoType | undefined | null;

type TlvOptions = {
  endianness?: Endianness;
};

type Tlv = {
  tag: string | number;
  length: number;
  value: any;
};

/**
 * TlvIo provides an IoType for tag-length-value (sometimes called type-length-value) types. The tag can be any IoType
 * that resolves to a string or number. The length can be any IoType that resolves to a number. The value can be any
 * IoType, or a Uint8Array.
 */
class TlvIo implements IoType {
  #tagType: IoType;
  #lengthType: IoType;
  #valueCallback: TlvValueCallback;
  #options: TlvOptions;

  /**
   * The TlvIo() constructor creates new TlvIo objects.
   *
   * @param tagType - An IoType that resolves to a string or number.
   * @param lengthType - An IoType that resolves to a number.
   * @param valueCallback - A function that returns any IoType from the given tag and length. If the callback returns
   *   undefined or null, the value will be read as a Uint8Array.
   * @param options
   */
  constructor(
    tagType: IoType,
    lengthType: IoType,
    valueCallback: TlvValueCallback,
    options: TlvOptions = {},
  ) {
    this.#tagType = tagType;
    this.#lengthType = lengthType;
    this.#valueCallback = valueCallback;
    this.#options = options;
  }

  getSize(value: Tlv) {
    const tagSize = this.#tagType.getSize(value.tag);
    const lengthSize = this.#lengthType.getSize(value.length);
    const valueSize = value.length;

    return tagSize + lengthSize + valueSize;
  }

  read(source: IoSource, context: IoContext = {}): Tlv {
    const stream = openStream(source, this.#options.endianness);

    context.local = null;
    context.root = context.root ?? null;

    const tagValue = this.#tagType.read(stream, context);
    const lengthValue = this.#lengthType.read(stream, context);

    const valueType = this.#valueCallback(tagValue, lengthValue);
    const valueBytes = stream.readBytes(lengthValue);

    let valueValue = valueBytes;
    if (valueType && valueType.read) {
      const valueStream = openStream(valueBytes, this.#options.endianness);
      valueValue = valueType.read(valueStream, context);
    }

    return {
      tag: tagValue,
      length: lengthValue,
      value: valueValue,
    };
  }

  write(source: IoSource, value: Tlv, context: IoContext = {}) {
    const stream = openStream(source, this.#options.endianness);

    context.local = null;
    context.root = context.root ?? null;

    this.#tagType.write(stream, value.tag, context);

    this.#lengthType.write(stream, value.length, context);
    const expectedEndOffset = stream.offset + value.length;

    const valueType = this.#valueCallback(value.tag, value.length);
    if (valueType && valueType.write) {
      valueType.write(stream, value.value, context);
    } else {
      stream.writeBytes(value.value);
    }

    // Account for underruns and overruns
    if (stream.offset !== expectedEndOffset) {
      stream.offset = expectedEndOffset;
    }
  }
}

export default TlvIo;
export { TlvValueCallback };
