import generateDiffTree from '../generateDiffTree.js';
import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const formatTypes = { stylish, plain, json };
export default (data1, data2, format = 'stylish') => {
  if (!Object.keys(formatTypes).includes(format)) {
    throw new Error('This format type is not supported');
  }
  return formatTypes[format](generateDiffTree(data1, data2));
};
