function translateTypedObject(object) {
  const results = {};
  Object.keys(object).forEach((key) => {
    results[key] = object[key].stringValue || object[key].binaryValue || object[key].numberValue || object[key].customValue;
  });
  return results;
}

module.exports = translateTypedObject;
