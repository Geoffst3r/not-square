'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Events', [
      { time: new Date('December 18, 2021 10:30:00'), title: 'Beach Day Makapuu', body: 'This weekend, everybody is going to be showing up at Makapuu. Hang one loose da kine wit da boiz. Lychee cheeeee braddah you know we stay get nuts. Make sure you only show up if you stay local kine!', userId: 1 },
      { time: new Date('December 13, 2021 8:00:00'), title: 'Solo React Project Presentations', body: 'Big Day coming up. How is everybody going to be presenting?', userId: 2 },
      { time: new Date('December 25, 2021 0:00:00'), title: 'You Know', body: 'Even if you don\'t celebrate it, you know.', userId: 2 },], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete('Events', null, {});
  }
};
