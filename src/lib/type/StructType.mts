import { getStream, getType } from '../util.mjs';

class StructType implements IoType {
  #fields;
  #options;

  constructor(fields = {}, options = {}) {
    this.#fields = fields;
    this.#options = options;
  }

  get fields() {
    return this.#fields;
  }

  extend(fields = {}, options = {}) {
    return new StructType(
      { ...this.#fields, ...fields },
      { ...this.#options, ...options },
    );
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

export default StructType;
