import { useContext } from "react";
import { mapEnglishToHebrew , mapHebrewToEnglish} from "./emotions";

function addGestureEx(newGesture) {
  return new Promise((resolve, reject) => {
    // Get the current maximum ID
    fetch("http://localhost:3000/newExperiment")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const maxId = data ? Math.max(...data.map((gesture) => gesture.id)) : 0;
        // Add 1 to the maximum ID to get the next ID for the new gesture
        const nextId = maxId + 1;
        // Add the new gesture with the next ID
        fetch("http://localhost:3000/newExperiment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: nextId, ...newGesture }),
        })
          .then((response) => response.json())
          .then((data) => {
            // Update the gestures state with the new gesture
            // setGestures([...gestures, data]);

            // Resolve the promise with the new ID
            resolve(data.id);
          })
          .catch((error) => reject(error));
      })
      .catch((error) => {
        console.log("Error fetching gestures:", error);
        reject(error);
      });
  });
}


  function getAllGesturesEx() {
    return fetch("http://localhost:3000/newExperiment")
      .then((response) => response.json())
      .catch((error) => console.log("Error fetching gestures:", error));
  }

  async function deleteAllExperiments() {
    fetch('http://localhost:3000/newExperiment')
      .then(response => response.json())
      .then(experiments => {
        experiments.forEach(experiment => {
          fetch(`http://localhost:3000/newExperiment/${experiment.id}`, {
            method: 'DELETE'
          })
          .catch((error) => console.log(`Error deleting experiment ${experiment.id}:`, error));
        });
      })
      .catch((error) => console.log('Error fetching experiments:', error));
  }

  function deleteExperiment(experimentId) {
    fetch(`http://localhost:3000/newExperiment/${experimentId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          console.log(`Experiment ${experimentId} deleted successfully.`);
          // Perform any additional actions after deleting the experiment
        } else {
          console.log(`Error deleting experiment ${experimentId}.`);
        }
      })
      .catch(error => console.log(`Error deleting experiment ${experimentId}:`, error));
  }

export {addGestureEx, getAllGesturesEx, deleteAllExperiments, deleteExperiment};