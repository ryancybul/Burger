module.exports = function(sequelize, DataTypes) {
  var Burger = sequelize.define("Burger", {
    text: {
      type: DataTypes.STRING,
      allowNull: false
      },
    devoured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  return Burger;
};
