module.exports = {
  Records: [{
    eventID: '3',
    eventVersion: '1.0',
    dynamodb: {
      Keys: {
        Id: {
          N: '101',
        },
      },
      SizeBytes: 38,
      SequenceNumber: '333',
      OldImage: {
        Message: {
          S: 'This item has changed',
        },
        Id: {
          N: '101',
        },
      },
      StreamViewType: 'NEW_AND_OLD_IMAGES',
    },
    awsRegion: 'us-west-2',
    eventName: 'REMOVE',
    eventSourceARN: 'arn:aws:dynamodb:us-west-2:account-id:table/ExampleTableWithStream/stream/2015-06-27T00:48:05.899',
    eventSource: 'aws:dynamodb',
  }],
};
