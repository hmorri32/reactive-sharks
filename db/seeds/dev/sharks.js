const { sharks, pings } = require('../../../helpers/data-cleaner.js');

exports.seed = function(knex, Promise) {
  const createShark = (knex, shark) => {
    return knex.table('sharks')
      .returning('id')
      .insert(
        {
        id: shark.id,
        name: shark.name,
        tagIdNumber: shark.tagIdNumber,
        species: shark.species,
        gender: shark.gender,
        stageOfLife: shark.stageOfLife,
        length: shark.length,
        weight: shark.weight,
        tagDate: shark.tagDate,
        tagLocation: shark.tagLocation,
        description: shark.description
      }
    )
  }

  return knex('sharks').del()
    .then(() => {
      const sharkPromises = [];
      sharks.forEach((shark) => {
        sharkPromises.push(createShark(knex, shark));
      });
      return Promise.all(sharkPromises);
    });
};
