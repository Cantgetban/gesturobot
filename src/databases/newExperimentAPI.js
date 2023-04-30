function addGestureEx(newGesture) {
    // get the current maximum ID
    fetch("http://localhost:3000/newExperiment")
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        const maxId = data ? Math.max(...data.map((gesture) => gesture.id)) : 0;
        // add 1 to the maximum ID to get the next ID for the new gesture
        const nextId = maxId + 1;
        
        // add the new gesture with the next ID
        fetch("http://localhost:3000/newExperiment", {
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

  function getAllGesturesEx() {
    return fetch("http://localhost:3000/newExperiment")
      .then((response) => response.json())
      .catch((error) => console.log("Error fetching gestures:", error));
  }

  function deleteAllExperiments() {
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

export {addGestureEx, getAllGesturesEx, deleteAllExperiments};