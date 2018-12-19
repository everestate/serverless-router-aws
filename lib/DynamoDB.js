const BasePlugin = require('@everestate/serverless-router/lib/BasePlugin');
const createLazyContext = require('./DynamoDB/createLazyContext');

class DynamoDB extends BasePlugin {
  insert(eventSourceARN, callback) {
    return this.appendRoute('INSERT', eventSourceARN, callback);
  }

  modify(eventSourceARN, callback) {
    return this.appendRoute('MODIFY', eventSourceARN, callback);
  }

  remove(eventSourceARN, callback) {
    return this.appendRoute('REMOVE', eventSourceARN, callback);
  }

  static match(eventNameToMatch, eventSourceARNToMatch) {
    return (event) => {
      if (!event.Records || event.Records.length !== 1) {
        throw new Error(`Only single record in scope of stream event is supported, ${event.Records.length} are given.`);
      }
      const record = event.Records[0];
      return record.eventName === eventNameToMatch && record.eventSourceARN === eventSourceARNToMatch;
    };
  }

  static ctx(event) {
    return createLazyContext(event.Records[0]);
  }
}

module.exports = DynamoDB;
