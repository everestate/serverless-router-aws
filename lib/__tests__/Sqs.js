const Router = require('@everestate/serverless-router');
const Sqs = require('../Sqs');

const insertEventFixture = require('../Sqs/__tests__/__fixtures__/insertEventFixture');

const eventSourceARN = 'arn:aws:sqs:us-west-2:594035263019:NOTFIFOQUEUE';

const subj = (router = new Router([Sqs])) => {
  router.sqs
    .insert(eventSourceARN, (ctx, event) => ({ matches: 'insert', ctx, event }));
  return router;
};
describe('ServerlessRouterSqsPlugin', () => {
  describe('on insert event', () =>
    test('invokes matching callback', () =>
      expect(subj().dispatch(insertEventFixture)).toEqual({
        matches: 'insert',
        ctx: {
          messageAttribtues: {
            foo: 'bar',
          },
          body: 'body',
        },
        event: insertEventFixture,
      })));


  test('pluginName', () =>
    expect(Sqs.pluginName).toEqual('sqs'));
});
