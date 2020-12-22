import _ from 'lodash';
import { sortArray } from './helpers.js';

const generateDiffTree = (data1, data2) => {
  const uniqueKeys = _.union(_.keys(data1), _.keys(data2));
  const sortedKeys = sortArray(uniqueKeys);

  return sortedKeys.flatMap((key) => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { key, value: generateDiffTree(data1[key], data2[key]), status: 'hasChildren' };
    }

    if (data1[key] === data2[key]) {
      return { key, value: data1[key], status: 'unchanged' };
    }

    if (_.has(data1, key) && _.has(data2, key)) {
      return {
        key,
        value: data2[key],
        oldValue: data1[key],
        status: 'updated',
      };
    }

    if (!_.has(data2, key)) {
      return { key, value: data1[key], status: 'removed' };
    }
    return { key, value: data2[key], status: 'added' };
  });
};

export default generateDiffTree;
