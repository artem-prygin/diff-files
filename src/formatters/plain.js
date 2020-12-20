import { isObject } from '../helpers.js';

const joinKeys = (parentKeys, key) => {
  if (parentKeys.length === 0) {
    return key;
  }
  return `${parentKeys.join('.')}.${key}`;
};

const valueToString = (value) => {
  if (isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const outputData = {
  added: ({ key, value }, parentKeys) => `Property '${joinKeys(parentKeys, key)}' was added with value: ${valueToString(value)}`,
  removed: ({ key }, parentKeys) => `Property '${joinKeys(parentKeys, key)}' was removed`,
  updated: ({ key, value, oldValue }, parentKeys) => `Property '${joinKeys(parentKeys, key)}' was updated. From ${valueToString(oldValue)} to ${valueToString(value)}`,
};

const plain = (diffTree, parentKeys = []) => {
  const plainTree = diffTree
    .flatMap((el) => {
      if (el.status === 'hasChildren') {
        return plain(el.value, [...parentKeys, el.key]);
      }
      if (Object.keys(outputData).includes(el.status)) {
        return outputData[el.status](el, parentKeys);
      }
      return [];
    })
    .join('\n');

  return plainTree;
};

export default plain;
