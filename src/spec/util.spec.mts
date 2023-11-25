import { describe, expect, test } from 'vitest';
import FsStream from '../lib/stream/FsStream.mts';
import ArrayBufferStream from '../lib/stream/ArrayBufferStream.mts';
import { openStream } from '../lib/stream/util.mjs';

describe('getStream', () => {
  test('returns FsStream object when given path to file', () => {
    const stream = openStream('./fixture/fixture.bmp');
    expect(stream).toBeInstanceOf(FsStream);
  });

  test('returns ArrayBufferStream object when given Uint8Array', () => {
    const view = new Uint8Array(10);
    const stream = openStream(view);
    expect(stream).toBeInstanceOf(ArrayBufferStream);
  });

  test('returns ArrayBufferStream object when given ArrayBuffer', () => {
    const buffer = new ArrayBuffer(10);
    const stream = openStream(buffer);
    expect(stream).toBeInstanceOf(ArrayBufferStream);
  });
});
