import { getStream, getType } from '../util.mjs';

type ArrayOptions = {
  size?: number;
};

class ArrayIo implements IoType {
  #type: IoType;
  #options: ArrayOptions;

  constructor(type: Function | IoType, options: ArrayOptions = {}) {
    if (type === undefined) {
      throw new Error('Missing required argument: type');
    }

    this.#type = getType(type);
    this.#options = options;
  }

  getSize(value: any[]) {
    let size = 0;

    for (const v of value) {
      size += this.#type.getSize(v);
    }

    return size;
  }

  read(source: Source, context: Context = {}) {
    const stream = getStream(source);
    const value = [];
    const size = this.#options.size;

    context.local = value;
    context.root = context.root ?? value;

    if (size === undefined) {
      while (!stream.eof) {
        value.push(this.#type.read(stream, context));
      }
    } else {
      for (let i = 0; i < size; i++) {
        value.push(this.#type.read(stream, context));
      }
    }

    return value;
  }

  write(source: Source, value: any[], context: Context = {}) {
    const stream = getStream(source);
    const size = value.length;
    const type = this.#type;

    context.local = value;
    context.root = context.root ?? value;

    if (type.write) {
      for (let i = 0; i < size; i++) {
        type.write(stream, value[i], context);
      }
    }
  }
}

export default ArrayIo;
export { ArrayOptions };
