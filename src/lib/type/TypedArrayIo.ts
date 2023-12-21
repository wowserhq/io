import { Endianness, IoMode, validateType } from '../util.js';
import { openStream } from '../stream/util.js';
import { IoSource, IoType } from '../types.js';
import * as io from '../io/numeric.js';

type TypedArrayOptions = {
  size?: number;
  endianness?: Endianness;
};

type TypedArray =
  | Int8Array
  | Uint8Array
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | BigInt64Array
  | BigUint64Array
  | Float32Array
  | Float64Array;

type TypedArrayConstructor =
  | Int8ArrayConstructor
  | Uint8ArrayConstructor
  | Int16ArrayConstructor
  | Uint16ArrayConstructor
  | Int32ArrayConstructor
  | Uint32ArrayConstructor
  | BigInt64ArrayConstructor
  | BigUint64ArrayConstructor
  | Float32ArrayConstructor
  | Float64ArrayConstructor;

const CONSTRUCTOR_MAP = new Map<IoType, TypedArrayConstructor>([
  [io.int8, Int8Array],
  [io.uint8, Uint8Array],
  [io.int16, Int16Array],
  [io.int16le, Int16Array],
  [io.int16be, Int16Array],
  [io.uint16, Uint16Array],
  [io.uint16le, Uint16Array],
  [io.uint16be, Uint16Array],
  [io.int32, Int32Array],
  [io.int32le, Int32Array],
  [io.int32be, Int32Array],
  [io.uint32, Uint32Array],
  [io.uint32le, Uint32Array],
  [io.uint32be, Uint32Array],
  [io.int64, BigInt64Array],
  [io.int64le, BigInt64Array],
  [io.int64be, BigInt64Array],
  [io.uint64, BigUint64Array],
  [io.uint64le, BigUint64Array],
  [io.uint64be, BigUint64Array],
  [io.float32, Float32Array],
  [io.float32le, Float32Array],
  [io.float32be, Float32Array],
  [io.float64, Float64Array],
  [io.float64le, Float64Array],
  [io.float64be, Float64Array],
]);

const EXPLICIT_LITTLE_ENDIAN = new Set<IoType>([
  io.int16le,
  io.uint16le,
  io.int32le,
  io.uint32le,
  io.int64le,
  io.uint64le,
  io.float32le,
  io.float64le,
]);

const EXPLICIT_BIG_ENDIAN = new Set<IoType>([
  io.int16be,
  io.uint16be,
  io.int32be,
  io.uint32be,
  io.int64be,
  io.uint64be,
  io.float32be,
  io.float64be,
]);

class TypedArrayIo implements IoType {
  #type: IoType;
  #options: TypedArrayOptions;
  #arrayConstructor: TypedArrayConstructor;
  #fastIo: boolean;

  constructor(type: IoType, options: TypedArrayOptions = {}) {
    if (type === undefined) {
      throw new Error('Missing required argument: type');
    }

    validateType(type);

    if (!CONSTRUCTOR_MAP.has(type)) {
      throw new Error(`Unsupported type for typed array: ${type}`);
    }

    this.#type = type;
    this.#options = options;
    this.#arrayConstructor = CONSTRUCTOR_MAP.get(this.#type);
  }

  getSize(value: any[]) {
    return this.#options.size === undefined
      ? this.#type.getSize(undefined) * value.length
      : this.#type.getSize(undefined) * this.#options.size;
  }

  read(source: IoSource) {
    const stream = openStream(source, IoMode.Read, this.#options.endianness);

    // Ambiguous size reads

    if (this.#options.size === undefined) {
      const value = [];

      while (!stream.eof) {
        value.push(this.#type.read(stream));
      }

      return new this.#arrayConstructor(value);
    }

    // Fixed size reads

    const value = new this.#arrayConstructor(this.#options.size);

    for (let i = 0; i < this.#options.size; i++) {
      value[i] = this.#type.read(stream);
    }

    return value;
  }

  write(source: IoSource, value: TypedArray) {
    const stream = openStream(source, IoMode.Write, this.#options.endianness);
    const expectedEndOffset = stream.offset + this.getSize(undefined);

    for (let i = 0; i < value.length; i++) {
      this.#type.write(stream, value[i]);
    }

    if (stream.offset !== expectedEndOffset) {
      const zeroBytes = new Uint8Array(expectedEndOffset - stream.offset);
      stream.writeBytes(zeroBytes);
    }
  }
}

export default TypedArrayIo;
export { TypedArrayOptions };
