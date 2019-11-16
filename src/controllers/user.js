const utils = require('../utils/utils');
const User = require('../model/user');

const findAll = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send();
  }
};

const findOne = async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);
    if (!user) return res.status(404).send();
    res.send(user);
  } catch (e) {
    res.status(500).send();
  }
};

const insertOne = async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateMe = async (req, res) => {
  const allowedUpdates = ['name', 'email', 'password', 'age'];
  utils.updatingPropertyExist(req, res, allowedUpdates);

  try {
    const updatingUser = req.user;

    const updatedProperty = Object.keys(req.body);
    updatedProperty.forEach(
      update => (updatingUser[update] = req.body[update])
    );
    await updatingUser.save();
    res.send(updatingUser);
  } catch (error) {
    res.status(400).send(error);
  }
};

const logIn = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateAuthToken();
    res.send({ user: user, token: token });
  } catch (e) {
    res.status(400).send();
  }
};

const logOut = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
};

const logOutAll = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
};

const deleteMe = async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
};

const showMe = async (req, res) => {
  res.send(req.user);
};

module.exports = {
  findAll,
  findOne,
  insertOne,
  updateMe,
  logIn,
  logOut,
  logOutAll,
  deleteMe,
  showMe,
};
