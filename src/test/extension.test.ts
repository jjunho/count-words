import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});
});

import { t } from '../i18n';

suite('i18n translations', () => {
  const cases = [
    // [lang, 1word, nwords, 1char, nchars, tooltip]
    ['en', 'word', 'words', 'character', 'characters', 'Word and character count (selection or document)'],
  ['es', 'palabra', 'palabras', 'carácter', 'caracteres', 'Conteo de palabras y caracteres (selección o documento)'],
    ['pt', 'palavra', 'palavras', 'caractere', 'caracteres', 'Contagem de palavras e caracteres (seleção ou documento)'],
    ['pt-br', 'palavra', 'palavras', 'caractere', 'caracteres', 'Contagem de palavras e caracteres (seleção ou documento)'],
    ['fr', 'mot', 'mots', 'caractère', 'caractères', 'Nombre de mots et de caractères (sélection ou document)'],
    ['de', 'Wort', 'Wörter', 'Zeichen', 'Zeichen', 'Wort- und Zeichenanzahl (Auswahl oder Dokument)'],
    ['it', 'parola', 'parole', 'carattere', 'caratteri', 'Conteggio di parole e caratteri (selezione o documento)'],
    ['nl', 'woord', 'woorden', 'teken', 'tekens', 'Aantal woorden en tekens (selectie of document)'],
    ['pl', 'słowo', 'słowa', 'znak', 'znaki', 'Liczba słów i znaków (zaznaczenie lub dokument)'],
    ['cs', 'slovo', 'slova', 'znak', 'znaky', 'Počet slov a znaků (výběr nebo dokument)'],
    ['tr', 'kelime', 'kelimeler', 'karakter', 'karakterler', 'Kelime ve karakter sayısı (seçim veya belge)'],
    ['ru', 'слово', 'слова', 'символ', 'символы', 'Количество слов и символов (выделение или документ)'],
    ['uk', 'слово', 'слова', 'символ', 'символи', 'Кількість слів і символів (виділення або документ)'],
    ['bg', 'дума', 'думи', 'знак', 'знаци', 'Брой думи и знаци (избор или документ)'],
    ['el', 'λέξη', 'λέξεις', 'χαρακτήρας', 'χαρακτήρες', 'Αριθμός λέξεων και χαρακτήρων (επιλογή ή έγγραφο)'],
  ];

  cases.forEach(([lang, word, words, char, chars, tooltip]) => {
    test(`should translate correctly for ${lang}`, () => {
      assert.strictEqual(t('word', 1, lang as string), word);
      assert.strictEqual(t('words', 2, lang as string), words);
      assert.strictEqual(t('character', 1, lang as string), char);
      assert.strictEqual(t('characters', 2, lang as string), chars);
      assert.strictEqual(t('tooltip', undefined, lang as string), tooltip);
    });
  });

  test('should fallback to English for unknown language', () => {
    const lang = 'xx';
    assert.strictEqual(t('word', 1, lang), 'word');
    assert.strictEqual(t('words', 2, lang), 'words');
    assert.strictEqual(t('character', 1, lang), 'character');
    assert.strictEqual(t('characters', 2, lang), 'characters');
    assert.strictEqual(t('tooltip', undefined, lang), 'Word and character count (selection or document)');
  });
});
