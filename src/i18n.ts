import * as vscode from 'vscode';

const translations: Record<string, Record<string, string>> = {
  'en': {
    word: 'word',
    words: 'words',
    character: 'character',
    characters: 'characters',
    tooltip: 'Word and character count (selection or document)'
  },
  'es': {
    word: 'palabra',
    words: 'palabras',
    character: 'carácter',
    characters: 'caracteres',
    tooltip: 'Conteo de palabras y caracteres (selección o documento)'
  },
  'pt': {
    word: 'palavra',
    words: 'palavras',
    character: 'caractere',
    characters: 'caracteres',
    tooltip: 'Contagem de palavras e caracteres (seleção ou documento)'
  },
  'pt-br': {
    word: 'palavra',
    words: 'palavras',
    character: 'caractere',
    characters: 'caracteres',
    tooltip: 'Contagem de palavras e caracteres (seleção ou documento)'
  },
  'fr': {
    word: 'mot',
    words: 'mots',
    character: 'caractère',
    characters: 'caractères',
    tooltip: 'Nombre de mots et de caractères (sélection ou document)'
  },
  'de': {
    word: 'Wort',
    words: 'Wörter',
    character: 'Zeichen',
    characters: 'Zeichen',
    tooltip: 'Wort- und Zeichenanzahl (Auswahl oder Dokument)'
  },
  'it': {
    word: 'parola',
    words: 'parole',
    character: 'carattere',
    characters: 'caratteri',
    tooltip: 'Conteggio di parole e caratteri (selezione o documento)'
  },
  'nl': {
    word: 'woord',
    words: 'woorden',
    character: 'teken',
    characters: 'tekens',
    tooltip: 'Aantal woorden en tekens (selectie of document)'
  },
  'pl': {
    word: 'słowo',
    words: 'słowa',
    character: 'znak',
    characters: 'znaki',
    tooltip: 'Liczba słów i znaków (zaznaczenie lub dokument)'
  },
  'cs': {
    word: 'slovo',
    words: 'slova',
    character: 'znak',
    characters: 'znaky',
    tooltip: 'Počet slov a znaků (výběr nebo dokument)'
  },
  'tr': {
    word: 'kelime',
    words: 'kelimeler',
    character: 'karakter',
    characters: 'karakterler',
    tooltip: 'Kelime ve karakter sayısı (seçim veya belge)'
  },
  'ru': {
    word: 'слово',
    words: 'слова',
    character: 'символ',
    characters: 'символы',
    tooltip: 'Количество слов и символов (выделение или документ)'
  },
  'uk': {
    word: 'слово',
    words: 'слова',
    character: 'символ',
    characters: 'символи',
    tooltip: 'Кількість слів і символів (виділення або документ)'
  },
  'bg': {
    word: 'дума',
    words: 'думи',
    character: 'знак',
    characters: 'знаци',
    tooltip: 'Брой думи и знаци (избор или документ)'
  },
  'el': {
    word: 'λέξη',
    words: 'λέξεις',
    character: 'χαρακτήρας',
    characters: 'χαρακτήρες',
    tooltip: 'Αριθμός λέξεων και χαρακτήρων (επιλογή ή έγγραφο)'
  }
};

function getLanguage(langOverride?: string): string {
  if (langOverride) {
    return langOverride.toLowerCase();
  }
  return vscode.env.language.toLowerCase();
}

export function t(key: string, count?: number, langOverride?: string): string {
  const lang = getLanguage(langOverride);
  const dict = translations[lang] || translations['en'];
  if (count !== undefined) {
    if (count === 1 && dict[key.slice(0, -1)]) {
      return dict[key.slice(0, -1)];
    }
    return dict[key] || key;
  }
  return dict[key] || key;
}
