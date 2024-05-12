import * as furtherStudy from '../further-study.js';

describe('further-study.js', () => {
  describe('buildWordChain', () => {
    test('should return an array of words in the correct order', async () => {
      expect(furtherStudy.buildWordChain(['noon', 'naan', 'nun'])).toEqual(['noon', 'naan', 'nun']);
      expect(furtherStudy.buildWordChain(['zoo', 'sour', 'racket', 'octos'])).toEqual([
        'zoo',
        'octos',
        'sour',
        'racket',
      ]);
      expect(furtherStudy.buildWordChain(['cute', 'antsy', 'etcetera', 'karat', 'yak'])).toEqual([
        'cute',
        'etcetera',
        'antsy',
        'yak',
        'karat',
      ]);
    });

    test('should stop when it runs out of valid words', async () => {
      expect(furtherStudy.buildWordChain(['a', 'b', 'c'])).toEqual(['a']);
    });

    test('should return an empty array if no words are given', async () => {
      expect(furtherStudy.buildWordChain([])).toEqual([]);
    });
  });
});
