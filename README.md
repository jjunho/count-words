# Word & Character Count

> **Never lose track of your writing progress again.** Get instant, real-time word and character counts right in your VS Code status bar.

[![Version](https://img.shields.io/badge/version-0.0.2-blue.svg)](https://github.com/jjunho/count-words)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

---

## ✨ Why You'll Love This Extension

Writing documentation? Crafting a blog post? Meeting a character limit? This lightweight extension keeps you informed at a glance — no need to select text or run commands. Just write, and watch your counts update live in the status bar.

### 🚀 Key Features

- **📊 Real-Time Counting** - Instant updates as you type, no lag or delay
- **🎯 Selection Support** - Count selected text or the entire document
- **🌍 14+ Languages** - Automatically displays in your preferred language
- **⚡ Lightweight** - Zero performance impact on your editor
- **🎨 Clean Interface** - Elegant status bar display that stays out of your way
- **📝 Universal** - Works with Markdown, code files, plain text, and more

---

## 📸 See It In Action

*Status bar (bottom right) displays your counts:*

```text
📝 12 words, 80 characters
```

Simply hover over the status bar item for additional context!

---

## 🎯 Perfect For

- **✍️ Writers** - Track your progress on articles, documentation, or creative writing
- **📚 Students** - Meet essay requirements and assignment word counts
- **💼 Professionals** - Stay within character limits for social media, emails, or reports
- **👨‍💻 Developers** - Monitor code comments, commit messages, and documentation
- **🌐 Content Creators** - Optimize content length for SEO and readability

---

## 🚀 Getting Started

1. **Install** the extension from the VS Code Marketplace
2. **Open** any text file (Markdown, JavaScript, Python, plain text, etc.)
3. **Look** at the bottom-right status bar — you'll see your counts instantly!

### 📝 Using It

- **Whole Document**: Just open a file — counts appear automatically
- **Selected Text**: Highlight any text — counts update to show only the selection
- **Live Updates**: Type away — counts refresh in real-time as you write

---

## 🌍 Speaks Your Language

The extension automatically adapts to your VS Code language settings with **linguistically accurate pluralization** following CLDR (Common Locale Data Repository) standards.

**🌎 Americas & Europe:**

- English, Spanish, Portuguese (Brazil & Portugal), French, German, Italian, Dutch

**🌍 Eastern Europe & Middle East:**

- Polish, Czech, Turkish, Russian, Ukrainian, Bulgarian, Greek

### Advanced Pluralization

Unlike simple extensions that only handle singular/plural, we implement proper CLDR plural rules:

- **Slavic Languages** (Russian, Ukrainian, Polish): Use one/few/many forms
  - *Russian*: 1 символ, 2 символа, 5 символов, 21 символ
  - *Polish*: 1 znak, 2 znaki, 5 znaków
  - *Czech*: 1 slovo, 2 slova, 5 slov

- **Portuguese Variants**: Proper "zero" handling
  - *PT-BR*: 0 palavra (singular, normative preference)
  - *PT-PT*: 0 palavras (plural, standard grammar)

- **French**: Zero and one both use singular form
  - *French*: 0 mot, 1 mot, 2 mots

Smart pluralization ensures proper grammar in every language, respecting linguistic nuances and regional preferences.

---

## 🎨 Features You'll Appreciate

### Seamless Integration

Fits naturally into your workflow with a minimal status bar presence. No distracting popups or notifications.

### Zero Configuration

Works perfectly out of the box. No settings to configure, no commands to remember.

### Lightning Fast

Built with performance in mind — counts update instantly without slowing down your editor.

### Universal Compatibility

Works with any file type that contains text. Markdown, code, JSON, logs — if you can type it, we can count it.

---

## ⚙️ For Developers

### Building from Source

```bash
# Clone the repository
git clone https://github.com/jjunho/count-words.git
cd count-words

# Install dependencies
npm install

# Compile and watch for changes
npm run watch

# Run tests
npm test

# Package the extension
npx @vscode/vsce package
```

### Project Structure

- `src/extension.ts` - Main extension logic and status bar integration
- `src/i18n.ts` - CLDR-compliant internationalization with 14+ language translations and plural rules
- `src/test/` - Comprehensive test suite covering all languages and plural categories
- `package.json` - Extension manifest and dependencies
- `webpack.config.js` - Build configuration

### Contributing

We welcome contributions! Here's how you can help:

1. **🐛 Report bugs** - Open an issue with details and reproduction steps
2. **💡 Suggest features** - Share your ideas for improvements
3. **🌍 Add translations** - Help us support more languages (see `src/i18n.ts`)
4. **🔧 Submit PRs** - Fork the repo, make changes, and submit a pull request

**Adding a new language:**

1. Add CLDR plural category function in `src/i18n.ts` (getPluralCategory)
2. Add translation strings with proper plural forms (one, few, many, other)
3. Add comprehensive tests covering 0, 1, 2, 5, and 21 (to test cycling)
4. Ensure all tests pass with `npm test`

Please ensure your code passes all tests (`npm test`) and follows the existing code style.

---

## 📋 What's New

### Version 0.0.3 (Upcoming)

- 🌍 **CLDR-Compliant Pluralization** - Implemented proper Unicode CLDR plural rules
- 🇷🇺 **Advanced Slavic Support** - Correct one/few/many forms for Russian, Ukrainian, Polish, Czech
- 🇧🇷🇵🇹 **Regional Portuguese Variants** - Proper "zero" handling (singular in BR, plural in PT)
- 🇫🇷 **French Zero Support** - Both 0 and 1 use singular form
- ✅ **Comprehensive Testing** - Full coverage for all plural categories and edge cases
- 📚 **Linguistic Accuracy** - Grammatically correct in all 14+ supported languages

### Version 0.0.2

- ✨ Added support for 14+ languages with automatic detection
- ✅ Comprehensive test coverage for all supported languages
- 🔧 Improved code quality and extension structure
- 🌍 Smart pluralization for better grammar in every language

### Version 0.0.1

- 🎉 Initial release with core word and character counting
- 📊 Real-time status bar display
- 🔄 Support for document and selection counting

[View Full Changelog](CHANGELOG.md)

---

## 📖 FAQ

**Q: Does this work with code files?**  
A: Yes! It works with any text-based file including code, markdown, JSON, logs, and more.

**Q: Can I count only selected text?**  
A: Absolutely. Just select any text and the status bar updates to show counts for your selection only.

**Q: Does it slow down VS Code?**  
A: No. The extension is extremely lightweight and has zero noticeable impact on performance.

**Q: Can I customize what's displayed?**  
A: Currently, the extension displays both word and character counts. Customization options may come in future versions.

**Q: What about different alphabets (Cyrillic, Greek, etc.)?**  
A: The extension correctly counts words and characters in all languages, including non-Latin alphabets.

---

## 📄 License

This extension is licensed under the [MIT License](LICENSE). Free to use, modify, and distribute.

---

## 🙏 Support & Feedback

- **⭐ Enjoying the extension?** Please rate it on the marketplace and share with friends!
- **🐛 Found a bug?** [Open an issue](https://github.com/jjunho/count-words/issues)
- **💬 Have questions?** [Start a discussion](https://github.com/jjunho/count-words/discussions)

---

Made with ❤️ for writers, developers, and everyone who counts words
