# Changelog

## [4.3.2] - 2024-03-08

### Added

- Add `audio_url` property to `TranscribeParams` in addition to the `audio` property. You can use one or the other. `audio_url` only accepts a URL string.
- Add `TranscriptReadyNotification` type for the transcript webhook body.

### Changed

- Update codebase to use TSDoc
- Update README.md with more samples

## [4.3.0] - 2024-02-15

### Added

- Add `RealtimeTranscriber.configureEndUtteranceSilenceThreshold` function
- Add `RealtimeTranscriber.forceEndUtterance` function
- Add `end_utterance_silence_threshold` property to `CreateRealtimeTranscriberParams` and `RealtimeTranscriberParams` types.

## [4.2.3] - 2024-02-13

### Added

- Add `speech_model` field to `TranscriptParams` and add `SpeechModel` type.

## [4.2.2] - 2024-01-29

### Changed

- Windows paths passed to `client.transcripts.transcribe` and `client.transcripts.submit` will work as expected.

## [4.2.1] - 2024-01-23

### Added

- Add `answer_format` to `LemurActionItemsParams` type

### Changed

- Rename `RealtimeService` to `RealtimeTranscriber`, `RealtimeServiceFactory` to `RealtimeTranscriberFactory`, `RealtimeTranscriberFactory.createService()` to `RealtimeTranscriberFactory.transcriber()`. Deprecated aliases are provided for all old types and functions for backwards compatibility.
- Restrict the type for `redact_pii_audio_quality` from `string` to `RedactPiiAudioQuality` an enum string.

## [4.2.0] - 2024-01-11

### Added

- Add `content_safety_confidence` to `TranscriptParams` & `TranscriptOptionalParams`.

### Changed

- The `RealtimeService` now sends audio as binary instead of a base64-encoded JSON object.

## [4.1.0] - 2023-12-22

### Added

- Add `"anthropic/claude-2-1"` to `LemurModel` type
- Add `encoding` option to the real-time service and factory. `encoding` can be `"pcm_s16le"` or `"pcm_mulaw"`.
- `"pcm_mulaw"` is a newly supported audio encoding for the real-time service.

### Changed

- Allow any string into `final_model` for LeMUR requests

## [4.0.1] - 2023-12-14

### Added

- Add `"assemblyai/mistral-7b"` to `LemurModel` type

### Changed

- Update types with `@example`
- Update types with `Format: uuid` if applicable

## [4.0.0] - 2023-12-08

### Added

- Add `node`, `deno`, `bun`, `browser`, and `workerd` (Cloudflare Workers) exports to package.json. These exports are compatible versions of the SDK, with a few limitations in some cases. For more details, consult the [SDK Compatibility document](./docs/compat.md).
- Add `dist/assemblyai.umd.js` and `dist/assemblyai.umd.min.js`. You can reference these script files directly in the browser and the SDK will be available at the global `assemblyai` variable.

### Changed

- `RealtimeService.sendAudio` accepts audio via type `ArrayBufferLike`.
- **Breaking**: `RealtimeService.stream` returns a [WHATWG Streams Standard stream](https://nodejs.org/api/webstreams.html), instead of a Node stream. In the browser, the native web standard stream will be used.
- `ws` is used as the WebSocket client as before, but in the browser, the native WebSocket client is used.
- Rename Node SDK to JavaScript SDK as the SDK is compatible with more runtimes now.

## [3.1.1] - 2023-11-21

### Added

- Add `client.transcripts.transcribe` function to transcribe an audio file with polling until transcript status is `completed` or `error`. This function takes an `audio` option which can be an audio file URL, path, stream, or buffer.
- Add `client.transcripts.submit` function to queue a transcript. You can use `client.transcripts.waitUntilReady` to poll the transcript returned by `submit`. This function also takes an `audio` option which can be an audio file URL, path, stream, or buffer.

### Changed

- Deprecated `client.transcripts.create` in favor of `transcribe` and `submit`, to be more consistent with other AssemblyAI SDKs.
- Renamed types
  - Renamed `Parameters` type suffix with `Params` type suffix
  - Renamed `CreateTranscriptParameters` to `TranscriptParams`
  - Renamed `CreateTranscriptOptionalParameters` to `TranscriptOptionalParams`.
- Added deprecated aliases for the forementioned types
- Improved type docs

## [3.1.0] - 2023-11-16

### Added

- Add `AssemblyAI.transcripts.waitUntilReady` function to wait until a transcript is ready, meaning `status` is `completed` or `error`.
- Add `chars_per_caption` parameter to `AssemblyAI.transcripts.subtitles` function.
- Add `input_text` property to LeMUR functions. Instead of using `transcript_ids`, you can use `input_text` to provide custom formatted transcripts as input to LeMUR.

### Changed

- Change default timeout from 3 minutes to infinite (-1). Fixes [#17](https://github.com/AssemblyAI/assemblyai-node-sdk/issues/17)

### Fixed

- Correctly serialize the keywords for `client.transcripts.wordSearch`.
- Use more widely compatible syntax for wildcard exporting types. Fixes [#18](https://github.com/AssemblyAI/assemblyai-node-sdk/issues/18).

## [3.0.1] - 2023-10-30

### Changed

- The SDK uses `fetch` instead of Axios. This removes the Axios dependency. Axios relies on XMLHttpRequest which isn't supported in Cloudflare Workers, Deno, Bun, etc. By using `fetch`, the SDK is now more compatible on the forementioned runtimes.

### Fixed

- The SDK uses relative imports instead of using path aliases, to make the library transpilable with tsc for consumers. Fixes [#14](https://github.com/AssemblyAI/assemblyai-node-sdk/issues/14).
- Added `speaker` property to the `TranscriptUtterance` type, and removed `channel` property.

## [3.0.0] - 2023-10-24

### Changed

- `AssemblyAI.files.upload` accepts streams and buffers, in addition to a string (path to file).

### Removed

- **Breaking**: The module does not have a default export anymore, because of inconsistent functionality across module systems. Instead, use `AssemblyAI` as a named import like this: `import { AssemblyAI } from 'assemblyai'`.

## [2.0.2] - 2023-10-13

### Added

- `AssemblyAI.transcripts.wordSearch` searches for keywords in the transcript.
- `AssemblyAI.lemur.purgeRequestData` deletes data related to your LeMUR request.
- `RealtimeService.stream` creates a writable stream that you can write audio data to instead of using `RealtimeService.sendAudio``.

### Fixed

- The AssemblyAI class would be exported as default named export instead in certain module systems.

## [2.0.1] - 2023-10-10

Re-implement the Node SDK in TypeScript and add all AssemblyAI APIs.

### Added

- Transcript API client
- LeMUR API client
- Real-time transcript client
