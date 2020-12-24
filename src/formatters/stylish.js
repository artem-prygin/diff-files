import _ from 'lodash';

const repeatSpaces = (depth) => ' '.repeat(depth * 4);
const repeatSpacesForChanged = (depth) => repeatSpaces(depth).slice(2);
const valueToString = (data, depth) => {
  if (!_.isPlainObject(data)) {
    return data;
  }
  const dataEntries = Object.entries(data)
    .map(([key, value]) => `${repeatSpaces(depth + 1)}${key}: ${valueToString(value, depth + 1)}`)
    .join('\n');
  return `{\n${dataEntries}\n${repeatSpaces(depth)}}`;
};
const generateString = (key, value, symbol, depth) => `${repeatSpacesForChanged(depth)}${symbol} ${key}: ${valueToString(value, depth)}`;

const outputData = {
  hasChildren: ({ key, children }, depth, func) => `${repeatSpaces(depth)}${key}: ${func(children, depth + 1)}`,
  removed: ({ key, value }, depth) => generateString(key, value, '-', depth),
  added: ({ key, value }, depth) => generateString(key, value, '+', depth),
  unchanged: ({ key, value }, depth) => `${repeatSpaces(depth)}${key}: ${valueToString(value, depth)}`,
  updated: ({ key, newValue, oldValue }, depth) => `${generateString(key, oldValue, '-', depth)}\n${generateString(key, newValue, '+', depth)}`,
};

const generateStylishOutput = (diffTree) => {
  const generateInnerOutput = (innerDiffTree, depth) => {
    const stylishTree = innerDiffTree
      .map((el) => outputData[el.type](el, depth, generateInnerOutput))
      .join('\n');
    return `{\n${stylishTree}\n${depth === 1 ? '' : repeatSpaces(depth - 1)}}`;
  };

  return generateInnerOutput(diffTree, 1);
};

export default generateStylishOutput;
