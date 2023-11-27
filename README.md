# Wowser IO

[![Join community](https://img.shields.io/badge/discord-join_community-blue.svg?style=flat)](https://discord.com/invite/DeVVKVg)
[![CI Status](https://github.com/wowserhq/io/actions/workflows/ci.yml/badge.svg)](https://github.com/wowserhq/io/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/%40wowserhq%2Fio)](https://www.npmjs.com/package/@wowserhq/io)

An IO utility library for Wowser.

## Usage

To install Wowser IO:

```sh
npm install @wowserhq/io
```

To use Wowser IO in an ES2015 module environment:

```js
import * as io from '@wowserhq/io';
```

To use Wowser IO in a CommonJS module environment:

```js
const io = require('@wowserhq/io');
```

## Example

Wowser IO provides a set of types to work with numeric, array, string, struct, and tag-length-value data formats.
Wowser's IO types permit reading and writing data.

```js
import * as io from '@wowserhq/io';

const mver = io.struct({
  version: io.uint32le,
});

const rawData = new Uint8Array([0x10, 0x00, 0x00, 0x00]);
const readData = mver.read(rawData);

console.log(readData);
// { version: 16 }
```

## License

Wowser IO is copyright © Wowser Contributors. It is licensed under the **MIT** license. See
`LICENSE` for more information.
