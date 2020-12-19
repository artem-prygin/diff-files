import gendiff from '../index.js';

const file1 = new URL('./__fixtures__/file1.json', import.meta.url).pathname;
const file2 = new URL('./__fixtures__/file2.json', import.meta.url).pathname;

test('gendiff', () => {
  expect(gendiff(file1, file2)).toBe('{\n  host: hexlet.io\n- timeout: 50\n}');
});
