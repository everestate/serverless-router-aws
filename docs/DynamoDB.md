Steaming events from AWS DynamoDB.

Supported methods
    * `insert`
    * `modify`
    * `remove`

```javascript
router.dynamodb
    .insert(myTableStreamARN, (ctx, event) => null);
```

Each matching callback gets first argument with `keys`, `newItem` and/or `oldItem` keys (depends of event type and stream view type).
Each of them could be either `null` or object with the data to consume. Data is already translated from typed into plain object.

**`myTableStreamARN`** - `DynamoDB` table stream ARN, see [AWS DynamoDB docs](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Streams.html)

**`ctx`** - routing context, it's content dependent on event type and stream's `StreamViewType`. The components are:

* `keys` - item's key attributes
* `newItem` - the entire item after it was inserted/modified
* `oldItem` - the entire item, before it was modified

    Each component is translated from DynamoDB document object to simple object. Example:

    ```javascript
    // Before translation:
    {
        NewImage: {
        Message: {
            S: "New item!"
        },
        Id: {
            N: "101"
        }
        }
    }

    // After translation:
    {
        newItem: {
        Message: "New item!",
        Id: 101,
        }
    }
    // Take a note, `Id` casted from string to number, cause it's DynamoDB type is number (N)
    ```

**`event`** - API gateway event, same as **`dispatch`** receives
