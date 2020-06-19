const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const customersRouter = require('./routes/customers');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/customers', customersRouter);

app.use((err, req, res, next) => {
    console.error('ERROR', err);
    res.status(err.status).send({
        error: err.status, 
        message: err.message
    });
});
/// Test 
module.exports = app;