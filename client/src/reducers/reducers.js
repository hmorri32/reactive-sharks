export const sharks = (state = [], action) => {
  switch (action.type) {
  case 'ADD_SHARKS':
    state = []
    return state.concat(action.sharks);
  default:
    return state;
  }
};

export const species = (state = [], action) => {
  switch (action.type) {
    case 'ADD_SPECIE':
      state = []
      const species = action.species.sharks.map(shark => shark.species);
      const uniqueKeys = species.reduce((acc, specie) => {
        !acc.includes(specie) ? acc.push(specie) : null;
        return acc;
      }, []);
      return state.concat(uniqueKeys);
      break;
    default:
      return state;
  }
}
