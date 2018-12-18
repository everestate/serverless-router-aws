const AWS = require('aws-sdk');


const client = new AWS.DynamoDB.DocumentClient();
const translator = client.getTranslator();
const shape = client.service.api.operations.getItem.output.members.Item;

function translateTypedObject(object) {
  return translator.translateOutput(object, shape);
}

module.exports = translateTypedObject;
