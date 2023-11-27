type IoContext = {
  local?: object;
  root?: object;
};

type IoSource = string | number | ArrayBuffer | IoStream;

type IoStream = {
  eof: boolean;
  offset: number;

  close: () => void;

  readInt8: () => number;
  readUint8: () => number;
  readInt16: () => number;
  readInt16Be: () => number;
  readInt16Le: () => number;
  readUint16: () => number;
  readUint16Be: () => number;
  readUint16Le: () => number;
  readInt32: () => number;
  readInt32Be: () => number;
  readInt32Le: () => number;
  readUint32: () => number;
  readUint32Be: () => number;
  readUint32Le: () => number;
  readInt64: () => bigint;
  readInt64Be: () => bigint;
  readInt64Le: () => bigint;
  readUint64: () => bigint;
  readUint64Be: () => bigint;
  readUint64Le: () => bigint;
  readFloat32: () => number;
  readFloat32Be: () => number;
  readFloat32Le: () => number;
  readFloat64: () => number;
  readFloat64Be: () => number;
  readFloat64Le: () => number;
  readBytes: (size: number) => Uint8Array;
  readBytesTerminated: (terminator?: number) => Uint8Array;

  writeInt8: (value: number) => void;
  writeUint8: (value: number) => void;
  writeInt16: (value: number) => void;
  writeInt16Be: (value: number) => void;
  writeInt16Le: (value: number) => void;
  writeUint16: (value: number) => void;
  writeUint16Be: (value: number) => void;
  writeUint16Le: (value: number) => void;
  writeInt32: (value: number) => void;
  writeInt32Be: (value: number) => void;
  writeInt32Le: (value: number) => void;
  writeUint32: (value: number) => void;
  writeUint32Be: (value: number) => void;
  writeUint32Le: (value: number) => void;
  writeInt64: (value: bigint) => void;
  writeInt64Be: (value: bigint) => void;
  writeInt64Le: (value: bigint) => void;
  writeUint64: (value: bigint) => void;
  writeUint64Be: (value: bigint) => void;
  writeUint64Le: (value: bigint) => void;
  writeFloat32: (value: number) => void;
  writeFloat32Be: (value: number) => void;
  writeFloat32Le: (value: number) => void;
  writeFloat64: (value: number) => void;
  writeFloat64Be: (value: number) => void;
  writeFloat64Le: (value: number) => void;
  writeBytes: (value: Uint8Array) => void;
};

type IoType = {
  getSize: (value: any) => number;
  read: (source: IoSource, context: IoContext) => any;
  write?: (source: IoSource, value: any, context: IoContext) => any;
};

export { IoContext, IoSource, IoStream, IoType };
