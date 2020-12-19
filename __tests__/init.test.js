import gendiff from '../index.js';

const file1 = new URL('./__fixtures__/file1.json', import.meta.url).pathname;
const file2 = new URL('./__fixtures__/file2.json', import.meta.url).pathname;
const expectedResult = `{
  - follow: true
  + follow: false
    host: hexlet.io
  + new: 1
  - timeout: 50
}`;

test('gendiff', () => {
  expect(gendiff(file1, file2)).toBe(expectedResult);
});
