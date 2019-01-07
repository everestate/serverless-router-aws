#### Route streaming events from AWS Sqs.

Supported events
    * `message`: receive an event from AWS Sqs

```javascript
router.sqs
    .message(myQueueStreamARN, (ctx, event) => null);
```

Each matching callback gets first argument with `messageAttributes` and `body` keys.
messageAttribtues payload is already translated from typed into plain object.

**`myQueueStreamARN`** - `Sqs` queue stream ARN.

**`ctx`** - routing context, it's content dependent on event type and stream's `StreamViewType`. The components are:

* `messageAttribtues` - item's key attributes
* `body` - body of the payload

    Each component is translated from Sqs object to simple object. Example:

    ```javascript
    // Before translation:
    {
        messageAttributes: {
          id: {
            stringValue: "idValue"
          },
        }
    }

    // After translation:
    {
        messageAttributes: {
          id: "idValue",
        }
    }
    ```
