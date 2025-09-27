import * as vscode from 'vscode';

const translations: Record<string, Record<string, string>> = {
  'en': {
    word: 'word',
    words: 'words',
    character: 'character',
    characters: 'characters',
    tooltip: 'Word and character count (selection or document)'
  },
  'pt-br': {
    word: 'palavra',
    words: 'palavras',
    character: 'caractere',
    characters: 'caracteres',
    tooltip: 'Contagem de palavras e caracteres (seleção ou documento)'
  }
};

function getLanguage(): string {
  return vscode.env.language.toLowerCase();
}

export function t(key: string, count?: number): string {
  const lang = getLanguage();
  const dict = translations[lang] || translations['en'];
  if (count !== undefined) {
    if (count === 1 && dict[key.slice(0, -1)]) {
      return dict[key.slice(0, -1)];
    }
    return dict[key] || key;
  }
  return dict[key] || key;
}
