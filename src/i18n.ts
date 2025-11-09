import * as vscode from 'vscode';

/**
 * CLDR-Compliant Internationalization System
 * 
 * This module implements Unicode CLDR (Common Locale Data Repository) plural rules
 * for grammatically correct pluralization across 14+ languages.
 * 
 * Plural Categories (CLDR):
 * - zero: Used by languages that distinguish zero (e.g., Arabic)
 * - one: Singular form
 * - two: Dual form (e.g., Slovenian)
 * - few: For "a few" items (Slavic languages: typically 2-4)
 * - many: For "many" items (Slavic languages: typically 5+)
 * - other: Default fallback form
 * 
 * References:
 * - CLDR Plural Rules: https://cldr.unicode.org/index/cldr-spec/plural-rules
 * - Language Plural Rules: https://www.unicode.org/cldr/charts/latest/supplemental/language_plural_rules.html
 */

// CLDR Plural Categories
type PluralCategory = 'zero' | 'one' | 'two' | 'few' | 'many' | 'other';

/**
 * Get the appropriate plural category for a number in a given language
 * following CLDR specifications.
 * 
 * @param lang - Language code (e.g., 'en', 'ru', 'pt-br')
 * @param n - The number to get the plural category for
 * @returns The appropriate CLDR plural category
 * 
 * @example
 * getPluralCategory('ru', 1)  // 'one'  - 1 символ
 * getPluralCategory('ru', 2)  // 'few'  - 2 символа
 * getPluralCategory('ru', 5)  // 'many' - 5 символов
 * getPluralCategory('ru', 21) // 'one'  - 21 символ (cycles back)
 */
function getPluralCategory(lang: string, n: number): PluralCategory {
  const absN = Math.abs(n);
  const int = Math.floor(absN);
  const mod10 = int % 10;
  const mod100 = int % 100;

  switch (lang) {
    // Portuguese (European) - zero is plural
    case 'pt':
    case 'pt-pt':
      return n === 1 ? 'one' : 'other';

    // Portuguese (Brazilian) - zero is singular (normative preference)
    case 'pt-br':
      return (n === 0 || n === 1) ? 'one' : 'other';

    // Russian, Ukrainian, Belarusian, Serbian
    case 'ru':
    case 'uk':
    case 'be':
    case 'sr':
      if (mod10 === 1 && mod100 !== 11) {
        return 'one';
      }
      if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) {
        return 'few';
      }
      return 'many';

    // Polish
    case 'pl':
      if (n === 1) {
        return 'one';
      }
      if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
        return 'few';
      }
      return 'many';

    // Czech, Slovak
    case 'cs':
    case 'sk':
      if (n === 1) {
        return 'one';
      }
      if ([2, 3, 4].includes(int)) {
        return 'few';
      }
      return 'other';

    // Bulgarian
    case 'bg':
      if (n === 1) {
        return 'one';
      }
      return 'other';

    // Slovenian (has dual form)
    case 'sl':
      if (mod100 === 1) {
        return 'one';
      }
      if (mod100 === 2) {
        return 'two';
      }
      if ([3, 4].includes(mod100)) {
        return 'few';
      }
      return 'other';

    // French
    case 'fr':
      return (n === 0 || n === 1) ? 'one' : 'other';

    // Spanish, Italian, Dutch, German, Greek, Turkish
    case 'es':
    case 'it':
    case 'nl':
    case 'de':
    case 'el':
    case 'tr':
      return n === 1 ? 'one' : 'other';

    // English (default)
    case 'en':
    default:
      return n === 1 ? 'one' : 'other';
  }
}

/**
 * Translation set with CLDR plural forms
 * 
 * Languages provide different forms based on their plural requirements:
 * - Simple languages (EN, ES, IT): only 'one' and 'other'
 * - Slavic languages (RU, UK, PL): 'one', 'few', 'many', 'other'
 * - Slovenian: 'one', 'two', 'few', 'other' (has dual form)
 */
interface TranslationSet {
  one: string;
  two?: string;
  few?: string;
  many?: string;
  other: string;
}

type Translations = {
  [key: string]: TranslationSet | string;
};

/**
 * Translation database with CLDR-compliant plural forms
 * 
 * Key linguistic notes:
 * - PT-BR: Uses singular for zero (0 palavra) - normative preference
 * - PT-PT: Uses plural for zero (0 palavras) - standard grammar
 * - FR: Both 0 and 1 use singular (0 mot, 1 mot)
 * - RU/UK/PL: Complex Slavic rules with one/few/many categories
 * - DE: "Zeichen" (character) is invariant in singular/plural
 */
