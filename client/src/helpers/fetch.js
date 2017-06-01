export const getAllSharks = () => {
  return fetch('/api/v1/sharks')
  .then(response => response.json());
};