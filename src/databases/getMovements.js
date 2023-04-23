import "./Movements.json"

export const getMovements = async () => {
  const data = require('./Movements.json');
  return data
};
