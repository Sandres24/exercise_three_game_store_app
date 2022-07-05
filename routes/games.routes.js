const express = require('express');

// Controllers
const {
  getAllGames,
  createGame,
  createGameReview,
  updateGame,
  deleteGame,
} = require('../controllers/games.controllers');

// Middlewares
const { protectSession } = require('../middlewares/auth.middleware');
const {
  createGameValidators,
  createReviewValidators,
} = require('../middlewares/validators.middleware');
const { gameExists } = require('../middlewares/games.middleware');

// Router
const gamesRouter = express.Router();

gamesRouter.get('/', getAllGames);

gamesRouter.use(protectSession);

gamesRouter.post('/', createGameValidators, createGame);

gamesRouter.post('/reviews/:gameId', createReviewValidators, createGameReview);

gamesRouter.use('/:id', gameExists).route('/:id').patch(updateGame).delete(deleteGame);

module.exports = { gamesRouter };
