export const getUsers = async () => {
  return fetch("http://localhost:3000/users")
    .then((response) => response.json())
    .catch((error) => console.log("Error fetching gestures:", error));
};
