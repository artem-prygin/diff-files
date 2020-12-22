import stylish from './stylish.js';
import plain from './plain.js';

const formatTypes = { stylish, plain, json: JSON.stringify };
export default (diffTree, format = 'stylish') => {
  if (!Object.keys(formatTypes).includes(format)) {
    throw new Error('This format type is not supported');
  }
  return formatTypes[format](diffTree);
};
