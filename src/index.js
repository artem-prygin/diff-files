import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import formatDiffTree from './formatters/index.js';
import generateDiffTree from './diffTree.js';

const makeAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);
const extnameToFormat = (filepath) => path.extname(filepath).slice(1);
const getFileData = (filepath) => fs.readFileSync(makeAbsolutePath(filepath), 'utf-8');
const generateParsedData = (filepath) => parse(getFileData(filepath), extnameToFormat(filepath));

export default (filepath1, filepath2, format = 'stylish') => {
  const diffTree = generateDiffTree(generateParsedData(filepath1), generateParsedData(filepath2));
  return formatDiffTree(diffTree, format);
};
