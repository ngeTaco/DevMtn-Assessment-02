import { expect } from '@jest/globals';
import path from 'node:path';
import url from 'node:url';
import * as objects from '../objects.js';
import { createParseTree } from './testutils.js';

const dirname = url.fileURLToPath(new URL('.', import.meta.url));
const { matchers } = createParseTree(path.join(dirname, '../objects.js'));

expect.extend(matchers);

describe('objects.js', () => {
  const people = [
    { firstName: 'Gale', lastName: 'Dekarios', location: 'Waterdeep' },
    { firstName: 'Wyll', lastName: 'Ravengard', location: "Baldur's Gate" },
    { firstName: 'Karlach', lastName: 'Cliffgate', location: 'Avernus' },
    { firstName: 'Astarion', lastName: 'Ancunin', location: "Baldur's Gate" },
    { firstName: 'Jenevelle', lastName: 'Hallowleaf', location: "Baldur's Gate" },
    { firstName: 'Minthara', lastName: 'Baenre', location: 'Menzoberranzan' },
  ];

  describe('getNames', () => {
    test('should return an array of names', async () => {
      expect(objects.getNames(people)).toEqual([
        'Gale Dekarios',
        'Wyll Ravengard',
        'Karlach Cliffgate',
        'Astarion Ancunin',
        'Jenevelle Hallowleaf',
        'Minthara Baenre',
      ]);
    });
  });

  describe('getNameUsingDestructuring', () => {
    test('should use object destructuring to get the firstName and lastName', async () => {
      expect('firstName').toBePartOfObjectDestructuring();
      expect('lastName').toBePartOfObjectDestructuring();
    });

    test("should return a person's full name based on their firstName and lastName", async () => {
      expect(objects.getNameUsingDestructuring(people[0])).toEqual('Gale Dekarios');
      expect(objects.getNameUsingDestructuring(people[4])).toEqual('Jenevelle Hallowleaf');
    });
  });

  describe('getPeopleByLocation', () => {
    test('should return an array of people in the given location', async () => {
      expect(objects.getPeopleByLocation(people, "Baldur's Gate")).toEqual([
        { firstName: 'Wyll', lastName: 'Ravengard', location: "Baldur's Gate" },
        { firstName: 'Astarion', lastName: 'Ancunin', location: "Baldur's Gate" },
        { firstName: 'Jenevelle', lastName: 'Hallowleaf', location: "Baldur's Gate" },
      ]);
    });
  });

  describe('translateToPirateTalk', () => {
    test('should translate a phrase to pirate talk', async () => {
      expect(objects.translateToPirateTalk('hello world')).toEqual('ahoy world');
      expect(objects.translateToPirateTalk('excuse me sir where is the restroom')).toEqual(
        'avast me matey where be the head',
      );
    });
  });

  describe('wordCount', () => {
    test('should return the number of occurrences for each word in a phrase', async () => {
      expect(objects.wordCount('hello world')).toEqual({ hello: 1, world: 1 });
      expect(objects.wordCount('hello hello hello world')).toEqual({ hello: 3, world: 1 });
      expect(objects.wordCount('a b c a b a')).toEqual({ a: 3, b: 2, c: 1 });
    });
  });

  const bugs = [
    {
      name: 'common butterfly',
      availability: {
        rarity: 'common',
        months: [9, 10, 11, 12, 1, 2, 3, 4, 5, 6],
      },
    },
    {
      name: 'yellow butterfly',
      availability: {
        rarity: 'common',
        months: [3, 4, 5, 6, 9, 10],
      },
    },
    {
      name: 'long locust',
      availability: {
        rarity: 'common',
        months: [4, 5, 6, 7, 8, 9, 10, 11],
      },
    },
  ];

  describe('isBugAvailable', () => {
    test('should return true if the bug is available in the given month', async () => {
      expect(objects.isBugAvailable(bugs[0], 1)).toBe(true);
      expect(objects.isBugAvailable(bugs[0], 7)).toBe(false);
    });
  });

  describe('buildBugHuntCalendar', () => {
    test('should return an object of months and names of bugs available during that month', async () => {
      expect(objects.buildBugHuntCalendar(bugs)).toEqual({
        1: ['common butterfly'],
        2: ['common butterfly'],
        3: ['common butterfly', 'yellow butterfly'],
        4: ['common butterfly', 'yellow butterfly', 'long locust'],
        5: ['common butterfly', 'yellow butterfly', 'long locust'],
        6: ['common butterfly', 'yellow butterfly', 'long locust'],
        7: ['long locust'],
        8: ['long locust'],
        9: ['common butterfly', 'yellow butterfly', 'long locust'],
        10: ['common butterfly', 'yellow butterfly', 'long locust'],
        11: ['common butterfly', 'long locust'],
        12: ['common butterfly'],
      });
    });
  });
});
