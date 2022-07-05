const express = require('express');

// Controllers
const {
  getAllConsoles,
  createConsole,
  assignGame,
  updateConsole,
  deleteConsole,
} = require('../controllers/consoles.controller');

// Middlewares
const { protectSession } = require('../middlewares/auth.middleware');
const {
  createConsoleValidators,
  assignGameValidators,
} = require('../middlewares/validators.middleware');
const { consoleExists } = require('../middlewares/consoles.middleware');

// Router
const consolesRouter = express.Router();

consolesRouter.get('/', getAllConsoles);

consolesRouter.use(protectSession);

consolesRouter.post('/', createConsoleValidators, createConsole);

consolesRouter.post('/assign-game', assignGameValidators, assignGame);

consolesRouter.use('/:id', consoleExists).route('/:id').patch(updateConsole).delete(deleteConsole);

module.exports = { consolesRouter };
