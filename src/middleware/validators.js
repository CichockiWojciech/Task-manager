const mongoose = require('mongoose');

const idFormat = async (req, res, next) => {
  try {
    mongoose.Types.ObjectId(req.params.id);
    next();
  } catch (e) {
    res.status(400).send();
  }
};

module.exports = { idFormat };
