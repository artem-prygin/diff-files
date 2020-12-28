import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import formatDiffTree from './formatters/index.js';
import generateDiffTree from './diffTree.js';

const makeAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
const getFormat = (filepath) => path.extname(filepath).slice(1);
const getFileData = (filepath) => fs.readFileSync(makeAbsolutePath(filepath), 'utf-8');

export default (filepath1, filepath2, formatName = 'stylish') => {
  const parsedData1 = parse(getFileData(filepath1), getFormat(filepath1));
  const parsedData2 = parse(getFileData(filepath2), getFormat(filepath2));
  const diffTree = generateDiffTree(parsedData1, parsedData2);
  return formatDiffTree(diffTree, formatName);
};
