const utils = require('../utils/utils');
const Task = require('../model/task');

const findAll = async (req, res) => {
  const match = { owner: req.user._id };
  const sort = {};

  if (req.query.completed) {
    match.completed = req.query.completed === 'true';
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':');
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
  }

  try {
    const tasks = await Task.find(match)
      .limit(parseInt(req.query.limit))
      .skip(parseInt(req.query.skip))
      .sort(sort);
    res.send(tasks);
  } catch (e) {
    res.status(500).send();
  }
};

const findOne = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) res.status(404).send();
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
};

const insertOne = async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateOne = async (req, res) => {
  const allowedUpdates = ['completed', 'priority', 'description'];
  utils.updatingPropertyExist(req, res, allowedUpdates);

  try {
    const updatingTask = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!updatingTask) res.status(404).send();

    const updatedProperty = Object.keys(req.body);
    updatedProperty.forEach(
      update => (updatingTask[update] = req.body[update])
    );

    await updatingTask.save();
    res.send(updatingTask);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteOne = async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!deletedTask) res.status(404).send();
    res.send(deletedTask);
  } catch (e) {
    res.status(500).send();
  }
};

module.exports = {
  findAll,
  findOne,
  insertOne,
  updateOne,
  deleteOne,
};
