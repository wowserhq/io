import { describe, expect, test } from 'vitest';
import { getStream } from '../lib/util.mts';
import FsStream from '../lib/stream/FsStream.mts';
import ArrayBufferStream from '../lib/stream/ArrayBufferStream.mts';

describe('getStream', () => {
  test('returns FsStream object when given path to file', () => {
    const stream = getStream('./fixture/fixture.bmp');
    expect(stream).toBeInstanceOf(FsStream);
  });

  test('returns ArrayBufferStream object when given Uint8Array', () => {
    const view = new Uint8Array(10);
    const stream = getStream(view);
    expect(stream).toBeInstanceOf(ArrayBufferStream);
  });

  test('returns ArrayBufferStream object when given ArrayBuffer', () => {
    const buffer = new ArrayBuffer(10);
    const stream = getStream(buffer);
    expect(stream).toBeInstanceOf(ArrayBufferStream);
  });
});
