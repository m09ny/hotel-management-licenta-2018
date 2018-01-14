'use strict';
module.exports = (sequelize, DataTypes) => {
  var bills = sequelize.define('bills', {
    id_employee: DataTypes.INTEGER,
    id_client: DataTypes.INTEGER,
    date: DataTypes.DATE,
    amout: DataTypes.DOUBLE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return bills;
};