import generateDiffTree from '../generateDiffTree.js';
import stylish from './stylish.js';
import plain from './plain.js';

const formatTypes = { stylish, plain };
export default (data1, data2, format = 'stylish') => formatTypes[format](generateDiffTree(data1, data2));
