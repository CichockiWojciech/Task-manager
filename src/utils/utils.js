const updatingPropertyExist = (req, res, allowedUpdates) => {
  const updateProperty = Object.keys(req.body);

  const isValidOperation = updateProperty.every(update => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    res.status(400).send({ error: 'Invalid updates' });
  }
};

module.exports = {
  updatingPropertyExist,
};
