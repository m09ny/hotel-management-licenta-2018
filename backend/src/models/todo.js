'use strict';
module.exports = (sequelize, DataTypes) => {
  var todo = sequelize.define('todo', {
    title: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return todo;
};