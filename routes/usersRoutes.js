const express = require('express');
const { getUsers, assignAstrologer } = require('../controllers/usersController');
const {register, login} = require('../controllers/authController')
const usersRouter = express.Router();

usersRouter.get('/', getUsers);
usersRouter.post('/assign', assignAstrologer);
usersRouter.post('/register', register);
usersRouter.post('/login', login);

module.exports = usersRouter;
