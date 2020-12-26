import _ from 'lodash';

const repeatSpaces = (depth) => ' '.repeat(depth * 4);
const repeatSpacesForChanged = (depth) => repeatSpaces(depth).slice(2);
const stringify = (data, depth) => {
  if (!_.isPlainObject(data)) {
    return data;
  }
  const dataEntries = Object.entries(data)
    // eslint-disable-next-line no-use-before-define
    .map(([key, value]) => outputMapping.unchanged({ key, value }, depth + 1))
    .join('\n');
  return `{\n${dataEntries}\n${repeatSpaces(depth)}}`;
};

const outputMapping = {
  nested: ({ key, children }, depth, func) => `${repeatSpaces(depth)}${key}: ${func(children, depth + 1)}`,
  removed: ({ key, value }, depth) => `${repeatSpacesForChanged(depth)}- ${key}: ${stringify(value, depth)}`,
  added: ({ key, value }, depth) => `${repeatSpacesForChanged(depth)}+ ${key}: ${stringify(value, depth)}`,
  unchanged: ({ key, value }, depth) => `${repeatSpaces(depth)}${key}: ${stringify(value, depth)}`,
  updated: ({ key, newValue, oldValue }, depth) => {
    const oldValueInfo = `${repeatSpacesForChanged(depth)}- ${key}: ${stringify(oldValue, depth)}`;
    const newValueInfo = `${repeatSpacesForChanged(depth)}+ ${key}: ${stringify(newValue, depth)}`;
    return `${oldValueInfo}\n${newValueInfo}`;
  },
};

const generateStylish = (diffTree) => {
  const iter = (innerDiffTree, depth) => {
    const stylishTree = innerDiffTree
      .map((el) => outputMapping[el.type](el, depth, iter))
      .join('\n');
    return `{\n${stylishTree}\n${depth === 1 ? '' : repeatSpaces(depth - 1)}}`;
  };

  return iter(diffTree, 1);
};

export default generateStylish;
