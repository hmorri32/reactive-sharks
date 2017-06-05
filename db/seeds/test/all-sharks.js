// knex seed:run --env test
// knex migrate:latest --env test

/* eslint-disable */

exports.seed = function(knex, Promise) {
  return knex('sharks').del()
  .then(() => {
    return Promise.all([
      knex('sharks').insert({
        id: 1,
        name: 'Alistair Hennessey',
        tagIdNumber: '2222',
        species: 'Jaguar Shark',
        gender: 'Male',
        stageOfLife: 'Super Mature',
        length: 'like 20 feet',
        weight: '10,000 lbs',
        tagDate: 'yesterday',
        tagLocation: 'Miami, where the heat is on.',
        description: "That's an endangered species at most. What would be the scientific purpose of killing it?",
        pings: JSON.stringify([{
          "active": "1",
          "id": "61640",
          "datetime": "3 May 2017 10:31:16 AM",
          "tz_datetime": "3 May 2017 10:31:16 AM +0900",
          "latitude": "28.15986",
          "longitude": "-93.73574"
        },
        {
          "active": "1",
          "id": "totally",
          "datetime": "3 May dsfsdfsd 10:31:16 AM",
          "tz_datetime": "whatever",
          "latitude": "28",
          "longitude": "-93"
        },
        {
          "active": "2",
          "id": "61640",
          "datetime": "3",
          "tz_datetime": "3 May 2017 10:31:16 AM +0900",
          "latitude": "28.15986",
          "longitude": "-93.73574"
        }
        ]),
        dist_24_hours: 'far',
        dist_72_hours: 'super far',
        dist_total: 'a whole bunch',
        profile_url: 'www.mrstealyourshark.com'
      }, 'id')
      .then(shark => {
        return knex('sharks').insert( {
          id: 2,
          name: 'steve zissou',
          tagIdNumber: '2222',
          species: 'Great White Orca Shark',
          gender: 'Male',
          stageOfLife: 'Not Not mature',
          length: 'more than you pal',
          weight: '10,000 lbs',
          tagDate: 'yesterday',
          tagLocation: 'Somewhere cold and dreary',
          description: "Well... uh.. we fuckin stole it. man.",
          pings: JSON.stringify([{
            "active": "cool",
            "id": "guy",
            "datetime": "mcgee",
            "tz_datetime": "3 May 2017 10:31:16 AM +0900",
            "latitude": "28.15986",
            "longitude": "-93.73574"
          },
          {
            "active": "carne",
            "id": "a",
            "datetime": "suh",
            "tz_datetime": "dude",
            "latitude": "burri",
            "longitude": "to"
          },
          {
            "active": "2",
            "id": "61640",
            "datetime": "3",
            "tz_datetime": "3 May 2017 10:31:16 AM +0900",
            "latitude": "28.15986",
            "longitude": "-93.73574"
          }
          ]),
          dist_24_hours: 'heaps',
          dist_72_hours: 'bunches',
          dist_total: 'more than you pal',
          profile_url: 'www.stevezissourules.com'
        })
      })
    ])
  })
}
