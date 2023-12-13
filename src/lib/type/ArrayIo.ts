import { IoMode, validateType } from '../util.js';
import { openStream } from '../stream/util.js';
import { IoContext, IoSource, IoType } from '../types.js';

type ArrayOptions = {
  size?: number;
};

class ArrayIo implements IoType {
  #type: IoType;
  #options: ArrayOptions;

  constructor(type: IoType, options: ArrayOptions = {}) {
    if (type === undefined) {
      throw new Error('Missing required argument: type');
    }

    validateType(type);

    this.#type = type;
    this.#options = options;
  }

  getSize(value: any[]) {
    let size = 0;

    for (const v of value) {
      size += this.#type.getSize(v);
    }

    return size;
  }

  read(source: IoSource, context: IoContext = {}) {
    const stream = openStream(source, IoMode.Read);
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

  write(source: IoSource, value: any[], context: IoContext = {}) {
    const stream = openStream(source, IoMode.Write);
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
