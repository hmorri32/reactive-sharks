exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('sharks', function(table) {
      table.integer('id').primary();
      table.string('name');
      table.string('tagIdNumber');
      table.string('species');
      table.string('gender');
      table.string('stageOfLife');
      table.string('length');
      table.string('weight');
      table.string('tagDate');
      table.string('tagLocation');
      table.string('description', 8000);
      table.timestamps(true, true);
    }),

    knex.schema.createTable('pings', function(table) {
      table.integer('shark_id').unsigned();
      table.foreign('shark_id')
           .references('sharks.id');
      table.string('id').primary();
      table.string('datetime');
      table.string('tz_datetime');
      table.string('latitude');
      table.string('longitude');
      table.timestamps(true, true);
    })
  ]);
};


exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('pings'),
    knex.schema.dropTable('sharks')
  ]);
};
