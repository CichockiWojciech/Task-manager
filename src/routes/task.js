const express = require('express');
const controllers = require('../controllers/task');
const auth = require('../middleware/auth');
const validators = require('../middleware/validators');
const router = new express.Router();

router.get('/tasks', auth, controllers.findAll);
router.get('/tasks/:id', [auth, validators.idFormat], controllers.findOne);
router.post('/tasks', auth, controllers.insertOne);
router.patch('/tasks/:id', [auth, validators.idFormat], controllers.updateOne);
router.delete('/tasks/:id', [auth, validators.idFormat], controllers.deleteOne);

module.exports = router;
