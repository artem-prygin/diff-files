import fs from 'fs';
import gendiff from '../index.js';

const generatePathname = (path) => new URL(`../__fixtures__/${path}`, import.meta.url).pathname;
const testsSuccessOptions = [
  ['file1.json', 'file2.yml', 'stylish'],
  ['file1.yml', 'file2.json', 'plain'],
  ['file1.yml', 'file2.json', 'json'],
];
const testsFailOptions = [
  ['file1.yml', 'file2.json', 'unsupported'],
  ['file1.yml', 'unsupportedFileType.txt', 'stylish'],
  ['file1.yml', 'notExistingFile.yml', 'plain'],
];

describe('gendiff', () => {
  test.each(testsSuccessOptions)('gendiff for %s & %s in %s format is equal to %s',
    (file1, file2, format) => {
      if (format === 'json') {
        expect(() => {
          JSON.parse(gendiff(generatePathname(file1), generatePathname(file2), format));
        }).not.toThrowError();
      }
      expect(gendiff(generatePathname(file1), generatePathname(file2), format))
        .toBe(fs.readFileSync(generatePathname(`expected_${format}`), 'utf-8'));
    });

  test.each(testsFailOptions)('gendiff for %s & %s in %s format throws error',
    (file1, file2, format) => {
      expect(() => {
        gendiff(generatePathname(file1), generatePathname(file2), format);
      }).toThrowError();
    });
});
