const ServerlessRouter = require('@everestate/serverless-router');
const ServerlessRouterDynamoDBPlugin = require('../ServerlessRouterDynamoDBPlugin');
const insertEventFixture = require('./__fixtures__/insertEventFixture');
const modifyEventFixture = require('./__fixtures__/modifyEventFixture');
const removeEventFixture = require('./__fixtures__/removeEventFixture');


const eventSourceARN = 'arn:aws:dynamodb:us-west-2:account-id:table/ExampleTableWithStream/stream/2015-06-27T00:48:05.899';

const subj = (router = new ServerlessRouter([ServerlessRouterDynamoDBPlugin])) => {
  router.dynamodb
    .insert(eventSourceARN, () => ({ matches: 'insert' }))
    .modify(eventSourceARN, () => ({ matches: 'modify' }))
    .remove(eventSourceARN, () => ({ matches: 'remove' }));
  return router;
};

describe('ServerlessRouterDynamoDBPlugin', () => {
  describe('on insert event', () =>
    test('invokes matching callback', () =>
      expect(subj().dispatch(insertEventFixture)).toEqual({ matches: 'insert' })));

  describe('on modify event', () =>
    test('invokes matching callback', () =>
      expect(subj().dispatch(modifyEventFixture)).toEqual({ matches: 'modify' })));

  describe('on remove event', () =>
    test('invokes matching callback', () =>
      expect(subj().dispatch(removeEventFixture)).toEqual({ matches: 'remove' })));

  test('pluginName', () =>
    expect(ServerlessRouterDynamoDBPlugin.pluginName).toEqual('dynamodb'));
});
