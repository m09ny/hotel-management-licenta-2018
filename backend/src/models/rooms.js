'use strict';
module.exports = (sequelize, DataTypes) => {
  var rooms = sequelize.define('rooms', {
    roomType: DataTypes.STRING,
    nrAdults: DataTypes.INTEGER,
    nrChildrens: DataTypes.INTEGER,
    priceNight: DataTypes.FLOAT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return rooms;
};