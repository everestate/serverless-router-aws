const Router = require('@everestate/serverless-router');
const DynamoDB = require('../DynamoDB');

const insertEventFixture = require('../DynamoDB/__tests__/__fixtures__/insertEventFixture');
const modifyEventFixture = require('../DynamoDB/__tests__/__fixtures__/modifyEventFixture');
const removeEventFixture = require('../DynamoDB/__tests__/__fixtures__/removeEventFixture');

const eventSourceARN = 'arn:aws:dynamodb:us-west-2:account-id:table/ExampleTableWithStream/stream/2015-06-27T00:48:05.899';

const subj = (router = new Router([DynamoDB])) => {
  router.dynamodb
    .insert(eventSourceARN, (ctx, event) => ({ matches: 'insert', ctx, event }))
    .modify(eventSourceARN, (ctx, event) => ({ matches: 'modify', ctx, event }))
    .remove(eventSourceARN, (ctx, event) => ({ matches: 'remove', ctx, event }));
  return router;
};

describe('ServerlessRouterDynamoDBPlugin', () => {
  describe('on insert event', () => {
    test('invokes matching callback', () =>
      expect(subj().dispatch(insertEventFixture)).toEqual({
        matches: 'insert',
        ctx: {
          keys: {
            Id: 101,
          },
          newItem: {
            Id: 101,
            Message: 'New item!',
          },
          oldItem: null,
        },
        event: insertEventFixture,
      }));
  });

  describe('on modify event', () => {
    test('invokes matching callback', () =>
      expect(subj().dispatch(modifyEventFixture)).toEqual({
        matches: 'modify',
        ctx: {
          keys: {
            Id: 101,
          },
          newItem: {
            Id: 101,
            Message: 'This item has changed',
          },
          oldItem: {
            Id: 101,
            Message: 'New item!',
          },
        },
        event: modifyEventFixture,
      }));
  });

  describe('on remove event', () => {
    test('invokes matching callback', () =>
      expect(subj().dispatch(removeEventFixture)).toEqual({
        matches: 'remove',
        ctx: {
          keys: {
            Id: 101,
          },
          newItem: null,
          oldItem: {
            Id: 101,
            Message: 'This item has changed',
          },
        },
        event: removeEventFixture,
      }));
  });

  test('pluginName', () =>
    expect(DynamoDB.pluginName).toEqual('dynamodb'));
});
