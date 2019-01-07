const DynamoDB = require('./lib/DynamoDB');
const SQS = require('./lib/SQS');
const HTTP = require('./lib/HTTP');

module.exports = {
  DynamoDB,
  HTTP,
  SQS,
};
