const axios = require('axios');
const fs    = require('fs');

const getSharkData = async () => {
  const shark = await Promise.all([
    axios.get('http://www.ocearch.org/tracker/ajax/filter-sharks/?sharks%5B%5D=41'),
    axios.get('http://www.ocearch.org/tracker/ajax/filter-sharks/?sharks%5B%5D=65'),
    axios.get('http://www.ocearch.org/tracker/ajax/filter-sharks/?sharks%5B%5D=25'),
    axios.get('http://www.ocearch.org/tracker/ajax/filter-sharks/?sharks%5B%5D=202'),
    axios.get('http://www.ocearch.org/tracker/ajax/filter-sharks/?sharks%5B%5D=213'),
    axios.get('http://www.ocearch.org/tracker/ajax/filter-sharks/?sharks%5B%5D=234'),
    axios.get('http://www.ocearch.org/tracker/ajax/filter-sharks/?sharks%5B%5D=235'),
    axios.get('http://www.ocearch.org/tracker/ajax/filter-sharks/?sharks%5B%5D=236'),
    axios.get('http://www.ocearch.org/tracker/ajax/filter-sharks/?sharks%5B%5D=239'),
    axios.get('http://www.ocearch.org/tracker/ajax/filter-sharks/?sharks%5B%5D=242'),
    axios.get('http://www.ocearch.org/tracker/ajax/filter-sharks/?sharks%5B%5D=150'),
    axios.get('http://www.ocearch.org/tracker/ajax/filter-sharks/?sharks%5B%5D=162')
  ])
  .then((result) => {
    return result.map(obj => obj.data[0]);
  })
  .then((sharkData) => {
    fs.writeFileSync('sharkData.json', JSON.stringify(sharkData), (err) => {
      if (err) throw err;
    })
  })
}

getSharkData();
