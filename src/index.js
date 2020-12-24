import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import formatData from './formatters/index.js';
import generateDiffTree from './diffTree.js';

const makeAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);

export default (filepath1, filepath2, format = 'stylish') => {
  const data1 = fs.readFileSync(makeAbsolutePath(filepath1), 'utf-8');
  const data2 = fs.readFileSync(makeAbsolutePath(filepath2), 'utf-8');
  const parsedData1 = parse(data1, path.extname(filepath1).slice(1));
  const parsedData2 = parse(data2, path.extname(filepath2).slice(1));

  const diffTree = generateDiffTree(parsedData1, parsedData2);
  return formatData(diffTree, format);
};
