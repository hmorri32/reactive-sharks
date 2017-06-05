export const addSharks = (sharks) => {
  return {
    type: 'ADD_SHARKS',
    sharks
  };
};

export const addSpecies = (sharks) => {
  return {
    type: 'ADD_SPECIE',
    species: sharks
  };
};

export const fetchSharks = () => {
  return (dispatch) => {
    fetch('/api/v1/sharks')
      .then(response => response.json())
      .then(sharks => dispatch(addSharks(sharks)))
      .then(sharks => dispatch(addSpecies(sharks)));
  };
};

export const fetchSpecie = (species) => {
  return (dispatch) => {
    fetch(`/api/v1/sharks?species=${species}`)
      .then(response => response.json())
      .then(sharks => dispatch(addSharks(sharks)));
  };
};
