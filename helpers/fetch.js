const axios = require('axios');

const sharkJSON = [];

Promise.all([
  axios.get('http://www.ocearch.org/tracker/ajax/filter-sharks/?sharks%5B%5D=20'),
  axios.get('http://www.ocearch.org/tracker/ajax/filter-sharks/?sharks%5B%5D=41'),
])
.then((result) => {
  sharkJSON.push(result[0].data);
  sharkJSON.push(result[1].data);
})
.then(() => console.log(sharkJSON));