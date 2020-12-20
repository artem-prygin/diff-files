import fs from 'fs';
import path from 'path';
import { makeAbsolutePath } from './src/helpers.js';
import parse from './src/parsers.js';
import compare from './src/compare.js';

export default (filepath1, filepath2, format = 'stylish') => {
  const data1 = fs.readFileSync(makeAbsolutePath(filepath1), 'utf-8');
  const data2 = fs.readFileSync(makeAbsolutePath(filepath2), 'utf-8');

  const parsedData1 = parse(data1, path.extname(filepath1));
  const parsedData2 = parse(data2, path.extname(filepath2));

  return compare(parsedData1, parsedData2, format);
};
