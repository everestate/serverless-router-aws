const createLazyContext = require('../createLazyContext');
const insertEventFixture = require('./__fixtures__/insertEventFixture');
const modifyEventFixture = require('./__fixtures__/modifyEventFixture');
const removeEventFixture = require('./__fixtures__/removeEventFixture');


const subj = record => createLazyContext(record);

describe('createLazyContext', () => {
  describe('on insert request', () =>
    test('extracts keys and payload', () =>
      expect(subj(insertEventFixture.Records[0])).toMatchObject({
        keys: {
          Id: 101,
        },
        oldItem: null,
        newItem: {
          Id: 101,
          Message: 'New item!',
        },
      })));

  describe('on modify request', () =>
    test('extracts keys and payload', () =>
      expect(subj(modifyEventFixture.Records[0])).toMatchObject({
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
      })));

  describe('on remove request', () =>
    test('extracts keys and payload', () =>
      expect(subj(removeEventFixture.Records[0])).toMatchObject({
        keys: {
          Id: 101,
        },
        newItem: null,
        oldItem: {
          Id: 101,
          Message: 'This item has changed',
        },
      })));
});
