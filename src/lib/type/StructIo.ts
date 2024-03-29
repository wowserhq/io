import { Endianness, IoMode, validateType } from '../util.js';
import { openStream } from '../stream/util.js';
import { IoContext, IoSource, IoType } from '../types.js';

type StructFields = Record<string, IoType>;

type StructOptions = {
  endianness?: Endianness;
};

class StructIo implements IoType {
  #fields: StructFields;
  #options: StructOptions;

  constructor(fields: StructFields = {}, options: StructOptions = {}) {
    this.#fields = fields;

    for (const type of Object.values(fields)) {
      validateType(type);
    }

    this.#options = options;
  }

  get fields() {
    return this.#fields;
  }

  extend(fields = {}, options = {}) {
    return new StructIo(
      { ...this.#fields, ...fields },
      { ...this.#options, ...options },
    );
  }

  getSize(value: any) {
    let size = 0;

    for (const [name, type] of Object.entries(this.#fields)) {
      size += type.getSize(value[name]);
    }

    return size;
  }

  read(source: IoSource, context: IoContext = {}) {
    const stream = openStream(source, IoMode.Read, this.#options.endianness);
    const value: Record<string, any> = {};

    context.local = value;
    context.root = context.root ?? value;

    for (const [name, type] of Object.entries(this.#fields)) {
      value[name] = type.read(stream, context);
    }

    return value;
  }

  write(source: IoSource, value: object, context: IoContext = {}) {
    const stream = openStream(source, IoMode.Write, this.#options.endianness);

    context.local = value;
    context.root = context.root ?? value;

    for (const [name, type] of Object.entries(this.#fields)) {
      type.write(stream, value[name], context);
    }
  }
}

export default StructIo;
export { StructFields, StructOptions };
