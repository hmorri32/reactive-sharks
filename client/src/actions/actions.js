export const addSharks = (sharks) => {
  return {
    type: 'ADD_SHARKS',
    sharks
  };
};

export const addPings = (pings) => {
  return {
    type: 'ADD_PINGS',
    pings
  };
};

export const fetchSharks = () => {
  return (dispatch) => {
    fetch('/api/v1/sharks')
      .then(response => response.json())
      .then(sharks => dispatch(addSharks(sharks)));
  };
};

export const fetchPings = (id) => {
  return (dispatch) => {
    fetch(`/api/v1/sharks/${id}/pings`)
      .then(response => response.json())
      .then(pings => dispatch(addPings(pings)));
  };
};
