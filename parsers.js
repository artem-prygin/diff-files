import yaml from 'js-yaml';

const extensions = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
};

export default (data, extension) => {
  if (extension in extensions) {
    return extensions[extension](data);
  }
  const supportedExtensions = Object.keys(extensions).map((ext) => ext.slice(1)).join(', ');
  throw new Error(`Supported file extensions are: ${supportedExtensions}`);
};
