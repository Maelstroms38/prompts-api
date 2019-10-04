'use strict';
module.exports = (sequelize, DataTypes) => {
  const Prompts = sequelize.define('Prompts', {
    title: DataTypes.TEXT
  }, {});
  Prompts.associate = function(models) {
    // associations can be defined here
  };
  return Prompts;
};