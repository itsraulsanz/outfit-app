const sequelize = require('../config/connection');
const { User, Outfit, Like } = require('../models');

const userData = require('./userData.json');
const outfitData = require('./outfitsData.json');
const likeData = require('./likesData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });
    await Outfit.bulkCreate(outfitData);
    await Like.bulkCreate(likeData);
    process.exit(0);
  };

seedDatabase();
