'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
    'Favorites',
    'CityId',
    {
      type: Sequelize.INTEGER,
      references: {
        model: 'Cities',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Favorites',
      'CityId'
    )
  }
};
