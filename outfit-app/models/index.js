const User = require("./user");
// const Likes = require('./likes');
const Outfits = require("./outfits");

User.hasMany(Outfits, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Outfits.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Outfits };
