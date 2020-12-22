import yaml from 'js-yaml';

const types = {
  json: JSON.parse,
  yml: yaml.safeLoad,
};

export default (data, type) => {
  if (type in types) {
    return types[type](data);
  }
  const supportedTypes = Object.keys(types).join(', ');
  throw new Error(`Supported file types are: ${supportedTypes}`);
};
