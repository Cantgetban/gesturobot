
export const getMovements = async () => {
  return fetch("http://localhost:3000/movements")
  .then((response) => response.json())
  .catch((error) => console.log("Error fetching gestures:", error));
};


