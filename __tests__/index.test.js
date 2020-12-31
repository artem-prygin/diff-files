import fs from 'fs';
import gendiff from '../index.js';

const generatePathname = (path) => new URL(`../__fixtures__/${path}`, import.meta.url).pathname;
const testsSuccessOptions = [
  ['file1.json', 'file2.yml', 'default'],
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
  test.each(testsSuccessOptions)('gendiff for %s & %s in %s format',
    (file1, file2, formatName) => {
      if (formatName === 'default') {
        const fileContent = fs.readFileSync(generatePathname('expected_stylish.txt'), 'utf-8');
        expect(gendiff(generatePathname(file1), generatePathname(file2)))
          .toBe(fileContent);
        return;
      }
      if (formatName === 'json') {
        expect(() => {
          JSON.parse(gendiff(generatePathname(file1), generatePathname(file2), formatName));
        }).not.toThrowError();
      }

      const fileContent = fs.readFileSync(generatePathname(`expected_${formatName}.txt`), 'utf-8');
      expect(gendiff(generatePathname(file1), generatePathname(file2), formatName))
        .toBe(fileContent);
    });

  test.each(testsFailOptions)('gendiff for %s & %s in %s format',
    (file1, file2, formatName) => {
      expect(() => {
        gendiff(generatePathname(file1), generatePathname(file2), formatName);
      }).toThrowError();
    });
});
