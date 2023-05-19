import { useState, useEffect } from "react";
import CreateNewGesture from "../createNewGesture/createNewGesture";
import { Link } from 'react-router-dom';
import { addGestureJson, deleteGesture }  from "../../databases/gesturesAPI"
import { addGestureEx, getAllGesturesEx, deleteAllExperiments } from "../../databases/newExperimentAPI";
import { useNavigate } from "react-router-dom";
import LoopOfMovements from "../../components/loopOfMovements/loopOfMovements";

function CreateNewExperiment() {
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [gestures, setGestures] = useState([]);
  const [showCreateNewGesture, setShowCreateNewGesture] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  useEffect(() => {
    const fetchGesturesEx = async () => {
      const data = await getAllGesturesEx();
      setGestures(data);
    };
    fetchGesturesEx();
  }, []);

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleGestureAdd = (newGesture) => {
    setGestures([...gestures, newGesture]);
    addGestureEx(newGesture)
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Submit the form and create a new experiment with the given name, type, and gestures
    console.log({ name, type, gestures });
    deleteAllExperiments()
    setGestures([]);
    navigate("/GestureManagement")
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
        {/* {gestures.map((gesture, index) => (
          <div key={index}>
            <p>{gesture.name}</p>
            <p>{gesture.movements}</p>
            <p>{gesture.realLabel}</p>
          </div>
        ))} */}
        {gestures.map((gesture, index) => (
        <div className="col-lg-4 col-sm-6 col-12 mb-4" key={index}>
          <div className="card">
            <div className="card-video">
              <LoopOfMovements ids={gesture.movements} />
            </div>
            <div className="card-body">
              <h5 className="card-title">{gesture.name}</h5>
              <p className="card-text">{gesture.creator[0]}</p>
            </div>
          </div>
        </div>
      ))}
      </div>
      </div>
      <div className="row">
      {showCreateNewGesture && (
        <div className="overlay">
          <CreateNewGesture onGestureAdd={handleGestureAdd} Show={() => setShowCreateNewGesture(false)} name={name} type={type}/>
        </div>
      )}
      </div>
    </div>
  );
}

export default CreateNewExperiment;

