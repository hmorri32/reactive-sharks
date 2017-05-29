export const getUsers = (user) => {
  return {
    type: 'GET_USERS',
    user
  };
};