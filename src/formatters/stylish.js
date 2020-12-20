import { isObject, repeatSpaces, repeatSpacesForChanged } from '../helpers.js';

const valueToString = (data, depth) => {
  if (!isObject(data)) {
    return data;
  }
  const dataEntries = Object.entries(data)
    .map(([key, value]) => `${repeatSpaces(depth + 1)}${key}: ${valueToString(value, depth + 1)}`)
    .join('\n');
  return `{\n${dataEntries}\n${repeatSpaces(depth)}}`;
};

const generateString = (key, value, symbol, depth) => `${repeatSpacesForChanged(depth)}${symbol} ${key}: ${valueToString(value, depth)}`;

const outputOptions = {
  // eslint-disable-next-line no-use-before-define
  hasChildren: ({ key, value }, depth) => `${repeatSpaces(depth)}${key}: ${stylish(value, depth + 1)}`,
  removed: ({ key, value }, depth) => generateString(key, value, '-', depth),
  added: ({ key, value }, depth) => generateString(key, value, '+', depth),
  unchanged: ({ key, value }, depth) => `${repeatSpaces(depth)}${key}: ${valueToString(value, depth)}`,
  updated: ({ key, value, oldValue }, depth) => `${generateString(key, oldValue, '-', depth)}\n${generateString(key, value, '+', depth)}`,
};

const stylish = (diffTree, depth = 1) => {
  const stylishTree = diffTree
    .map((el) => outputOptions[el.status](el, depth))
    .join('\n');
  return `{\n${stylishTree}\n${depth === 1 ? '' : repeatSpaces(depth - 1)}}`;
};

export default stylish;
