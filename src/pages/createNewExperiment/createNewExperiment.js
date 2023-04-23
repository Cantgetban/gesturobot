import { useState } from "react";
import CreateNewGesture from "../createNewGesture/createNewGesture";
import { Link } from 'react-router-dom';


function CreateNewExperiment() {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [gestures, setGestures] = useState([]);
  const [showCreateNewGesture, setShowCreateNewGesture] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleGestureAdd = (newGesture) => {
    setGestures([...gestures, newGesture]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Submit the form and create a new experiment with the given name, type, and gestures
    console.log({ name, type, gestures });
  };

  return (
    <div>
        <div className="row">
      <form onSubmit={handleSubmit} className="col-3">
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <br />
        <label>
          Type:
          <input type="text" value={type} onChange={handleTypeChange} />
        </label>
        <br />
        <button type="button" onClick={() => setShowCreateNewGesture(true)}>
          Create New Gesture
        </button>
        <br />
        <button type="submit">Save Experiment</button>
      </form>
      <div className="col">
        <h2>Gestures created</h2>
        {gestures.map((gesture, index) => (
          <div key={index}>
            <p>{gesture.name}</p>
            <p>{gesture.movements}</p>
            <p>{gesture.realLabel}</p>
          </div>
        ))}
      </div>
      </div>
      <div className="row">
      {showCreateNewGesture && (
        <div className="overlay">
          <CreateNewGesture onGestureAdd={handleGestureAdd} Show={() => setShowCreateNewGesture(false)}/>
        </div>
      )}
      </div>
    </div>
  );
}

export default CreateNewExperiment;

