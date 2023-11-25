import fs from '../shim/fs.cjs';
import { Endianness } from '../util.mjs';

class FsStream implements IoStream {
  #fd: number;
  #ownFd: boolean;
  #stat: any;
  #buffer: ArrayBuffer;
  #view: DataView;
  #endianness: Endianness;
  #littleEndian: boolean;
  #offset: number;

  constructor(source: string | number, endianness = Endianness.Little) {
    if (fs === undefined) {
      throw new Error('fs api unavailable');
    }

    if (typeof source === 'string') {
      this.#fd = fs.openSync(source, 'r');
      this.#ownFd = true;
    } else if (typeof source === 'number') {
      this.#fd = source;
      this.#ownFd = false;
    } else {
      throw new Error('Unknown source type');
    }

    this.#stat = fs.fstatSync(this.#fd);
    this.#buffer = new ArrayBuffer(16);
    this.#view = new DataView(this.#buffer);
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
    return this.#offset >= this.#stat.size;
  }

  close() {
    if (this.#ownFd) {
      fs.closeSync(this.#fd);
    }
  }

  readInt8() {
    this.#offset += fs.readSync(this.#fd, this.#view, 0, 1, this.#offset);
    return this.#view.getInt8(0);
  }

  readUint8() {
    this.#offset += fs.readSync(this.#fd, this.#view, 0, 1, this.#offset);
    return this.#view.getUint8(0);
  }

  readInt16() {
    this.#offset += fs.readSync(this.#fd, this.#view, 0, 2, this.#offset);
    return this.#view.getInt16(0, this.#littleEndian);
  }

  readInt16Be() {
    this.#offset += fs.readSync(this.#fd, this.#view, 0, 2, this.#offset);
    return this.#view.getInt16(0, false);
  }

  readInt16Le() {
    this.#offset += fs.readSync(this.#fd, this.#view, 0, 2, this.#offset);
    return this.#view.getInt16(0, true);
  }

  readUint16() {
    this.#offset += fs.readSync(this.#fd, this.#view, 0, 2, this.#offset);
    return this.#view.getUint16(0, this.#littleEndian);
  }

  readUint16Be() {
    this.#offset += fs.readSync(this.#fd, this.#view, 0, 2, this.#offset);
    return this.#view.getUint16(0, false);
  }

  readUint16Le() {
    this.#offset += fs.readSync(this.#fd, this.#view, 0, 2, this.#offset);
    return this.#view.getUint16(0, true);
  }

  readInt32() {
    this.#offset += fs.readSync(this.#fd, this.#view, 0, 4, this.#offset);
    return this.#view.getInt32(0, this.#littleEndian);
  }

  readInt32Be() {
    this.#offset += fs.readSync(this.#fd, this.#view, 0, 4, this.#offset);
    return this.#view.getInt32(0, false);
  }

  readInt32Le() {
    this.#offset += fs.readSync(this.#fd, this.#view, 0, 4, this.#offset);
    return this.#view.getInt32(0, true);
  }

  readUint32() {
    this.#offset += fs.readSync(this.#fd, this.#view, 0, 4, this.#offset);
    return this.#view.getUint32(0, this.#littleEndian);
  }

  readUint32Be() {
    this.#offset += fs.readSync(this.#fd, this.#view, 0, 4, this.#offset);
    return this.#view.getUint32(0, false);
  }

  readUint32Le() {
    this.#offset += fs.readSync(this.#fd, this.#view, 0, 4, this.#offset);
    return this.#view.getUint32(0, true);
  }

  readInt64() {
    this.#offset += fs.readSync(this.#fd, this.#view, 0, 8, this.#offset);
    return this.#view.getBigInt64(0, this.#littleEndian);
  }

  readInt64Be() {
    this.#offset += fs.readSync(this.#fd, this.#view, 0, 8, this.#offset);
    return this.#view.getBigInt64(0, false);
  }

  readInt64Le() {
    this.#offset += fs.readSync(this.#fd, this.#view, 0, 8, this.#offset);
    return this.#view.getBigInt64(0, true);
  }

  readUint64() {
    this.#offset += fs.readSync(this.#fd, this.#view, 0, 8, this.#offset);
    return this.#view.getBigUint64(0, this.#littleEndian);
  }

  readUint64Be() {
    this.#offset += fs.readSync(this.#fd, this.#view, 0, 8, this.#offset);
    return this.#view.getBigUint64(0, false);
  }

  readUint64Le() {
    this.#offset += fs.readSync(this.#fd, this.#view, 0, 8, this.#offset);
    return this.#view.getBigUint64(0, true);
  }

  readFloat32() {
    this.#offset += fs.readSync(this.#fd, this.#view, 0, 4, this.#offset);
    return this.#view.getFloat32(0, this.#littleEndian);
  }

  readFloat32Be() {
    this.#offset += fs.readSync(this.#fd, this.#view, 0, 4, this.#offset);
    return this.#view.getFloat32(0, false);
  }

  readFloat32Le() {
    this.#offset += fs.readSync(this.#fd, this.#view, 0, 4, this.#offset);
    return this.#view.getFloat32(0, true);
  }

  readFloat64() {
    this.#offset += fs.readSync(this.#fd, this.#view, 0, 8, this.#offset);
    return this.#view.getFloat64(0, this.#littleEndian);
  }

  readFloat64Be() {
    this.#offset += fs.readSync(this.#fd, this.#view, 0, 8, this.#offset);
    return this.#view.getFloat64(0, false);
  }

  readFloat64Le() {
    this.#offset += fs.readSync(this.#fd, this.#view, 0, 8, this.#offset);
    return this.#view.getFloat64(0, true);
  }

  readBytes(size: number) {
    const value = new Uint8Array(size);
    this.#offset += fs.readSync(this.#fd, value, 0, size, this.#offset);
    return value;
  }

  readBytesTerminated(terminator: number = 0x00) {
    const bytes = [];

    while (!this.eof) {
      const byte = this.readUint8();

      if (byte === terminator) {
        break;
      }

      bytes.push(byte);
    }

    return new Uint8Array(bytes);
  }

  writeInt8(value: number) {
    this.#view.setInt8(0, value);
    fs.writeSync(this.#fd, this.#view, 0, 1, this.#offset);
    this.#offset += 1;
  }

  writeUint8(value: number) {
    this.#view.setUint8(0, value);
    fs.writeSync(this.#fd, this.#view, 0, 1, this.#offset);
    this.#offset += 1;
  }

  writeInt16(value: number) {
    this.#view.setInt16(0, value, this.#littleEndian);
    fs.writeSync(this.#fd, this.#view, 0, 2, this.#offset);
    this.#offset += 2;
  }

  writeInt16Be(value: number) {
    this.#view.setInt16(0, value, false);
    fs.writeSync(this.#fd, this.#view, 0, 2, this.#offset);
    this.#offset += 2;
  }

  writeInt16Le(value: number) {
    this.#view.setInt16(0, value, true);
    fs.writeSync(this.#fd, this.#view, 0, 2, this.#offset);
    this.#offset += 2;
  }

  writeUint16(value: number) {
    this.#view.setUint16(0, value, this.#littleEndian);
    fs.writeSync(this.#fd, this.#view, 0, 2, this.#offset);
    this.#offset += 2;
  }

  writeUint16Be(value: number) {
    this.#view.setUint16(0, value, false);
    fs.writeSync(this.#fd, this.#view, 0, 2, this.#offset);
    this.#offset += 2;
  }

  writeUint16Le(value: number) {
    this.#view.setUint16(0, value, true);
    fs.writeSync(this.#fd, this.#view, 0, 2, this.#offset);
    this.#offset += 2;
  }

  writeInt32(value: number) {
    this.#view.setInt32(0, value, this.#littleEndian);
    fs.writeSync(this.#fd, this.#view, 0, 4, this.#offset);
    this.#offset += 4;
  }

  writeInt32Be(value: number) {
    this.#view.setInt32(0, value, false);
    fs.writeSync(this.#fd, this.#view, 0, 4, this.#offset);
    this.#offset += 4;
  }

  writeInt32Le(value: number) {
    this.#view.setInt32(0, value, true);
    fs.writeSync(this.#fd, this.#view, 0, 4, this.#offset);
    this.#offset += 4;
  }

  writeUint32(value: number) {
    this.#view.setUint32(0, value, this.#littleEndian);
    fs.writeSync(this.#fd, this.#view, 0, 4, this.#offset);
    this.#offset += 4;
  }

  writeUint32Be(value: number) {
    this.#view.setUint32(0, value, false);
    fs.writeSync(this.#fd, this.#view, 0, 4, this.#offset);
    this.#offset += 4;
  }

  writeUint32Le(value: number) {
    this.#view.setUint32(0, value, true);
    fs.writeSync(this.#fd, this.#view, 0, 4, this.#offset);
    this.#offset += 4;
  }

  writeInt64(value: bigint) {
    this.#view.setBigInt64(0, value, this.#littleEndian);
    fs.writeSync(this.#fd, this.#view, 0, 8, this.#offset);
    this.#offset += 8;
  }

  writeInt64Be(value: bigint) {
    this.#view.setBigInt64(0, value, false);
    fs.writeSync(this.#fd, this.#view, 0, 8, this.#offset);
    this.#offset += 8;
  }

  writeInt64Le(value: bigint) {
    this.#view.setBigInt64(0, value, true);
    fs.writeSync(this.#fd, this.#view, 0, 8, this.#offset);
    this.#offset += 8;
  }

  writeUint64(value: bigint) {
    this.#view.setBigUint64(0, value, this.#littleEndian);
    fs.writeSync(this.#fd, this.#view, 0, 8, this.#offset);
    this.#offset += 8;
  }

  writeUint64Be(value: bigint) {
    this.#view.setBigUint64(0, value, false);
    fs.writeSync(this.#fd, this.#view, 0, 8, this.#offset);
    this.#offset += 8;
  }

  writeUint64Le(value: bigint) {
    this.#view.setBigUint64(0, value, true);
    fs.writeSync(this.#fd, this.#view, 0, 8, this.#offset);
    this.#offset += 8;
  }

  writeFloat32(value: number) {
    this.#view.setFloat32(0, value, this.#littleEndian);
    fs.writeSync(this.#fd, this.#view, 0, 4, this.#offset);
    this.#offset += 4;
  }

  writeFloat32Be(value: number) {
    this.#view.setFloat32(0, value, false);
    fs.writeSync(this.#fd, this.#view, 0, 4, this.#offset);
    this.#offset += 4;
  }

  writeFloat32Le(value: number) {
    this.#view.setFloat32(0, value, true);
    fs.writeSync(this.#fd, this.#view, 0, 4, this.#offset);
    this.#offset += 4;
  }

  writeFloat64(value: number) {
    this.#view.setFloat64(0, value, this.#littleEndian);
    fs.writeSync(this.#fd, this.#view, 0, 8, this.#offset);
    this.#offset += 8;
  }

  writeFloat64Be(value: number) {
    this.#view.setFloat64(0, value, false);
    fs.writeSync(this.#fd, this.#view, 0, 8, this.#offset);
    this.#offset += 8;
  }

  writeFloat64Le(value: number) {
    this.#view.setFloat64(0, value, true);
    fs.writeSync(this.#fd, this.#view, 0, 8, this.#offset);
    this.#offset += 8;
  }

  writeBytes(value: Uint8Array) {
    fs.writeSync(this.#fd, value, 0, value.byteLength, this.#offset);
    this.#offset += value.byteLength;
  }
}

export default FsStream;
