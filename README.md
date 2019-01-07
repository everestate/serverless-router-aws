# @everestate/serverless-router-aws

> [Serverless Router](https://github.com/everestate/serverless-router) plugin to handle http, streaming and other events at AWS λ

## Installation

```
npm install @everestate/serverless-router @everestate/serverless-router-aws --save
```

## Supported events / services

#### [DynamoDB](./docs/DynamoDB.md)

Steaming events from AWS DynamoDB.

```javascript
const FOOBAR_TABLE_STREAM_ARN = 'arn:aws:dynamodb:us-west-2:111122223333:table/FooTable/stream/2015-05-11T21:21:33.291';
router.dynamodb
    .insert(FOOBAR_TABLE_STREAM_ARN, (ctx, _event) =>
    console.log(`New Foobar record inserted "${ctx.newItem}"`));
```

**`ctx`** - routing context, it's content dependent on event type

**`event`** - API gateway event, same as **`dispatch`** receives

DynamoDB adapter implements `insert`, `modify` and `remove` methods.
See the documentation for more details: [docs/DynamoDB.md](./docs/DynamoDB.md)

#### [HTTP](./docs/HTTP.md)

HTTP Events from AWS API Gateway.

```javascript
router.http
    .get('/users/:id', (ctx, event) =>
    console.log(`get user by id "${event.pathParameters.id}"`))
    .post('/users', (ctx, event) =>
    console.log(`create new user with attributes "${event.body}"`));
```

**`ctx`** - routing context, currently it's always an empty object

**`event`** - API gateway event, same as **`dispatch`** receives

HTTP adapter implements `get`, `post`, `patch`, `put`, `delete` and `all` methods.
See the documentation for more details: [docs/HTTP.md](./docs/HTTP.md)


#### [SQS](./docs/SQS.md)

Steaming events from AWS SQS.

```javascript
const FOOBAR_QUEUE_STREAM_ARN = 'arn:aws:sqs:us-west-2:594035263019:FOOBARQUEUE';
router.sqs
    .messgage(FOOBAR_TABLE_STREAM_ARN, (ctx, _event) =>
    console.log(`New nessage received"${ctx.messageAttribtues}"`));
```

**`ctx`** - routing context, it contains the event payload

**`event`** - message gateway event, same as **`dispatch`** receives

SQS adapter implements `message` method.
See the documentation for more details: [docs/SQS.md](./docs/SQS.md)


## License

[MIT](./LICENSE)
