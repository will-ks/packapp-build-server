'use strict';

// --- Dependencies --- //
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const items = require('./routes/items');

// --- Instantiations --- //
const app = express();

// --- Configurations --- //
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/database-name', {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE
});

// --- Middleware --- //
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// --- Routes --- //
app.use('/items', items);

// --- Error Handling --- //
app.use((req, res, next) => {
  res.status(404).json({ code: 'not found' });
});

app.use((err, req, res, next) => {
  console.error('ERROR', req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    res.status(500).json({ code: 'unexpected' });
  }
});

module.exports = app;
