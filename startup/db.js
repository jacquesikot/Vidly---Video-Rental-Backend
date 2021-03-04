const mongoose = require('mongoose');
const logger = require('../utils/logger');

module.exports = function () {
  mongoose
    .connect(
      'mongodb+srv://jack:jack@clustermeanapp.ayzn1.mongodb.net/vidly?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }
    )
    .then(() => logger.info('Connect to MongoDB'));
};
