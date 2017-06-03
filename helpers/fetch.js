const axios = require('axios');
const fs    = require('fs');

const promises = [];

for(let i = 3; i < 242; i++) {
  let promise = axios.get(`http://www.ocearch.org/tracker/ajax/filter-sharks/?sharks%5B%5D=${i}`);
  promises.push(promise);
}

const getSharkData = () => {
  const shark = Promise.all([
    axios.all(promises)
  ])
  .then(result => {
    return result.map((stuff) => {
      if(stuff !== null) {
        return stuff.map(sharks => {
          if(sharks.data.length > 0 && sharks !== null) {
            return sharks.data;
          }
        });
      }
    });
  })
  .then(sharkData => fs.writeFileSync('sharkData2.json', JSON.stringify(sharkData)))
  .catch(e => e);
};

getSharkData();
