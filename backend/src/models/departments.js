'use strict';
module.exports = (sequelize, DataTypes) => {
  var departments = sequelize.define('departments', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        
      }
    }
  });
  return departments;
};