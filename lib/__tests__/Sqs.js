const Router = require('@everestate/serverless-router');
const Sqs = require('../Sqs');

const messageEventFixture = require('../Sqs/__tests__/__fixtures__/messageEventFixture');

const eventSourceARN = 'arn:aws:sqs:us-west-2:594035263019:NOTFIFOQUEUE';

const subj = (router = new Router([Sqs])) => {
  router.sqs
    .message(eventSourceARN, (ctx, event) => ({ matches: 'message', ctx, event }));
  return router;
};
describe('ServerlessRouterSqsPlugin', () => {
  describe('on message event', () =>
    test('invokes matching callback', () =>
      expect(subj().dispatch(messageEventFixture)).toEqual({
        matches: 'message',
        ctx: {
          messageAttribtues: {
            foo: 'bar',
          },
          body: 'body',
        },
        event: messageEventFixture,
      })));


  test('pluginName', () =>
    expect(Sqs.pluginName).toEqual('sqs'));
});
