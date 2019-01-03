const BasePlugin = require('@everestate/serverless-router/lib/BasePlugin');
const createLazyContext = require('./Sqs/createLazyContext');

class Sqs extends BasePlugin {
  insert(eventSourceARN, callback) {
    return this.appendRoute(eventSourceARN, callback);
  }

  static match(eventSourceARNToMatch) {
    return (event) => {
      if (!event.Records || event.Records.length !== 1) {
        throw new Error(`Only single record in scope of stream queue events is supported, ${event.Records.length} are given.`);
      }
      const record = event.Records[0];
      return record.eventSourceARN === eventSourceARNToMatch;
    };
  }

  static ctx(event) {
    return createLazyContext(event.Records[0]);
  }
}

module.exports = Sqs;
