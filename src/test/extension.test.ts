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
    // Test cases: [lang, 0word, 1word, 2words, 5words, 21words, 0char, 1char, 2chars, 5chars, tooltip]
  const cases: Array<[string, string, string, string, string, string, string, string, string, string, string]> = [
    // English - simple singular/plural
    ['en', 'words', 'word', 'words', 'words', 'words', 'characters', 'character', 'characters', 'characters', 'Word and character count (selection or document)'],
    
    // Spanish - simple singular/plural
    ['es', 'palabras', 'palabra', 'palabras', 'palabras', 'palabras', 'caracteres', 'carácter', 'caracteres', 'caracteres', 'Conteo de palabras y caracteres (selección o documento)'],
    
    // Portuguese (PT) - zero is plural
    ['pt', 'palavras', 'palavra', 'palavras', 'palavras', 'palavras', 'caracteres', 'caractere', 'caracteres', 'caracteres', 'Contagem de palavras e caracteres (seleção ou documento)'],
    
    // Portuguese (BR) - zero is singular (normative preference)
    ['pt-br', 'palavra', 'palavra', 'palavras', 'palavras', 'palavras', 'caractere', 'caractere', 'caracteres', 'caracteres', 'Contagem de palavras e caracteres (seleção ou documento)'],
    
    // French - 0 and 1 are singular
    ['fr', 'mot', 'mot', 'mots', 'mots', 'mots', 'caractère', 'caractère', 'caractères', 'caractères', 'Nombre de mots et de caractères (sélection ou document)'],
    
    // German - simple singular/plural (Zeichen is same in both)
    ['de', 'Wörter', 'Wort', 'Wörter', 'Wörter', 'Wörter', 'Zeichen', 'Zeichen', 'Zeichen', 'Zeichen', 'Wort- und Zeichenanzahl (Auswahl oder Dokument)'],
    
    // Italian - simple singular/plural
    ['it', 'parole', 'parola', 'parole', 'parole', 'parole', 'caratteri', 'carattere', 'caratteri', 'caratteri', 'Conteggio di parole e caratteri (selezione o documento)'],
    
    // Dutch - simple singular/plural
    ['nl', 'woorden', 'woord', 'woorden', 'woorden', 'woorden', 'tekens', 'teken', 'tekens', 'tekens', 'Aantal woorden en tekens (selectie of document)'],
    
    // Polish - one/few/many (0→many, 1→one, 2-4→few, 5+→many, 21→many NOT one!)
    ['pl', 'słów', 'słowo', 'słowa', 'słów', 'słów', 'znaków', 'znak', 'znaki', 'znaków', 'Liczba słów i znaków (zaznaczenie lub dokument)'],
    
    // Czech - one/few/other (0→other, 1→one, 2-4→few, 5+→other, 21→other)
    ['cs', 'slov', 'slovo', 'slova', 'slov', 'slov', 'znaků', 'znak', 'znaky', 'znaků', 'Počet slov a znaků (výběr nebo dokument)'],
    
    // Turkish - simple singular/plural
    ['tr', 'kelimeler', 'kelime', 'kelimeler', 'kelimeler', 'kelimeler', 'karakterler', 'karakter', 'karakterler', 'karakterler', 'Kelime ve karakter sayısı (seçim veya belge)'],
    
    // Russian - one/few/many (0→many, 1→one, 2-4→few, 5+→many, 21→one, 22-24→few)
    ['ru', 'слов', 'слово', 'слова', 'слов', 'слово', 'символов', 'символ', 'символа', 'символов', 'Количество слов и символов (выделение или документ)'],
    
    // Ukrainian - one/few/many (similar to Russian)
    ['uk', 'слів', 'слово', 'слова', 'слів', 'слово', 'символів', 'символ', 'символи', 'символів', 'Кількість слів і символів (виділення або документ)'],
    
    // Bulgarian - simple singular/plural
    ['bg', 'думи', 'дума', 'думи', 'думи', 'думи', 'знаци', 'знак', 'знаци', 'знаци', 'Брой думи и знаци (избор или документ)'],
    
    // Greek - simple singular/plural
    ['el', 'λέξεις', 'λέξη', 'λέξεις', 'λέξεις', 'λέξεις', 'χαρακτήρες', 'χαρακτήρας', 'χαρακτήρες', 'χαρακτήρες', 'Αριθμός λέξεων και χαρακτήρων (επιλογή ή έγγραφο)'],
  ];

  cases.forEach(([lang, word0, word1, word2, word5, word21, char0, char1, char2, char5, tooltip]) => {
    test(`should translate correctly for ${lang}`, () => {
      assert.strictEqual(t('word', 0, lang), word0, `${lang}: 0 words`);
      assert.strictEqual(t('word', 1, lang), word1, `${lang}: 1 word`);
      assert.strictEqual(t('word', 2, lang), word2, `${lang}: 2 words`);
      assert.strictEqual(t('word', 5, lang), word5, `${lang}: 5 words`);
      assert.strictEqual(t('word', 21, lang), word21, `${lang}: 21 words`);
      assert.strictEqual(t('character', 0, lang), char0, `${lang}: 0 characters`);
      assert.strictEqual(t('character', 1, lang), char1, `${lang}: 1 character`);
      assert.strictEqual(t('character', 2, lang), char2, `${lang}: 2 characters`);
      assert.strictEqual(t('character', 5, lang), char5, `${lang}: 5 characters`);
      assert.strictEqual(t('tooltip', undefined, lang), tooltip, `${lang}: tooltip`);
    });
  });

  test('should fallback to English for unknown language', () => {
    const lang = 'xx';
    assert.strictEqual(t('word', 0, lang), 'words');
    assert.strictEqual(t('word', 1, lang), 'word');
    assert.strictEqual(t('word', 2, lang), 'words');
    assert.strictEqual(t('character', 1, lang), 'character');
    assert.strictEqual(t('character', 2, lang), 'characters');
    assert.strictEqual(t('tooltip', undefined, lang), 'Word and character count (selection or document)');
  });
});
