const BasePlugin = require('@everestate/serverless-router/lib/BasePlugin');
const LazyContext = require('./LazyContext');


class ServerlessRouterDynamoDBPlugin extends BasePlugin {
  insert(eventSourceARN, callback) {
    return this.appendRoute('INSERT', eventSourceARN, callback);
  }

  modify(eventSourceARN, callback) {
    return this.appendRoute('MODIFY', eventSourceARN, callback);
  }

  remove(eventSourceARN, callback) {
    return this.appendRoute('REMOVE', eventSourceARN, callback);
  }

  static match(eventNameToMatch, eventSourceARNToMatch, callback) {
    return (event) => {
      if (!event.Records || event.Records.length !== 1) {
        throw new Error(`Only single record in scope of stream event is supported, ${event.Records.length} are given.`);
      }
      const record = event.Records[0];
      if (record.eventName !== eventNameToMatch || record.eventSourceARN !== eventSourceARNToMatch) {
        return null;
      }

      return { callback, context: new LazyContext(record) };
    };
  }

  static get pluginName() { return 'dynamodb'; }
}

module.exports = ServerlessRouterDynamoDBPlugin;
