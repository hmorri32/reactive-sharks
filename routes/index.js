const express       = require('express');
const router        = express.Router();
const environment   = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile.js')[environment];
const database      = require('knex')(configuration);
const error         = require('../helpers/serverErrors');

router.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
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

router.get('/api/v1/sharks/:id', (request, response) => {
  const { id } = request.params;
  console.log(id);
  database('sharks').where('id', id).select()
  .then(shark => {
    shark.length > 0
      ? response.status(200).json(shark)
      : error.invalidID(request, response);
  })
  .catch(() => error.serverError(response));
});

router.get('/api/v1/sharks/:id/pings', (request, response) => {
  const { id } = request.params;

  database('sharks').where('id', id).select()
  .then(sharks => {
    sharks.length > 0
      ? response.status(200).json(sharks[0].pings)
      : error.invalidID(request, response);
  })
  .catch(() => error.serverError(response));
});

module.exports = router;
