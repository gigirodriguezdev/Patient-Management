export const getPatients = async (): Promise<Response> => {
  return fetch('https://63bedcf7f5cfc0949b634fc8.mockapi.io/users');
};
