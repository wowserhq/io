# Changelog

## [2.0.2](https://github.com/wowserhq/io/compare/v2.0.1...v2.0.2) (2024-01-01)


### Bug Fixes

* **string:** properly offset trimmed buffer ([1f20fe4](https://github.com/wowserhq/io/commit/1f20fe44c580700669a9f2198ce2bc4f35e97343))

## [2.0.1](https://github.com/wowserhq/io/compare/v2.0.0...v2.0.1) (2023-12-21)


### Bug Fixes

* **typedarray:** remove fast io path until we properly check for alignment ([cf726d7](https://github.com/wowserhq/io/commit/cf726d705707c5da3978b914816cad77b006741a))

## [2.0.0](https://github.com/wowserhq/io/compare/v1.5.1...v2.0.0) (2023-12-21)


### ⚠ BREAKING CHANGES

* **tlv:** The value type callback mechanism for TlvIo has been simplified: tag-to-value-type mappings should now be provided as properties on a plain JavaScript object.

### Features

* make context optional for IoType write ([c8f2ea0](https://github.com/wowserhq/io/commit/c8f2ea07213e80c2e535d1ea2fc31c973ea791b8))
* **tlv:** add padding option ([67b4ff1](https://github.com/wowserhq/io/commit/67b4ff1f3a73ad894f7db9b4b866d2f88907ebc3))
* **tlv:** simplify value type selection in TlvIo ([4768072](https://github.com/wowserhq/io/commit/47680721c3d92ddf04f78539daf541ff7c060b11))
* **typedarray:** add TypedArrayIo type for efficient typed array handling ([09102b7](https://github.com/wowserhq/io/commit/09102b700271e80ba24711650914c37660c6f331))


### Bug Fixes

* **tlv:** pass options through tlv helper ([23f1d46](https://github.com/wowserhq/io/commit/23f1d4637121471a538aad37ef1a6c469cd561bc))

## [1.5.1](https://github.com/wowserhq/io/compare/v1.5.0...v1.5.1) (2023-12-17)


### Bug Fixes

* **stream:** correct length calculation in terminated byte reads ([3f0a246](https://github.com/wowserhq/io/commit/3f0a246987e3f076ee84ca23193e7a49e54a06fc))

## [1.5.0](https://github.com/wowserhq/io/compare/v1.4.0...v1.5.0) (2023-12-17)


### Features

* **tlv:** handle zero-length TLVs ([26527ca](https://github.com/wowserhq/io/commit/26527ca8cdaf0af661e4002238714b2c18e1db0b))

## [1.4.0](https://github.com/wowserhq/io/compare/v1.3.0...v1.4.0) (2023-12-13)


### Features

* add io modes ([#33](https://github.com/wowserhq/io/issues/33)) ([66cc67e](https://github.com/wowserhq/io/commit/66cc67e4ffe495b1254410ee2ab3cbec8bb20e22))

## [1.3.0](https://github.com/wowserhq/io/compare/v1.2.2...v1.3.0) (2023-12-04)


### Features

* make context optional for IoType read ([71a59ff](https://github.com/wowserhq/io/commit/71a59ffb15f49e58706ceb86e71a1b3907ecc183))
* make options optional for array, string, and struct helpers ([29e9e82](https://github.com/wowserhq/io/commit/29e9e82bda3ebae7ba96f6d16b6718c18d52119d))

## [1.2.2](https://github.com/wowserhq/io/compare/v1.2.1...v1.2.2) (2023-11-29)


### Bug Fixes

* **fs:** avoid throwing exception in node check conditional ([9f951f8](https://github.com/wowserhq/io/commit/9f951f87567c20e5240b062bf4c4e891750ebb42))

## [1.2.1](https://github.com/wowserhq/io/compare/v1.2.0...v1.2.1) (2023-11-28)


### Bug Fixes

* **struct:** use correct return type for read function ([f245d4a](https://github.com/wowserhq/io/commit/f245d4abacf6a48f2bc79c21674d63b7309744e2))
* **types:** add missing types export directive to package file ([00463cd](https://github.com/wowserhq/io/commit/00463cdccbe058a77c9d18401f464cbdc1844152))

## [1.2.0](https://github.com/wowserhq/io/compare/v1.1.0...v1.2.0) (2023-11-28)


### Features

* **types:** export common types directly ([7411298](https://github.com/wowserhq/io/commit/7411298d700c90ee3345657872d479c741964164))

## [1.1.0](https://github.com/wowserhq/io/compare/v1.0.0...v1.1.0) (2023-11-27)


### Features

* **stream:** add export for openStream helper ([2bf6b87](https://github.com/wowserhq/io/commit/2bf6b87fe2e5ed06dc46ba94d09448965f0313b5))


### Bug Fixes

* **types:** ensure common types are visible in published package ([a766d4f](https://github.com/wowserhq/io/commit/a766d4fc46eb64d21dc9a9f421cc4316ddac6677))

## 1.0.0 (2023-11-26)

### Features

* initial release
