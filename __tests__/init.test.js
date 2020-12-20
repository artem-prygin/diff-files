import fs from 'fs';
import gendiff from '../index.js';

const fileJson1 = new URL('./__fixtures__/file1.json', import.meta.url).pathname;
const fileYml2 = new URL('./__fixtures__/file2.yml', import.meta.url).pathname;
const fileTxt = new URL('./__fixtures__/foo.txt', import.meta.url).pathname;
const fakeFile = new URL('./__fixtures__/fake.txt', import.meta.url).pathname;

const expectedStylish = new URL('./__fixtures__/expectedStylish.txt', import.meta.url).pathname;

describe('gendiff', () => {
  test('stylish format', () => {
    expect(gendiff(fileJson1, fileYml2)).toBe(fs.readFileSync(expectedStylish, 'utf-8'));
  });
  test('has unsupported extension', () => {
    expect(() => {
      gendiff(fileJson1, fileTxt);
    }).toThrowError();
  });
  test('file doesn\'t exist', () => {
    expect(() => {
      gendiff(fileYml2, fakeFile);
    }).toThrowError();
  });
});
