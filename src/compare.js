import generateDiffTree from './generateDiffTree.js';
import stylish from './formatters/stylish.js';

const formatTypes = { stylish };
export default (data1, data2, format = 'stylish') => formatTypes[format](generateDiffTree(data1, data2));
