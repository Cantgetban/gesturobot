import React, { useState, useEffect } from "react";

function getAllGestures() {
  return fetch("http://localhost:3000/gestures")
    .then((response) => response.json())
    .catch((error) => console.log("Error fetching gestures:", error));
}

function getGestureById(id) {
  return fetch(`http://localhost:3000/gestures/${id}`)
    .then((response) => response.json())
    .catch((error) => console.log("Error fetching gesture:", error));
}

function editGesture(id, updatedGesture) {
  return fetch(`http://localhost:3000/gestures/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedGesture),
  })
    .then((response) => response.json())
    .catch((error) => console.log("Error editing gesture:", error));
}

function addGestureJson(newGesture) {
  // get the current maximum ID
  fetch("http://localhost:3000/gestures")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const maxId = data ? Math.max(...data.map((gesture) => gesture.id)) : 0;
      // add 1 to the maximum ID to get the next ID for the new gesture
      const nextId = maxId + 1;

      // add the new gesture with the next ID
      fetch("http://localhost:3000/gestures", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: nextId, ...newGesture }),
      })
        .then((response) => response.json())
        .then((data) => {
          // update the gestures state with the new gesture
          // setGestures([...gestures, data]);
        });
    })
    .catch((error) => console.log("Error fetching gestures:", error));
}

function deleteGesture(id) {
  // send a DELETE request to delete the gesture with the given ID
  fetch(`http://localhost:3000/gestures/${id}`, {
    method: "DELETE",
  }).then(() => {
    // update the gestures state by removing the deleted gesture
    // setGestures(gestures.filter((gesture) => gesture.id !== id));
  });
}

export {
  addGestureJson,
  deleteGesture,
  getAllGestures,
  getGestureById,
  editGesture,
};
