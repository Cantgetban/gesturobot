import { useState, useEffect, useContext } from "react";
import CreateNewGesture from "../createNewGesture/createNewGesture";
import { Link } from 'react-router-dom';
import { addGestureJson, deleteGesture }  from "../../databases/gesturesAPI"
import { addGestureEx, getAllGesturesEx, deleteAllExperiments } from "../../databases/newExperimentAPI";
import { useNavigate } from "react-router-dom";
import LoopOfMovements from "../../components/loopOfMovements/loopOfMovements";
import { Translations } from "../../language-management/Translations";
import { LanguageContext } from "../../language-management/LanguageContext";


function CreateNewExperiment() {
  const [isLocked, setIsLocked] = useState(false);
  const language = useContext(LanguageContext)
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [gestures, setGestures] = useState([]);
  const [showCreateNewGesture, setShowCreateNewGesture] = useState(false);

  const handleNameChange = (event) => {
    if (isLocked)
      return
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
    if(isLocked)
      return;
    setType(event.target.value);
  };

  const handleGestureAdd = (newGesture) => {
    setGestures([...gestures, newGesture]);
    addGestureEx(newGesture, language)
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
    <Translations>
      {({ translate }) => (
        <div>
          <div className="row">
            <form onSubmit={() => {setIsLocked(false) ;handleSubmit()}} className="col-3">
              <label>
                {translate('Name')}:
                <input type="text" disabled={isLocked} value={name} onChange={handleNameChange} />
              </label>
              <br />
              <label>
                {translate('Type')}:
                <input type="text" disabled={isLocked} value={type} onChange={handleTypeChange} />
              </label>
              <br />
              <button type="button" onClick={() => {setIsLocked(true) ;setShowCreateNewGesture(true)}}>
                {translate('Create New Gesture')}
              </button>
              <br />
              <button type="submit">{translate('Save Experiment')}</button>
            </form>
            <div className="col">
              <h2>{translate('Gestures created')}</h2>
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
                <CreateNewGesture
                  onGestureAdd={handleGestureAdd}
                  Show={() => setShowCreateNewGesture(false)}
                  name={name}
                  type={type}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </Translations>
  );
}

export default CreateNewExperiment;

