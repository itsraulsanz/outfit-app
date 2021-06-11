const sequelize = require("../config/connection");
const { User, Outfits } = require("../models");

const userData = require("./userData.json");
const outfitData = require("./outfitsData.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  await Outfits.bulkCreate(outfitData);
  process.exit(0);
};

seedDatabase();
