'use strict';
module.exports = (sequelize, DataTypes) => {
  var clients = sequelize.define('clients', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    cnp: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return clients;
};