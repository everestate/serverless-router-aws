const createLazyContext = require('../createLazyContext');
const insertEventFixture = require('./__fixtures__/insertEventFixture');

const subj = record => createLazyContext(record);

describe('createLazyContext', () => {
  describe('on insert request', () =>
    test('extracts keys and payload', () =>
      expect(subj(insertEventFixture.Records[0])).toMatchObject({
        messageAttribtues: { foo: 'bar' },
        body: 'body',
      })));
});
