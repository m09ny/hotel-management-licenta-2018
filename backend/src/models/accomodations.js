'use strict';
module.exports = (sequelize, DataTypes) => {
  var accomodations = sequelize.define('accomodations', {
    id_employee: DataTypes.INTEGER,
    id_bill: DataTypes.INTEGER,
    id_room: DataTypes.INTEGER,
    arrivelDate: DataTypes.DATE,
    nrNights: DataTypes.INTEGER,
    nrAdults: DataTypes.INTEGER,
    nrChildrens: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return accomodations;
};