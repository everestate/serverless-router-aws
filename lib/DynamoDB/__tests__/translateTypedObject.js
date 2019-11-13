const translateTypedObject = require('../translateTypedObject');

describe('translateTypedObject', () => {
  test('translates typed item into plain object', () =>
    expect(translateTypedObject({
      images: {
        L: [{
          S: '3a7334af-aca5-40c7-9622-beec17c6d2e3__MG_3279.jpg',
        }, {
          S: 'f19f6d92-618a-4f47-87c6-7a22b5d7aff7__MG_3285.jpg',
        }],
      },
      firingType: { S: 'gas' },
      hasElevator: { BOOL: false },
      spaceTerraces: { NULL: true },
      spaceUsable: { N: '34.96' },
      updatedAt: { S: '2018-03-12T15:20:33.996Z' },
    })).toEqual({
      images: [
        '3a7334af-aca5-40c7-9622-beec17c6d2e3__MG_3279.jpg',
        'f19f6d92-618a-4f47-87c6-7a22b5d7aff7__MG_3285.jpg',
      ],
      firingType: 'gas',
      hasElevator: false,
      spaceTerraces: null,
      spaceUsable: 34.96,
      updatedAt: '2018-03-12T15:20:33.996Z',
    }));
});
