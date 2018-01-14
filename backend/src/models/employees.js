'use strict';
module.exports = (sequelize, DataTypes) => {
  var employees = sequelize.define('employees', {
    id_department: DataTypes.INTEGER,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    cnp: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    employment_date: DataTypes.DATE,
    role: DataTypes.STRING,
    salary: DataTypes.DOUBLE
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return employees;
};