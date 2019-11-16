const express = require('express');
const morgan = require('morgan');
const app = express();

// import routes
const userRouter = require('./routes/user');
const taskRouter = require('./routes/task');

// middleware to parse json and to log request
app.use(express.json());
app.use(morgan('dev'));

// add routes
app.use(userRouter);
app.use(taskRouter);

module.exports = app;
