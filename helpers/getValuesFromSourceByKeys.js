const getValuesFromSourceByKeys = (keys, source) => {
  const result = {};

  keys.map(env => {
    if (source[env]) {
      result[env] = source[env]
    }
  });

  return result;
}

export default getValuesFromSourceByKeys;