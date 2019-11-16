const express = require('express');
const controllers = require('../controllers/user');
const auth = require('../middleware/auth');
const validators = require('../middleware/validators');
const router = new express.Router();

router.post('/users/login', controllers.logIn);
router.post('/users/logout', auth, controllers.logOut);
router.post('/users/logoutAll', auth, controllers.logOutAll);
router.get('/users', auth, controllers.findAll);
router.get('/users/me', auth, controllers.showMe);
router.get('/users/:id', [auth, validators.idFormat], controllers.findOne);
router.post('/users', controllers.insertOne);
router.patch('/users/me', auth, controllers.updateMe);
router.delete('/users/me', auth, controllers.deleteMe);

module.exports = router;
