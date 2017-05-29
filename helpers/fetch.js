const axios = require('axios');
const fs    = require('fs');

const getSharkData = async () => {
  const shark = await Promise.all([
    axios.get('http://www.ocearch.org/tracker/ajax/filter-sharks/?sharks%5B%5D=20'),
    axios.get('http://www.ocearch.org/tracker/ajax/filter-sharks/?sharks%5B%5D=41'),
    axios.get('http://www.ocearch.org/tracker/ajax/filter-sharks/?sharks%5B%5D=65'),
    axios.get('http://www.ocearch.org/tracker/ajax/filter-sharks/?sharks%5B%5D=24'),
    axios.get('http://www.ocearch.org/tracker/ajax/filter-sharks/?sharks%5B%5D=25'),
    axios.get('http://www.ocearch.org/tracker/ajax/filter-sharks/?sharks%5B%5D=31'),
  ])
  .then((result) => {
    return result.map(obj => obj.data[0]);
  })
  .then((sharkData) => {
    console.log(sharkData[0].pings[0]);
    fs.writeFileSync('sharkData.json', JSON.stringify(sharkData), (err) => {
      if (err) throw err;
    })
  })
}

getSharkData();