// Imports
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var cors = require('cors');

// Init
var app = express();

app.use(helmet());
app.use(cors());

// Config
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// Controllers
var index = require('./src/rest/index');
var user = require('./src/rest/user');
var employees = require('./src/rest/employees');
var departments = require('./src/rest/departments');
var bills = require('./src/rest/bills');
var accomodations = require('./src/rest/accomodations');
var rooms = require('./src/rest/rooms');
var clients = require('./src/rest/clients');

app.use('/', index);
app.use('/user', user);
app.use('/employees', employees);
app.use('/departments', departments);
app.use('/bills', bills);
app.use('/accomodations', accomodations);
app.use('/rooms', rooms);
app.use('/clients', clients);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.jsonp(err.status || 500);
});

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!');
});

module.exports = app;
