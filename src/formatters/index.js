import generateStylishOutput from './stylish.js';
import generatePlainOutput from './plain.js';

const formatFunctions = {
  stylish: generateStylishOutput,
  plain: generatePlainOutput,
  json: JSON.stringify,
};

export default (diffTree, format = 'stylish') => {
  const formatDiffTree = formatFunctions[format];
  if (!formatDiffTree) {
    throw new Error('This format type is not supported');
  }
  return formatDiffTree(diffTree);
};
