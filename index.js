const DynamoDB = require('./lib/DynamoDB');
const Sqs = require('./lib/Sqs');
const Http = require('./lib/Http');

module.exports = {
  DynamoDB,
  Http,
  Sqs,
};
