import _ from 'lodash';

const generateDiffTree = (data1, data2) => {
  const uniqueKeys = _.union(_.keys(data1), _.keys(data2));
  const sortedKeys = _.sortBy(uniqueKeys);

  return sortedKeys.flatMap((key) => {
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { key, children: generateDiffTree(data1[key], data2[key]), type: 'nested' };
    }

    if (_.isEqual(data1[key], data2[key])) {
      return { key, value: data1[key], type: 'unchanged' };
    }

    if (_.has(data1, key) && _.has(data2, key)) {
      return {
        key,
        newValue: data2[key],
        oldValue: data1[key],
        type: 'updated',
      };
    }

    if (!_.has(data2, key)) {
      return { key, value: data1[key], type: 'removed' };
    }
    return { key, value: data2[key], type: 'added' };
  });
};

export default generateDiffTree;
