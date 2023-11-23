import { Endianness } from '../util.mjs';

class ArrayBufferStream implements Stream {
  #buffer: ArrayBuffer;
  #view: DataView;
  #endianness: Endianness;
  #littleEndian: boolean;
  #offset: number;

  constructor(source: ArrayBuffer, endianness = Endianness.Little) {
    this.#buffer = source;
    this.#view = new DataView(source);
    this.#endianness = endianness;
    this.#littleEndian = endianness === Endianness.Little;
    this.#offset = 0;
  }

  get endianness() {
    return this.#endianness;
  }

  get offset() {
    return this.#offset;
  }

  set offset(newOffset) {
    this.#offset = newOffset;
  }

  get eof() {
    return this.#offset >= this.#view.byteLength;
  }

  close() {
    // noop
  }

  readInt8() {
    const value = this.#view.getInt8(this.#offset);
    this.#offset += 1;
    return value;
  }

  readUint8() {
    const value = this.#view.getUint8(this.#offset);
    this.#offset += 1;
    return value;
  }

  readInt16() {
    const value = this.#view.getInt16(this.#offset, this.#littleEndian);
    this.#offset += 2;
    return value;
  }

  readInt16Be() {
    const value = this.#view.getInt16(this.#offset, false);
    this.#offset += 2;
    return value;
  }

  readInt16Le() {
    const value = this.#view.getInt16(this.#offset, true);
    this.#offset += 2;
    return value;
  }

  readUint16() {
    const value = this.#view.getUint16(this.#offset, this.#littleEndian);
    this.#offset += 2;
    return value;
  }

  readUint16Be() {
    const value = this.#view.getUint16(this.#offset, false);
    this.#offset += 2;
    return value;
  }

  readUint16Le() {
    const value = this.#view.getUint16(this.#offset, true);
    this.#offset += 2;
    return value;
  }

  readInt32() {
    const value = this.#view.getInt32(this.#offset, this.#littleEndian);
    this.#offset += 4;
    return value;
  }

  readInt32Be() {
    const value = this.#view.getInt32(this.#offset, false);
    this.#offset += 4;
    return value;
  }

  readInt32Le() {
    const value = this.#view.getInt32(this.#offset, true);
    this.#offset += 4;
    return value;
  }

  readUint32() {
    const value = this.#view.getUint32(this.#offset, this.#littleEndian);
    this.#offset += 4;
    return value;
  }

  readUint32Be() {
    const value = this.#view.getUint32(this.#offset, false);
    this.#offset += 4;
    return value;
  }

  readUint32Le() {
    const value = this.#view.getUint32(this.#offset, true);
    this.#offset += 4;
    return value;
  }

  readInt64() {
    const value = this.#view.getBigInt64(this.#offset, this.#littleEndian);
    this.#offset += 8;
    return value;
  }

  readInt64Be() {
    const value = this.#view.getBigInt64(this.#offset, false);
    this.#offset += 8;
    return value;
  }

  readInt64Le() {
    const value = this.#view.getBigInt64(this.#offset, true);
    this.#offset += 8;
    return value;
  }

  readUint64() {
    const value = this.#view.getBigUint64(this.#offset, this.#littleEndian);
    this.#offset += 8;
    return value;
  }

  readUint64Be() {
    const value = this.#view.getBigUint64(this.#offset, false);
    this.#offset += 8;
    return value;
  }

  readUint64Le() {
    const value = this.#view.getBigUint64(this.#offset, true);
    this.#offset += 8;
    return value;
  }

  readFloat32() {
    const value = this.#view.getFloat32(this.#offset, this.#littleEndian);
    this.#offset += 4;
    return value;
  }

  readFloat32Be() {
    const value = this.#view.getFloat32(this.#offset, false);
    this.#offset += 4;
    return value;
  }

  readFloat32Le() {
    const value = this.#view.getFloat32(this.#offset, true);
    this.#offset += 4;
    return value;
  }

  readFloat64() {
    const value = this.#view.getFloat64(this.#offset, this.#littleEndian);
    this.#offset += 8;
    return value;
  }

  readFloat64Be() {
    const value = this.#view.getFloat64(this.#offset, false);
    this.#offset += 8;
    return value;
  }

