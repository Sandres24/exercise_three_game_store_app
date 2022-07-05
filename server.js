// App
const { app } = require('./app');

// Models
const { User } = require('./models/user.model');
const { Game } = require('./models/game.model');
const { Review } = require('./models/review.model');
const { Console } = require('./models/console.model');

// Utils
const { db } = require('./utils/database.util');

// Database authentication
db.authenticate()
  .then(() => console.log('Db authenticated'))
  .catch((err) => console.log(err));

// Model's relations
// 1 User <---> M Review
User.hasMany(Review);
Review.belongsTo(User);

// 1 Game <---> M Review
Game.hasMany(Review);
Review.belongsTo(Game);

// M Game <---> M Console
Game.belongsToMany(Console, { through: 'gameInConsole' });
Console.belongsToMany(Game, { through: 'gameInConsole' });

// Database synced
db.sync()
  .then(() => console.log('Db synced'))
  .catch((err) => console.log(err));

// Starting server
app.listen(app.get('PORT'), () => {
  console.log(`Server running on port ${app.get('PORT')}`);
});
