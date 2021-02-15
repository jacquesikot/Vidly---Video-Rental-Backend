require('dotenv').config();
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const log = require('debug')('app:log'); // $export DEBUG=app:log
const morgan = require('morgan'); // For loggin HTTP requests
const helmet = require('helmet'); // Helps secure application by setting various HTTP headers
const express = require('express');
const genres = require('./routes/genres');
const home = require('./routes/home');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');

const app = express();

mongoose
  .connect('mongodb://localhost/vidly', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => log('Connect to MongoDB'))
  .catch((e) => log('Could not connect to MongoDB..'));

app.set('view engine', 'pug');
app.set('views', './views'); // Default

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  log('Morgan enabled...');
}

// Router
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/', home);

const port = process.env.PORT || 3000;
app.listen(port, () => log(`Listening on port ${port}...`));

// Added this to test git push
