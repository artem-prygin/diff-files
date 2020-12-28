import generateStylish from './stylish.js';
import generatePlain from './plain.js';

const formatFunctions = {
  stylish: generateStylish,
  plain: generatePlain,
  json: JSON.stringify,
};

export default (diffTree, format = 'stylish') => {
  const formatDiffTree = formatFunctions[format];
  if (!formatDiffTree) {
    throw new Error('This format type is not supported');
  }
  return formatDiffTree(diffTree);
};
