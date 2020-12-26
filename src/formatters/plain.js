const joinKeys = (parentKeys, key) => [...parentKeys, key].join('.');

const stringify = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const outputMapping = {
  nested: ({ key, children }, parentKeys, func) => func(children, [...parentKeys, key]),
  unchanged: () => [],
  added: ({ key, value }, parentKeys) => `Property '${joinKeys(parentKeys, key)}' was added with value: ${stringify(value)}`,
  removed: ({ key }, parentKeys) => `Property '${joinKeys(parentKeys, key)}' was removed`,
  updated: ({ key, newValue, oldValue }, parentKeys) => {
    const updatedKeyInfo = `Property '${joinKeys(parentKeys, key)}' was updated. `;
    const updatedValueInfo = `From ${stringify(oldValue)} to ${stringify(newValue)}`;
    return `${updatedKeyInfo}${updatedValueInfo}`;
  },
};

const generatePlain = (diffTree) => {
  const iter = (innerDiffTree, parentKeys) => innerDiffTree
    .flatMap((el) => outputMapping[el.type](el, parentKeys, iter));
  return iter(diffTree, []).join('\n');
};

export default generatePlain;
