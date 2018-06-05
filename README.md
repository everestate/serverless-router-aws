# @everestate/serverless-router-plugin-dynamodb

> [Serverless Router](https://github.com/everestate/serverless-router) plugin to handle AWS DynamoDB stream events

## Installation

```
npm install @everestate/serverless-router @everestate/serverless-router-plugin-dynamodb --save
```

## Usage

```javascript
const ServerlessRouter = require('@everestate/serverless-router');
const ServerlessRouterDynamoDBPlugin = require('@everestate/serverless-router-plugin-dynamodb');

const unitService = require('../services/unitService');

function dispatch(event) {
  const router = new ServerlessRouter([ServerlessRouterDynamoDBPlugin]);

  router.dynamodb
    .insert(process.env.UNIT_TABLE_STREAM_ARN, ({ newItem }) => {
      console.log(`Unit "${newItem.id} is created"`);
      return unitService.create(newItem); // returns promise
    })
    .modify(process.env.UNIT_TABLE_STREAM_ARN, ({ newItem }) => {
      console.log(`Unit "${newItem.id} is updated"`);
      return unitService.update(newItem); // returns promise
    })
    .remove(process.env.UNIT_TABLE_STREAM_ARN, ({ oldItem }) => {
      console.log(`Unit "${oldItem.id} is removed"`);
      return unitService.remove(oldItem.id); // returns promise
    });

  router.mismatch(() => {
    const { eventName, eventSourceARN } = event.Records[0];
    return Promise.reject(new Error(`Unknown route: ${eventName} ${eventSourceARN}`));
  });

  return router.dispatch(event);
}

function myLambdaHandler(event, context, callback) {
  return dispatch(event)
    .then(() => callback(null, 'ok'))
    .catch(error => callback(error));
}
```

Each matching callback gets first argument with `keys`, `newItem` and/or `oldItem` keys (depends of event type and stream view type).
Each of them could be either `null` or object with the data to consume. Data is already translated from typed into plain object.

By default `serveless-router` will throw `error` on route mismatch.
It's possible to define [custom behaviour on mismatch](https://github.com/everestate/serverless-router#when-route-is-mismatched).

## License

[MIT](./LICENSE)
