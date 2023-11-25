import { Endianness, getStream, getType } from '../util.mjs';

type StructFields = Record<string, Function | IoType>;

type StructOptions = {
  endianness?: Endianness;
};

class StructIo implements IoType {
  #fields: StructFields;
  #options: StructOptions;

  constructor(fields: StructFields = {}, options: StructOptions = {}) {
    this.#fields = fields;
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
      size += getType(type).getSize(value[name]);
    }

    return size;
  }

  read(source: Source, context: Context = {}) {
    const stream = getStream(source, this.#options.endianness);
    const value = {};

    context.local = value;
    context.root = context.root ?? value;

    for (const [name, type] of Object.entries(this.#fields)) {
      value[name] = getType(type).read(stream, context);
    }

    return value;
  }

  write(source: Source, value: object, context: Context = {}) {
    const stream = getStream(source, this.#options.endianness);

    context.local = value;
    context.root = context.root ?? value;

    for (const [name, type] of Object.entries(this.#fields)) {
      getType(type).write(stream, value[name], context);
    }
  }
}

export default StructIo;
export { StructFields, StructOptions };
