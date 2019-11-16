const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const User = require('../model/user');

const auth = async (req, res, next) => {
  try {
    const tokenPrefix = 'Bearer ';
    const rowToken = req.header('Authorization');
    const token = rowToken.replace(tokenPrefix, '');
    const decodedPayload = jwt.verify(token, authConfig.secret);

    const user = await User.findOne({
      _id: decodedPayload._id,
      'tokens.token': token,
    });

    if (!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate' });
  }
};

module.exports = auth;
