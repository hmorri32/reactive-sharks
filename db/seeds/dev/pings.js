const { sharks, pings } = require('../../../helpers/data-cleaner.js');

exports.seed = function(knex, Promise) {
  const createPing = (knex, ping) => {
    return knex.table('pings')
      .returning('shark_id')
      .insert(
        {
        shark_id: ping.shark_id,
        id: ping.id,
        datetime: ping.datetime,
        tz_datetime: ping.tz_datetime,
        latitude: ping.latitude,
        longitude: ping.longitude
      }
    )
  }

  return knex('pings').del()
    .then(() => {
      const pingPromises = [];
      pings.forEach((ping) => {
        pingPromises.push(createPing(knex, ping));
      });
      return Promise.all(pingPromises);
    });
};
