import yaml from 'js-yaml';

const types = {
  json: JSON.parse,
  yml: yaml.safeLoad,
};

export default (data, type) => {
  const parse = types[type];
  if (!parse) {
    const supportedTypes = Object.keys(types).join(', ');
    throw new Error(`Supported file types are: ${supportedTypes}`);
  }
  return parse(data);
};
