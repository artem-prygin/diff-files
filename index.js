import fs from 'fs';
import path from 'path';

const makeAbsolutePath = (filepath) => path.resolve(process.cwd(), filepath);

export default (filepath1, filepath2) => {
  const data1 = fs.readFileSync(makeAbsolutePath(filepath1), 'utf-8');
  const data2 = fs.readFileSync(makeAbsolutePath(filepath2), 'utf-8');

  const parsedData1 = JSON.parse(data1);
  const parsedData2 = JSON.parse(data2);

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
        ? `  ${el}: ${parsedData1[el]}`
        : `- ${el}: ${parsedData1[el]}\n+ ${el}: ${parsedData2[el]}`;
    }
    if (value1 !== undefined) {
      return `- ${el}: ${parsedData1[el]}`;
    }
    return `+ ${el}: ${parsedData2[el]}`;
  }).join('\n');

  return `{\n${result}\n}`;
};
