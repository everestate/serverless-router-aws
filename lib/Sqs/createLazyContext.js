const translateTypedObject = require('./translateTypedObject');

function createLazyContext(record) {
  return {
    get messageAttribtues() {
      const data = record.messageAttributes;
      if (!data) { return null; }
      return translateTypedObject(data);
    },
    get body() {
      return record.body;
    },
  };
}

module.exports = createLazyContext;
