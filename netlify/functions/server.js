const serverless = require('serverless-http')
const app = require('../../dist/src/app').default

module.exports.handler = serverless(app)
