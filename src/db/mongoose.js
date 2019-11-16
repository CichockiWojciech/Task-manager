const mongoose = require('mongoose');
const dbConfig = require('../config/db');

const connect = () => {
  return mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  });
};

module.exports = { connect };
