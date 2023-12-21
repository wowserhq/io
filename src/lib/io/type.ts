import { IoType } from '../types.js';
import ArrayIo, { ArrayOptions } from '../type/ArrayIo.js';
import StringIo, { StringOptions } from '../type/StringIo.js';
import StructIo, { StructFields, StructOptions } from '../type/StructIo.js';
import TlvIo, { TlvOptions, TlvTag } from '../type/TlvIo.js';

const array = (type: IoType, options: ArrayOptions = {}) =>
  new ArrayIo(type, options);

const string = (options: StringOptions = {}) => new StringIo(options);

const struct = (fields: StructFields, options: StructOptions = {}) =>
  new StructIo(fields, options);

const tlv = (
  tagType: IoType,
  lengthType: IoType,
  valueTypes: Record<TlvTag, IoType>,
  options: TlvOptions = {},
) => new TlvIo(tagType, lengthType, valueTypes, options);

export { array, string, struct, tlv };
