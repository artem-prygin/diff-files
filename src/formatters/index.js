import generateStylishOutput from './stylish.js';
import generatePlainOutput from './plain.js';

const formatTypes = {
  stylish: generateStylishOutput,
  plain: generatePlainOutput,
  json: JSON.stringify,
};

export default (diffTree, format = 'stylish') => {
  const outputFormatter = formatTypes[format];
  if (!outputFormatter) {
    throw new Error('This format type is not supported');
  }
  return outputFormatter(diffTree);
};
