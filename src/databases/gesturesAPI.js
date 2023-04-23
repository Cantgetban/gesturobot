import "./Gestures.json"

let data = require("./Gestures.json"); // Assuming data.json is in the same directory

// Insert a new Gesture to the array
const insertGesture = (newGesture) => {
  data.push(newGesture);
  saveDataToFile();
};

// Delete an Gesture from the array by id
const deleteGestureById = (id) => {
  const index = data.findIndex(obj => obj.id === id);
  if (index !== -1) {
    data.splice(index, 1);
    saveDataToFile();
  }
};

// Edit an Gesture in the array by id
const editGestureById = (id, updatedGesture) => {
  const index = data.findIndex(obj => obj.id === id);
  if (index !== -1) {
    data[index] = updatedGesture;
    saveDataToFile();
  }
};

// Save data back to the JSON file
const saveDataToFile = () => {
  const fs = require('fs');
  fs.writeFileSync('./Gestures.json', JSON.stringify(data));
};

export { insertGesture, deleteGestureById, editGestureById };

