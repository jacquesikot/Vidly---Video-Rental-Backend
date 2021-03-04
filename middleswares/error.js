const winston = require('winston');

logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

module.exports = function (err, req, res, next) {
  logger.error(err);
  res.status(500).send('Something failed.');
};
