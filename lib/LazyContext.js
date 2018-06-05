const translateTypedObject = require('./translateTypedObject');


class LazyContext {
  constructor(record) {
    this.record = record;
  }

  get keys() {
    const keys = this.record.dynamodb.Keys;
    if (!keys) { return null; }
    return translateTypedObject(keys);
  }

  get newItem() {
    const newImage = this.record.dynamodb.NewImage;
    if (!newImage) { return null; }
    return translateTypedObject(newImage);
  }

  get oldItem() {
    const oldImage = this.record.dynamodb.OldImage;
    if (!oldImage) { return null; }
    return translateTypedObject(oldImage);
  }
}

module.exports = LazyContext;
