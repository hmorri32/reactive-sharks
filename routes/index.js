const express       = require('express');
const router        = express.Router();
const environment   = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile.js')[environment];
const database      = require('knex')(configuration);
const error         = require('../helpers/serverErrors');
const path          = require('path');

router.get('/', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../client/public', 'index.html'));
});

router.get('/api/v1/sharks', (request, response) => {
  const { species } = request.query;

  if(!species) {
    database('sharks').select()
    .then(sharks => response.status(200).json(sharks))
    .catch(() => response.status(404));
  } else {
    database('sharks').where('species', 'like', `%${species}%`).select()
    .then(sharks => {
      sharks.length > 0
        ? response.status(200).json(sharks)
        : error.queryArrayLength(request, response);
    });
  }
});


module.exports = router;