const translations: Record<string, Translations> = {
  'en': {
    word: { one: 'word', other: 'words' },
    character: { one: 'character', other: 'characters' },
    tooltip: 'Word and character count (selection or document)'
  },
  'es': {
    word: { one: 'palabra', other: 'palabras' },
    character: { one: 'carácter', other: 'caracteres' },
    tooltip: 'Conteo de palabras y caracteres (selección o documento)'
  },
  'pt': {
    word: { one: 'palavra', other: 'palavras' },
    character: { one: 'caractere', other: 'caracteres' },
    tooltip: 'Contagem de palavras e caracteres (seleção ou documento)'
  },
  'pt-br': {
    word: { one: 'palavra', other: 'palavras' },
    character: { one: 'caractere', other: 'caracteres' },
    tooltip: 'Contagem de palavras e caracteres (seleção ou documento)'
  },
  'fr': {
    word: { one: 'mot', other: 'mots' },
    character: { one: 'caractère', other: 'caractères' },
    tooltip: 'Nombre de mots et de caractères (sélection ou document)'
  },
  'de': {
    word: { one: 'Wort', other: 'Wörter' },
    character: { one: 'Zeichen', other: 'Zeichen' },
    tooltip: 'Wort- und Zeichenanzahl (Auswahl oder Dokument)'
  },
  'it': {
    word: { one: 'parola', other: 'parole' },
    character: { one: 'carattere', other: 'caratteri' },
    tooltip: 'Conteggio di parole e caratteri (selezione o documento)'
  },
  'nl': {
    word: { one: 'woord', other: 'woorden' },
    character: { one: 'teken', other: 'tekens' },
    tooltip: 'Aantal woorden en tekens (selectie of document)'
  },
  'pl': {
    word: { one: 'słowo', few: 'słowa', many: 'słów', other: 'słów' },
    character: { one: 'znak', few: 'znaki', many: 'znaków', other: 'znaków' },
    tooltip: 'Liczba słów i znaków (zaznaczenie lub dokument)'
  },
  'cs': {
    word: { one: 'slovo', few: 'slova', other: 'slov' },
    character: { one: 'znak', few: 'znaky', other: 'znaků' },
    tooltip: 'Počet slov a znaků (výběr nebo dokument)'
  },
  'tr': {
    word: { one: 'kelime', other: 'kelimeler' },
    character: { one: 'karakter', other: 'karakterler' },
    tooltip: 'Kelime ve karakter sayısı (seçim veya belge)'
  },
  'ru': {
    word: { one: 'слово', few: 'слова', many: 'слов', other: 'слов' },
    character: { one: 'символ', few: 'символа', many: 'символов', other: 'символов' },
    tooltip: 'Количество слов и символов (выделение или документ)'
  },
  'uk': {
    word: { one: 'слово', few: 'слова', many: 'слів', other: 'слів' },
    character: { one: 'символ', few: 'символи', many: 'символів', other: 'символів' },
    tooltip: 'Кількість слів і символів (виділення або документ)'
  },
  'bg': {
    word: { one: 'дума', other: 'думи' },
    character: { one: 'знак', other: 'знаци' },
    tooltip: 'Брой думи и знаци (избор или документ)'
  },
  'el': {
    word: { one: 'λέξη', other: 'λέξεις' },
    character: { one: 'χαρακτήρας', other: 'χαρακτήρες' },
    tooltip: 'Αριθμός λέξεων και χαρακτήρων (επιλογή ή έγγραφο)'
  }
};

/**
 * Get the current language code from VS Code settings
 * 
 * @param langOverride - Optional language override for testing
 * @returns Lowercase language code
 */
function getLanguage(langOverride?: string): string {
  if (langOverride) {
    return langOverride.toLowerCase();
  }
  return vscode.env.language.toLowerCase();
}

/**
 * Translate a key with optional pluralization
 * 
 * This function implements CLDR-compliant pluralization by:
 * 1. Determining the appropriate plural category for the number
 * 2. Selecting the correct translation form for that category
 * 3. Falling back to 'other' if specific category not available
 * 
 * @param key - Translation key (e.g., 'word', 'character', 'tooltip')
 * @param count - Optional count for pluralization
 * @param langOverride - Optional language override for testing
 * @returns Translated string
 * 
 * @example
 * t('word', 1, 'en')    // 'word'
 * t('word', 2, 'en')    // 'words'
 * t('word', 2, 'ru')    // 'слова' (few form)
 * t('word', 5, 'ru')    // 'слов' (many form)
 * t('tooltip')          // 'Word and character count...' (no pluralization)
 */
export function t(key: string, count?: number, langOverride?: string): string {
  const lang = getLanguage(langOverride);
  const dict = translations[lang] || translations['en'];
  const value = dict[key];

  // If no count provided, return simple string
  if (count === undefined) {
    return typeof value === 'string' ? value : key;
  }

  // If value is a string, just return it
  if (typeof value === 'string') {
    return value;
  }

  // Get plural category and return appropriate form
  const category = getPluralCategory(lang, count);
  const translationSet = value as TranslationSet;
  
  // Try to get the specific category, fall back to 'other', then 'one'
  if (category === 'two' && translationSet.two) {
    return translationSet.two;
  }
  if (category === 'few' && translationSet.few) {
    return translationSet.few;
  }
  if (category === 'many' && translationSet.many) {
    return translationSet.many;
  }
  if (category === 'one') {
    return translationSet.one;
  }
  return translationSet.other;
}
