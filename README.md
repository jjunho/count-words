
# Word & Character Count for VS Code

**A lightweight VS Code extension that displays live word and character counts for your document or selection, right in the status bar.**

---

## Table of Contents

- [Word \& Character Count for VS Code](#word--character-count-for-vs-code)
  - [Table of Contents](#table-of-contents)
  - [Key features](#key-features)
  - [Screenshot](#screenshot)
  - [Install](#install)
  - [Usage](#usage)
  - [Internationalization (i18n)](#internationalization-i18n)
  - [Development](#development)
  - [Packaging \& publishing](#packaging--publishing)
  - [Contributing](#contributing)
  - [License](#license)
  - [Changelog](#changelog)
  - [Acknowledgements](#acknowledgements)

---


## What's New (v0.0.2)

- Multi-language i18n support: English, Spanish, Portuguese (Brazil/Portugal), French, German, Italian, Dutch, Polish, Czech, Turkish, Russian, Ukrainian, Bulgarian, Greek.
- Comprehensive automated tests for all supported languages and pluralization.
- Telemetry API proposal error fixed (no more test failures on push).

## Key features

- Live count of words and characters for the entire document or the selected text.
- Status bar display with readable formatting and tooltip.
- Internationalization (i18n) for 14+ major languages (see below).
- Works with any text-based language (Markdown, JavaScript, TypeScript, Python, plaintext, etc.).

## Screenshot

<!--
If you have a screenshot, place it in the `images/` folder and uncomment the line below:
-->
<!-- ![Status bar shows word and character count](images/status-example.png) -->

*Status bar (bottom right) shows: `12 words, 80 characters` (example)*

## Install

You can install the extension in two main ways:

- Install from VSIX (local file):

```bash
## After you run `npx @vscode/vsce package`, the VSIX will be created in the project root
code --install-extension ./word-and-character-count-0.0.1.vsix
```

- Install from the Marketplace: publish the extension and install it normally from the VS Code extensions view.

## Usage

1. Launch VS Code (or the Extension Development Host during development using F5).
2. Open any text file.
3. Look at the bottom-right status bar for the counts. If you select text, the status bar shows counts only for the selection.

The extension activates on file open or on common languages (plaintext, markdown, javascript, typescript, python, etc.).


## Internationalization (i18n)

The extension supports the following languages (auto-detected from your VS Code UI):

- English (`en`)
- Spanish (`es`)
- Portuguese (`pt`, `pt-br`)
- French (`fr`)
- German (`de`)
- Italian (`it`)
- Dutch (`nl`)
- Polish (`pl`)
- Czech (`cs`)
- Turkish (`tr`)
- Russian (`ru`)
- Ukrainian (`uk`)
- Bulgarian (`bg`)
- Greek (`el`)

To add or improve a translation:
1. Edit `src/i18n.ts` and add/update the translation strings for your language.
2. Optionally add `package.nls.<lang>.json` for package metadata.

**Notes:**
- The status bar text uses pluralization ("1 word" vs "2 words") handled by the helper in `src/i18n.ts`.
- All i18n logic is covered by automated tests for every supported language.

## Telemetry and API proposals

This extension does **not** use VS Code telemetry. All tests and i18n logic are implemented without requiring the telemetry API proposal, so you will not see related errors when running or pushing.

## Development

Prerequisites:

- Node.js (recommended v18+)
- npm

Install dependencies and build:

```bash
npm install
npm run compile       # run webpack once
npm run watch         # run webpack in watch mode during development
```

Run the extension in the Extension Development Host:

1. Open the project in VS Code.
2. Press `F5` to launch a new Extension Development Host window with the extension loaded.

Lint and tests:

```bash
npm run lint
npm test
```

## Packaging & publishing

Create a VSIX package locally using the official packaging tool:

```bash
npx @vscode/vsce package --allow-star-activation
```

This will create a file like `word-and-character-count-0.0.1.vsix` in the project root. Install it locally with `code --install-extension`.

To publish to the Visual Studio Marketplace, follow the official publishing guide (you'll need a publisher, a Personal Access Token (PAT) and the `vsce` or `@vscode/vsce` tool). Example:

```bash
# login and publish (example)
npx @vscode/vsce login <publisher-name>
npx @vscode/vsce publish
```

See the VS Code extension publishing docs for a step-by-step guide.

## Contributing

Contributions are welcome. A suggested workflow:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feat/my-feature`.
3. Make changes, include tests where appropriate.
4. Run the test suite and linting.
5. Open a pull request describing the change.

Please follow the existing code style (TypeScript + ESLint) and keep changes small and focused.

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for release notes and version history.

## Acknowledgements

- Generated initially with `yo code` (VS Code Extension Generator).
