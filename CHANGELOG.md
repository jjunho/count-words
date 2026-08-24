# Change Log

All notable changes to the "word-and-character-count" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [Unreleased]

### New Features

- Added Marketplace metadata for discovery, including the Productivity category, search keywords, repository links, and gallery presentation.
- Added the `Word & Character Count: Refresh Count` Command Palette contribution.
- Added an original 128×128 PNG extension icon.
- Added `SUPPORT.md` with issue-reporting guidance and the repository issue tracker link.
- CLDR-compliant plural rules for all supported languages
- Proper handling of Slavic language pluralization (one/few/many categories)
- Correct "zero" handling: plural in European Portuguese, singular in Brazilian Portuguese
- Support for French "zero" as singular
- Advanced plural forms for Russian, Ukrainian, Polish, and Czech languages

### Improvements

- Rewrote i18n system to use proper plural categories instead of simple singular/plural
- Improved grammatical accuracy across all 14+ supported languages

## [0.0.2] - 2024-10-28

### Features

- i18n support for Spanish, French, German, Italian, Dutch, Polish, Czech, Turkish, Russian, Ukrainian, Bulgarian, Greek, and Portuguese (Portugal).
- Comprehensive automated tests for all supported languages and pluralization.

### Fixed

- Refactored i18n test logic to avoid direct mutation of VS Code API and telemetry proposal errors.
- Fixed Spanish tooltip translation.

---

## [0.0.1] - 2024-10-28

### Initial Release

- Initial release: live word and character count in the status bar for the whole document or selection.
- Status bar tooltip for extra context.
- Internationalization (i18n) support for English and Brazilian Portuguese.
- Pluralization for word/character labels.
- Support for multiple file types (plaintext, markdown, code, etc.).
- Marketplace-ready packaging instructions in README.
- MIT license and repository metadata.
- Improved README for GitHub and Marketplace readiness.
- TypeScript/webpack build configuration.

