import gendiff from '../index.js';

const fileJson1 = new URL('./__fixtures__/fileJson1.json', import.meta.url).pathname;
const fileJson2 = new URL('./__fixtures__/fileJson2.json', import.meta.url).pathname;

const fileYml1 = new URL('./__fixtures__/fileYml1.yml', import.meta.url).pathname;
const fileYml2 = new URL('./__fixtures__/fileYml2.yml', import.meta.url).pathname;

const fileTxt = new URL('./__fixtures__/foo.txt', import.meta.url).pathname;
const fakeFile = new URL('./__fixtures__/fake.txt', import.meta.url).pathname;

const expectedResult = `{
  - follow: true
  + follow: false
    host: hexlet.io
  + new: 1
  - timeout: 50
}`;

describe('gendiff', () => {
  test('json files', () => {
    expect(gendiff(fileJson1, fileJson2)).toBe(expectedResult);
  });
  test('json and yaml files', () => {
    expect(gendiff(fileJson1, fileYml2)).toBe(expectedResult);
  });
  test('yaml files', () => {
    expect(gendiff(fileYml1, fileYml2)).toBe(expectedResult);
  });
  test('has unsupported extension', () => {
    expect(() => {
      gendiff(fileYml1, fileTxt);
    }).toThrowError();
  });
  test('file doesn\'t exist', () => {
    expect(() => {
      gendiff(fileYml1, fakeFile);
    }).toThrowError();
  });
});
