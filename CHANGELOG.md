# Change Log

All notable changes to the "word-and-character-count" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.


## [0.0.2] - 2025-09-28

### Added
- i18n support for Spanish, French, German, Italian, Dutch, Polish, Czech, Turkish, Russian, Ukrainian, Bulgarian, Greek, and Portuguese (Portugal).
- Comprehensive automated tests for all supported languages and pluralization.

### Fixed
- Refactored i18n test logic to avoid direct mutation of VS Code API and telemetry proposal errors.
- Fixed Spanish tooltip translation.

---

## [0.0.1] - 2025-09-28

### Added

- Initial release: live word and character count in the status bar for the whole document or selection.
- Status bar tooltip for extra context.
- Internationalization (i18n) support for English and Brazilian Portuguese.
- Pluralization for word/character labels.
- Support for multiple file types (plaintext, markdown, code, etc.).
- Packaging and publishing instructions in README.
- MIT license and repository metadata.

### Changed

- Improved README for GitHub and Marketplace publication.

### Fixed

- TypeScript/webpack build and packaging issues.
