const translateTypedObject = require('./translateTypedObject');

function createLazyContext(record) {
  return {
    get keys() {
      const keys = record.dynamodb.Keys;
      if (!keys) { return null; }
      return translateTypedObject(keys);
    },
    get newItem() {
      const newImage = record.dynamodb.NewImage;
      if (!newImage) { return null; }
      return translateTypedObject(newImage);
    },
    get oldItem() {
      const oldImage = record.dynamodb.OldImage;
      if (!oldImage) { return null; }
      return translateTypedObject(oldImage);
    },
  };
}

module.exports = createLazyContext;
