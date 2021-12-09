'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Events', [
      { time: new Date('December 18, 2021 10:30:00'), title: 'Beach Day Makapuu', body: 'This weekend, everybody is going to be showing up at Makapuu. Come hang out at the best beach on the island with the best company. Don\'t come without beer.', userId: 1 },
      { time: new Date('December 13, 2021 8:00:00'), title: 'Solo React Project Presentations', body: 'Big Day coming up. We will be showing what we did with our solo project. Make sure you are ready and best of luck!', userId: 2 },
      { time: new Date('December 23, 2021 0:00:00'), title: 'Festivus', body: 'For the rest of us.', userId: 2 },], {});
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
