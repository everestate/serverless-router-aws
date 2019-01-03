const translateTypedObject = require('../translateTypedObject');

describe('translateTypedObject', () =>
  test('translates typed item into plain object', () =>
    expect(translateTypedObject({
      id: { stringValue: 'value' },
      foo: { binaryValue: 4 },
    })).toEqual({
      id: 'value',
      foo: 4,
    })));
