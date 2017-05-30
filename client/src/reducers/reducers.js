export const sharks = (state = [], action) => {
  switch (action.type) {
  case 'ADD_SHARKS':
    return state.concat(action.sharks);
  default:
    return state;
  }
};

export const pings = (state = [], action) => {
  switch (action.type) {
  case 'ADD_PINGS':
    return state.concat(action.pings);
  default:
    return state;
  }
};
