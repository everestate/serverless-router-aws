const BasePlugin = require('@everestate/serverless-router/lib/BasePlugin');
const createLazyContext = require('./SQS/createLazyContext');

class SQS extends BasePlugin {
  message(eventSourceARN, callback) {
    return this.appendRoute(eventSourceARN, callback);
  }

  static match(eventSourceARNToMatch) {
    return (event) => {
      if (!event.Records || event.Records.length !== 1) {
        throw new Error(`Only single record in scope of stream queue events is supported, ${event.Records.length} are given.`);
      }
      const record = event.Records[0];
      if (record.eventSourceARN !== eventSourceARNToMatch) {
        return null;
      }

      return createLazyContext(record);
    };
  }
}

module.exports = SQS;
