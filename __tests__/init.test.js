import dummy from '../dummy.js';
import dummy2 from '../dummy2.js';

test('dummy', () => {
  expect(dummy(1)).toBe(2);
  expect(dummy2(1)).toBe(2);
});