  readFloat64Le() {
    const value = this.#view.getFloat64(this.#offset, true);
    this.#offset += 8;
    return value;
  }

  readBytes(size: number) {
    const value = new Uint8Array(this.#buffer, this.#offset, size);
    this.#offset += size;
    return value;
  }

  readBytesTerminated(terminator: number = 0x00) {
    const start = this.#offset;

    while (!this.eof) {
      if (this.readUint8() === terminator) {
        break;
      }
    }

    const end = this.#offset - 1;

    return new Uint8Array(this.#buffer, start, start - end);
  }

  writeInt8(value: number) {
    this.#view.setInt8(this.#offset, value);
    this.#offset += 1;
  }

  writeUint8(value: number) {
    this.#view.setUint8(this.#offset, value);
    this.#offset += 1;
  }

  writeInt16(value: number) {
    this.#view.setInt16(this.#offset, value, this.#littleEndian);
    this.#offset += 2;
  }

  writeInt16Be(value: number) {
    this.#view.setInt16(this.#offset, value, false);
    this.#offset += 2;
  }

  writeInt16Le(value: number) {
    this.#view.setInt16(this.#offset, value, true);
    this.#offset += 2;
  }

  writeUint16(value: number) {
    this.#view.setUint16(this.#offset, value, this.#littleEndian);
    this.#offset += 2;
  }

  writeUint16Be(value: number) {
    this.#view.setUint16(this.#offset, value, false);
    this.#offset += 2;
  }

  writeUint16Le(value: number) {
    this.#view.setUint16(this.#offset, value, true);
    this.#offset += 2;
  }

  writeInt32(value: number) {
    this.#view.setInt32(this.#offset, value, this.#littleEndian);
    this.#offset += 4;
  }

  writeInt32Be(value: number) {
    this.#view.setInt32(this.#offset, value, false);
    this.#offset += 4;
  }

  writeInt32Le(value: number) {
    this.#view.setInt32(this.#offset, value, true);
    this.#offset += 4;
  }

  writeUint32(value: number) {
    this.#view.setUint32(this.#offset, value, this.#littleEndian);
    this.#offset += 4;
  }

  writeUint32Be(value: number) {
    this.#view.setUint32(this.#offset, value, false);
    this.#offset += 4;
  }

  writeUint32Le(value: number) {
    this.#view.setUint32(this.#offset, value, true);
    this.#offset += 4;
  }

  writeInt64(value: bigint) {
    this.#view.setBigInt64(this.#offset, value, this.#littleEndian);
    this.#offset += 8;
  }

  writeInt64Be(value: bigint) {
    this.#view.setBigInt64(this.#offset, value, false);
    this.#offset += 8;
  }

  writeInt64Le(value: bigint) {
    this.#view.setBigInt64(this.#offset, value, true);
    this.#offset += 8;
  }

  writeUint64(value: bigint) {
    this.#view.setBigUint64(this.#offset, value, this.#littleEndian);
    this.#offset += 8;
  }

  writeUint64Be(value: bigint) {
    this.#view.setBigUint64(this.#offset, value, false);
    this.#offset += 8;
  }

  writeUint64Le(value: bigint) {
    this.#view.setBigUint64(this.#offset, value, true);
    this.#offset += 8;
  }

  writeFloat32(value: number) {
    this.#view.setFloat32(this.#offset, value, this.#littleEndian);
    this.#offset += 4;
  }

  writeFloat32Be(value: number) {
    this.#view.setFloat32(this.#offset, value, false);
    this.#offset += 4;
  }

  writeFloat32Le(value: number) {
    this.#view.setFloat32(this.#offset, value, true);
    this.#offset += 4;
  }

  writeFloat64(value: number) {
    this.#view.setFloat64(this.#offset, value, this.#littleEndian);
    this.#offset += 8;
  }

  writeFloat64Be(value: number) {
    this.#view.setFloat64(this.#offset, value, false);
    this.#offset += 8;
  }

  writeFloat64Le(value: number) {
    this.#view.setFloat64(this.#offset, value, true);
    this.#offset += 8;
  }

  writeBytes(value: Uint8Array) {
    const view = new Uint8Array(this.#buffer);
    view.set(value, this.#offset);
  }
}

export default ArrayBufferStream;
