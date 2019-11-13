const createLazyContext = require('../createLazyContext');
const messageEventFixture = require('./__fixtures__/messageEventFixture');

const subj = record => createLazyContext(record);

describe('createLazyContext', () => {
  describe('on message request', () => {
    test('extracts keys and payload', () =>
      expect(subj(messageEventFixture.Records[0])).toMatchObject({
        messageAttribtues: { foo: 'bar' },
        body: 'body',
      }));
  });
});
