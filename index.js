import fs from 'fs';
import path from 'path';
import parse from './parsers.js';

const makeAbsolutePath = (filepath) => {
  const file = path.resolve(process.cwd(), filepath);
  if (fs.existsSync(file)) {
    return file;
  }
  throw new Error(`Sorry, ${file} doesn't exist`);
};

export default (filepath1, filepath2) => {
  const data1 = fs.readFileSync(makeAbsolutePath(filepath1), 'utf-8');
  const data2 = fs.readFileSync(makeAbsolutePath(filepath2), 'utf-8');

  const extension1 = path.extname(filepath1);
  const extension2 = path.extname(filepath2);

  const parsedData1 = parse(data1, extension1);
  const parsedData2 = parse(data2, extension2);

  const keys1 = Object.keys(parsedData1);
  const keys2 = Object.keys(parsedData2);
  const uniqueKeys = keys1.concat(keys2)
    .filter((el, index, arr) => arr.indexOf(el) === index)
    .sort();

  const result = uniqueKeys.map((el) => {
    const value1 = parsedData1[el];
    const value2 = parsedData2[el];
    if (value1 !== undefined && value2 !== undefined) {
      return value1 === value2
        ? `    ${el}: ${parsedData1[el]}`
        : `  - ${el}: ${parsedData1[el]}\n  + ${el}: ${parsedData2[el]}`;
    }
    if (value1 !== undefined) {
      return `  - ${el}: ${parsedData1[el]}`;
    }
    return `  + ${el}: ${parsedData2[el]}`;
  }).join('\n');

  return `{\n${result}\n}`;
};
