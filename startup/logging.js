require('express-async-errors');
const logger = require('../utils/logger');

module.exports = function () {
  process.on('uncaughtException', (exception) => {
    logger.error(exception, exception);
    process.exit(1);
  });

  process.on('unhandledRejection', (exception) => {
    logger.error(exception, exception);
    process.exit(1);
  });
};
