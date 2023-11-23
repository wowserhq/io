import StructType from './type/StructType.mjs';
import StringType from './type/StringType.mjs';
import ArrayType from './type/ArrayType.mjs';
import { getType } from './util.mjs';

const array = (type, options) => new ArrayType(type, options);

const string = (options) => new StringType(options);

const struct = (fields, options) => new StructType(fields, options);

const int8 = {
  read: (stream: Stream) => stream.readInt8(),
  write: (stream: Stream, value: number) => stream.writeInt8(value),
};

const uint8 = {
  read: (stream: Stream) => stream.readUint8(),
  write: (stream: Stream, value: number) => stream.writeUint8(value),
};

const int16 = {
  read: (stream: Stream) => stream.readInt16(),
  write: (stream: Stream, value: number) => stream.writeInt16(value),
};
const int16be = {
  read: (stream: Stream) => stream.readInt16Be(),
  write: (stream: Stream, value: number) => stream.writeInt16Be(value),
};
const int16le = {
  read: (stream: Stream) => stream.readInt16Le(),
  write: (stream: Stream, value: number) => stream.writeInt16Le(value),
};

const uint16 = {
  read: (stream: Stream) => stream.readUint16(),
  write: (stream: Stream, value: number) => stream.writeUint16(value),
};
const uint16be = {
  read: (stream: Stream) => stream.readUint16Be(),
  write: (stream: Stream, value: number) => stream.writeUint16Be(value),
};
const uint16le = {
  read: (stream: Stream) => stream.readUint16Le(),
  write: (stream: Stream, value: number) => stream.writeUint16Le(value),
};

const int32 = {
  read: (stream: Stream) => stream.readInt32(),
  write: (stream: Stream, value: number) => stream.writeInt32(value),
};
const int32be = {
  read: (stream: Stream) => stream.readInt32Be(),
  write: (stream: Stream, value: number) => stream.writeInt32Be(value),
};
const int32le = {
  read: (stream: Stream) => stream.readInt32Le(),
  write: (stream: Stream, value: number) => stream.writeInt32Le(value),
};

const uint32 = {
  read: (stream: Stream) => stream.readUint32(),
  write: (stream: Stream, value: number) => stream.writeUint32(value),
};
const uint32be = {
  read: (stream: Stream) => stream.readUint32Be(),
  write: (stream: Stream, value: number) => stream.writeUint32Be(value),
};
const uint32le = {
  read: (stream: Stream) => stream.readUint32Le(),
  write: (stream: Stream, value: number) => stream.writeUint32Le(value),
};

const int64 = {
  read: (stream: Stream) => stream.readInt64(),
  write: (stream: Stream, value: bigint) => stream.writeInt64(value),
};
const int64be = {
  read: (stream: Stream) => stream.readInt64Be(),
  write: (stream: Stream, value: bigint) => stream.writeInt64Be(value),
};
const int64le = {
  read: (stream: Stream) => stream.readInt64Le(),
  write: (stream: Stream, value: bigint) => stream.writeInt64Le(value),
};

const uint64 = {
  read: (stream: Stream) => stream.readUint64(),
  write: (stream: Stream, value: bigint) => stream.writeUint64(value),
};
const uint64be = {
  read: (stream: Stream) => stream.readUint64Be(),
  write: (stream: Stream, value: bigint) => stream.writeUint64Be(value),
};
const uint64le = {
  read: (stream: Stream) => stream.readUint64Le(),
  write: (stream: Stream, value: bigint) => stream.writeUint64Le(value),
};

const float32 = {
  read: (stream: Stream) => stream.readFloat32(),
  write: (stream: Stream, value: number) => stream.writeFloat32(value),
};
const float32be = {
  read: (stream: Stream) => stream.readFloat32Be(),
  write: (stream: Stream, value: number) => stream.writeFloat32Be(value),
};
const float32le = {
  read: (stream: Stream) => stream.readFloat32Le(),
  write: (stream: Stream, value: number) => stream.writeFloat32Le(value),
};

const float64 = {
  read: (stream: Stream) => stream.readFloat64(),
  write: (stream: Stream, value: number) => stream.writeFloat64(value),
};
const float64be = {
  read: (stream: Stream) => stream.readFloat64Be(),
  write: (stream: Stream, value: number) => stream.writeFloat64Be(value),
};
const float64le = {
  read: (stream: Stream) => stream.readFloat64Le(),
  write: (stream: Stream, value: number) => stream.writeFloat64Le(value),
};

const io = {
  array,
  string,
  struct,
  int8,
  uint8,
  int16,
  int16be,
  int16le,
  uint16,
  uint16be,
  uint16le,
  int32,
  int32be,
  int32le,
  uint32,
  uint32be,
  uint32le,
  int64,
  int64be,
  int64le,
  uint64,
  uint64be,
  uint64le,
  float32,
  float32be,
  float32le,
  float64,
  float64be,
  float64le,
  getType,
};

export default io;
