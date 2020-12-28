import _ from 'lodash';

const SPACES_COUNT = 4;
const repeatSpaces = (depth, sliceNum = 0) => ' '.repeat(depth * SPACES_COUNT).slice(sliceNum);
const stringify = (data, depth, mapping) => {
  if (!_.isPlainObject(data)) {
    return data;
  }
  const dataEntries = Object.entries(data)
    .map(([key, value]) => mapping.unchanged({ key, value }, depth + 1))
    .join('\n');
  return `{\n${dataEntries}\n${repeatSpaces(depth)}}`;
};

const mapping = {
  nested: ({ key, children }, depth, func) => `${repeatSpaces(depth)}${key}: ${func(children, depth + 1)}`,
  removed: ({ key, value }, depth) => `${repeatSpaces(depth, 2)}- ${key}: ${stringify(value, depth, mapping)}`,
  added: ({ key, value }, depth) => `${repeatSpaces(depth, 2)}+ ${key}: ${stringify(value, depth, mapping)}`,
  unchanged: ({ key, value }, depth) => `${repeatSpaces(depth)}${key}: ${stringify(value, depth, mapping)}`,
  updated: ({ key, newValue, oldValue }, depth) => {
    const oldValueInfo = `${repeatSpaces(depth, 2)}- ${key}: ${stringify(oldValue, depth, mapping)}`;
    const newValueInfo = `${repeatSpaces(depth, 2)}+ ${key}: ${stringify(newValue, depth, mapping)}`;
    return `${oldValueInfo}\n${newValueInfo}`;
  },
};

const generateStylish = (diffTree) => {
  const iter = (innerDiffTree, depth) => {
    const stylishTree = innerDiffTree
      .map((el) => mapping[el.type](el, depth, iter))
      .join('\n');
    return `{\n${stylishTree}\n${depth === 1 ? '' : `${repeatSpaces(depth - 1)}`}}`;
  };

  return iter(diffTree, 1);
};

export default generateStylish;
