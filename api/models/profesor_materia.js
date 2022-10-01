'use strict';

module.exports = (sequelize, DataTypes) => {
  const profesor_materia = sequelize.define('profesor_materia', {
    id_profesor: DataTypes.INTEGER,
    id_materia: DataTypes.INTEGER
  }, {});

  profesor_materia.associate = function(models) {
    profesor_materia.belongsTo(models.materia,
      {
        as: 'Materia-Relacionada',
        foreignKey: 'id_materia'
      }
    );
    profesor_materia.belongsTo(models.profesor,
      {
        as: 'Profesor-Relacionado',
        foreignKey: 'id_profesor'
      }
    );
  }

  return profesor_materia;
};