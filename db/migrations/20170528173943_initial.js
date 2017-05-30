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
      table.json('pings');
      table.string('profile_url');
      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('sharks')
  ]);
};
