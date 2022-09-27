'use strict';
module.exports = (sequelize, DataTypes) => {
  const profesor_materia = sequelize.define('profesor_materia', {
    id_profesor: DataTypes.INTEGER,
    id_materia: DataTypes.INTEGER
  }, {});
  profesor_materia.associate = function(models) {
    // associations can be defined here
  };
  return profesor_materia;
};