const sharkData = require('../../../sharkData2.json');
const flat = [].concat.apply([], sharkData)''


exports.seed = function(knex, Promise) {
  const createShark = (knex, shark) => {
    return knex.table('sharks')
      .insert({
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
        description: shark.description,
        pings: JSON.stringify(shark.pings),
        profile_url: shark.profile_url
      }
    );
  };

  return knex('sharks').del()
    .then(() => {
      const sharkPromises = [];
      flat.forEach((shark) => {
        sharkPromises.push(createShark(knex, shark));
      });
      return Promise.all(sharkPromises);
    });
};
