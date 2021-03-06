'use strict';
module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define('City', {
    name: DataTypes.STRING,
    lat: DataTypes.FLOAT,
    lng: DataTypes.FLOAT,
  }, {});
  City.associate = function(models) {
    City.hasMany(models.Favorite)
  };
  return City;
};
