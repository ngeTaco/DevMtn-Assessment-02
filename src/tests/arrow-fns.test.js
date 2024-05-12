import { expect } from '@jest/globals';
import path from 'node:path';
import url from 'node:url';
import * as arrowFns from '../arrow-fns.js';
import { createParseTree } from './testutils.js';

const dirname = url.fileURLToPath(new URL('.', import.meta.url));
const { matchers } = createParseTree(path.join(dirname, '../arrow-fns.js'));

expect.extend(matchers);

describe('arrow-fns.js', () => {
  describe('giveMeTwo', () => {
    test('should be an arrow function', async () => {
      expect('giveMeTwo').toBeAnArrowFunction();
    });

    test('should return 2', async () => {
      expect(arrowFns.giveMeTwo()).toBe(2);
    });
  });

  describe('addNums', () => {
    test('should be an arrow function', async () => {
      expect('addNums').toBeAnArrowFunction();
    });

    test('should return the sum of two numbers', async () => {
      expect(arrowFns.addNums(1, 2)).toBe(3);
    });
  });

  describe('max', () => {
    test('should be an arrow function', async () => {
      expect('max').toBeAnArrowFunction();
    });

    test('should return the largest of two numbers', async () => {
      expect(arrowFns.max(1, 100)).toBe(100);
    });
  });

  describe('evens', () => {
    test('should return an array of even numbers', async () => {
      expect(arrowFns.evens([1, 2, 3, 4, 5])).toEqual([2, 4]);
    });
  });

  describe('createGreetings', () => {
    test('should return an array of greetings', async () => {
      expect(arrowFns.createGreetings(['Clive', 'Jill', 'Torgal'])).toEqual([
        'Hello, Clive!',
        'Hello, Jill!',
        'Hello, Torgal!',
      ]);
    });
  });

  describe('loudLongWords', () => {
    test('should return an array of uppercased words longer than 4 characters', async () => {
      expect(arrowFns.loudLongWords(['apple', 'pear', 'cake', 'pinata'])).toEqual([
        'APPLE',
        'PINATA',
      ]);
    });
  });
});
