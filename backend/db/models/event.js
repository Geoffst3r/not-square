'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    time: DataTypes.TIME,
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});

  Event.associate = function (models) {
    Event.belongsTo(models.User, { foreignKey: 'userId' });
    const columnMapping = {
      through: 'Rsvp',
      foreignKey: 'eventId',
      otherKey: 'userId'
    };
    Event.belongsToMany(models.User, columnMapping);
  };
  return Event;
};
