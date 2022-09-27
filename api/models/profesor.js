'use strict';
module.exports = (sequelize, DataTypes) => {
  const profesor = sequelize.define('profesor', {
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    dni: DataTypes.INTEGER
  }, {});
  profesor.associate = function(models) {
    // associations can be defined here
  };
  return profesor;
};