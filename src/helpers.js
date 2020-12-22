import path from 'path';

export const repeatSpaces = (depth) => ' '.repeat(depth * 4);
export const repeatSpacesForChanged = (depth) => repeatSpaces(depth).slice(2);
export const makeAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
export const sortArray = (arr) => arr.reduce((acc, el) => {
  if (el >= acc.slice(-1)[0]) {
    return [...acc, el];
  }
  if (acc[0] < el) {
    return sortArray([el, ...acc]);
  }
  return [el, ...acc];
}, []);
