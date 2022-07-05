const express = require('express');

// Controllers
const {
  signup,
  login,
  getActiveUsers,
  updateUser,
  deleteUser,
} = require('../controllers/users.controllers');

// Middlewares
const { createUserValidators } = require('../middlewares/validators.middleware');
const { protectSession, protectUserAccount } = require('../middlewares/auth.middleware');
const { userExists } = require('../middlewares/users.middleware');

// Router
const usersRouter = express.Router();

usersRouter.post('/signup', createUserValidators, signup);

usersRouter.post('/login', login);

usersRouter.use(protectSession);

usersRouter.get('/', getActiveUsers);

usersRouter
  .use('/:id', userExists, protectUserAccount)
  .route('/:id')
  .patch(updateUser)
  .delete(deleteUser);

module.exports = { usersRouter };
