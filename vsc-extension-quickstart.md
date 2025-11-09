# Word & Character Count Extension - Quick Start

## What This Extension Does

This VS Code extension provides real-time word and character counting with **CLDR-compliant internationalization** supporting 14+ languages with grammatically correct pluralization.

## Key Features

- **Real-time counting** in the status bar
- **CLDR-compliant pluralization** for linguistic accuracy
- **Advanced Slavic language support** (Russian, Ukrainian, Polish, Czech)
- **Regional variant support** (PT-BR vs PT-PT for "zero" handling)
- **14+ languages** with automatic detection

## Folder Structure

* `package.json` - Extension manifest with metadata and activation events
* `src/extension.ts` - Main extension code with status bar integration
* `src/i18n.ts` - CLDR-compliant internationalization system with plural rules
* `src/test/extension.test.ts` - Comprehensive test suite (17 tests covering all languages)
* `webpack.config.js` - Build configuration for production bundling

## Development Setup

### Prerequisites

- Node.js (v18+ recommended)
- npm
- VS Code

### Install Dependencies

```bash
npm install
```


```bash
npm install
```

### Development Workflow

1. **Compile once**:
   ```bash
   npm run compile
   ```

2. **Watch mode** (auto-recompile on changes):
   ```bash
   npm run watch
   ```

3. **Run tests**:
   ```bash
   npm test
   ```

4. **Lint code**:
   ```bash
   npm run lint
   ```

## Testing the Extension

1. Open this project in VS Code
2. Press `F5` to launch Extension Development Host
3. Open any text file
4. Look at the status bar (bottom right) for the word/character count
5. Select text to see counts update for the selection only

## Understanding the Internationalization System

### CLDR Plural Categories

The extension uses Unicode CLDR plural rules with 6 categories:

- `one` - Singular (1 item)
- `few` - A few items (2-4 in Slavic languages)
- `many` - Many items (5+ in Slavic languages)
- `two` - Dual form (Slovenian)
- `zero` - Zero items (some languages)
- `other` - Default fallback

### Examples by Language

**English** (simple: one/other)
- 0 words, 1 word, 2 words

**Russian** (complex: one/few/many)
- 1 символ (one), 2 символа (few), 5 символов (many)

**Polish** (complex: one/few/many)
- 1 znak (one), 2 znaki (few), 5 znaków (many)

**Portuguese BR** (zero is singular)
- 0 palavra, 1 palavra, 2 palavras

**Portuguese PT** (zero is plural)
- 0 palavras, 1 palavra, 2 palavras

### Adding a New Language

1. Add plural category logic in `src/i18n.ts`:
   ```typescript
   case 'xx': // your language code
     if (n === 1) return 'one';
     return 'other';
   ```

2. Add translations:
   ```typescript
   'xx': {
     word: { one: 'singular', other: 'plural' },
     character: { one: 'singular', other: 'plural' },
     tooltip: 'Your tooltip text'
   }
   ```

3. Add tests in `src/test/extension.test.ts`

4. Run tests: `npm test`

## Building for Production

```bash
npm run package
```

This creates an optimized bundle with webpack.

## Packaging for Distribution

```bash
npx @vscode/vsce package
```

Creates a `.vsix` file you can install or publish.

## Publishing

1. Get a Personal Access Token from Azure DevOps
2. Create a publisher account
3. Publish:
   ```bash
   npx @vscode/vsce publish
   ```

## Architecture Notes

### Extension Activation

The extension activates on `onStartupFinished` (runs when VS Code fully loads).

### Status Bar Updates

Updates happen on:
- Active editor change
- Text selection change  
- Document content change

### Performance

- Lightweight regex-based word counting
- No performance impact on large files
- Debouncing not needed due to fast execution

## Testing Strategy

Tests cover:
- All 14+ supported languages
- Edge cases: 0, 1, 2, 5, 21 (to test cycling in Slavic languages)
- All plural categories (one, few, many, other)
- Fallback to English for unknown languages
- Tooltip translations

## Resources

- [VS Code Extension API](https://code.visualstudio.com/api)
- [CLDR Plural Rules](https://cldr.unicode.org/index/cldr-spec/plural-rules)
- [Publishing Extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)

## Troubleshooting

**Tests failing?**
- Ensure you've run `npm run compile` first
- Check that test expectations match CLDR rules

**Linting errors?**
- Run `npm run lint` to see issues
- ESLint requires curly braces for if statements

**Webpack errors?**
- Delete `dist/` and `out/` folders
- Run `npm run compile` again

## Next Steps

- Add more languages
- Add configuration options
- Implement custom word counting rules
- Add keyboard shortcuts
