import { isObject } from './helpers.js';

const generateDiffTree = (data1, data2) => {
  const uniqueKeys = Object.keys(data1)
    .concat(Object.keys(data2))
    .filter((el, index, arr) => arr.indexOf(el) === index)
    .sort();

  return uniqueKeys.flatMap((key) => {
    switch (true) {
      case isObject(data1[key]) && isObject(data2[key]):
        return { key, value: generateDiffTree(data1[key], data2[key]), status: 'hasChildren' };
      case data1[key] !== undefined && data2[key] !== undefined:
        return data1[key] === data2[key]
          ? { key, value: data1[key], status: 'unchanged' }
          : {
            key,
            value: data2[key],
            oldValue: data1[key],
            status: 'updated',
          };
      case data2[key] === undefined:
        return { key, value: data1[key], status: 'removed' };
      default:
        return { key, value: data2[key], status: 'added' };
    }
  });
};

export default generateDiffTree;
