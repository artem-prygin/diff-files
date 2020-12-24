import _ from 'lodash';

const joinKeys = (parentKeys, key) => {
  if (parentKeys.length === 0) {
    return key;
  }
  return `${parentKeys.join('.')}.${key}`;
};

const valueToString = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const outputData = {
  hasChildren: ({ key, children }, parentKeys, func) => func(children, [...parentKeys, key]),
  unchanged: () => [],
  added: ({ key, value }, parentKeys) => `Property '${joinKeys(parentKeys, key)}' was added with value: ${valueToString(value)}`,
  removed: ({ key }, parentKeys) => `Property '${joinKeys(parentKeys, key)}' was removed`,
  updated: ({ key, newValue, oldValue }, parentKeys) => `Property '${joinKeys(parentKeys, key)}' was updated. From ${valueToString(oldValue)} to ${valueToString(newValue)}`,
};

const generatePlainOutput = (diffTree) => {
  const generateInnerOutput = (innerDiffTree, parentKeys) => innerDiffTree
    .flatMap((el) => outputData[el.type](el, parentKeys, generateInnerOutput))
    .join('\n');
  return generateInnerOutput(diffTree, []);
};

export default generatePlainOutput;
