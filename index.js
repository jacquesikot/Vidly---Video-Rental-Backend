require('dotenv').config();
const log = require('debug')('app:log'); // $export DEBUG=app:log
const morgan = require('morgan'); // For loggin HTTP requests
const express = require('express');

const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  log('Morgan enabled...');
}

const port = process.env.PORT || 3000;
const server = app.listen(port, () => log(`Listening on port ${port}...`));

module.exports = server;
