Events from AWS API Gateway.

If you familiar with routing principals from [sinatra](https://github.com/sinatra/sinatra),
[express](https://github.com/expressjs/express) or similar framework, you got it.

Supported methods
* `get` - catching `GET` requests
* `post` - catching `POST` requests
* `patch` - catching `PATCH` requests
* `put` - catching `PUT` requests
* `delete` - catching `PUT` requests
* `all` - - catching **any** kind of requests


```javascript
router.dynamodb
    .get(path, (ctx, event) => null);
```

**`path`** - HTTP path, powered by [path-to-regexp](https://github.com/pillarjs/path-to-regexp)

**`ctx`** - routing context, currently it's always an empty object

**`event`** - API gateway event, same as **`dispatch`** receives
