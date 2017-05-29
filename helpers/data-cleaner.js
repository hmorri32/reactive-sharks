const sharkData = require('../sharkData.json');

const pings = sharkData.reduce((acc, shark) => {
  shark.pings.forEach(ping => {
    const newPing = Object.assign(ping, { shark_id: shark.id });
    acc.push(newPing);
  });
  return acc;
}, []);

const sharks = sharkData.reduce((acc, shark) => {
  const newShark = {
    id: shark.id,
    name: shark.name,
    tagIdNumber: shark.tagIdNumber,
    species: shark.species,
    gender: shark.gender,
    stageOfLife: shark.stageOfLife,
    length: shark.length,
    weight: shark.weight,
    tagDate: shark.tagDate,
    tagLocation: shark.tagLocation,
    description: shark.description
  };
  acc.push(newShark);
  return acc;
}, []);

module.exports = { sharks, pings };
