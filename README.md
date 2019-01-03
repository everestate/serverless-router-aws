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

**`ctx`** routing context, it's content dependent on event type
**`event`** API gateway event, same as **`dispatch`** receives

DynamoDB adapter implements `insert`, `modify` and `remove` methods.
See the documentation for more details: [docs/DynamoDB.md](./docs/DynamoDB.md)

#### [Http](./docs/Http.md)

HTTP Events from AWS API Gateway.

```javascript
router.http
    .get('/users/:id', (ctx, event) =>
    console.log(`get user by id "${event.pathParameters.id}"`))
    .post('/users', (ctx, event) =>
    console.log(`create new user with attributes "${event.body}"`));
```

**`ctx`** routing context, currently it's always an empty object
**`event`** API gateway event, same as **`dispatch`** receives

Http adapter implements `get`, `post`, `patch`, `put`, `delete` and `all` methods.
See the documentation for more details: [docs/Http.md](./docs/Http.md)

## License

[MIT](./LICENSE)
