import path from 'path';
import fs from 'fs';

export const isObject = (value) => value !== undefined && typeof value === 'object' && value !== null;
export const repeatSpaces = (depth) => ' '.repeat(depth * 4);
export const repeatSpacesForChanged = (depth) => repeatSpaces(depth).slice(2);
export const makeAbsolutePath = (filepath) => {
  const file = path.resolve(process.cwd(), filepath);
  if (fs.existsSync(file)) {
    return file;
  }
  throw new Error(`Sorry, ${file} doesn't exist`);
};
