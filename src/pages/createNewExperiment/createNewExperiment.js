import { useState, useEffect, useContext } from "react";
import CreateNewGesture from "../createNewGesture/createNewGesture";
import { Link, useParams } from 'react-router-dom';
import { addGestureJson, deleteGesture, getGestureById }  from "../../databases/gesturesAPI"
import { addGestureEx, getAllGesturesEx, deleteAllExperiments, deleteExperiment } from "../../databases/newExperimentAPI";
import { useNavigate } from "react-router-dom";
import LoopOfMovements from "../../components/loopOfMovements/loopOfMovements";
import { Translations } from "../../language-management/Translations";
import { LanguageContext } from "../../language-management/LanguageContext";
import "./createNewExperiment.css";


function CreateNewExperiment({id}) {
  const [isLocked, setIsLocked] = useState(false);
  const language = useContext(LanguageContext);
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [hoveredGestureId, setHoveredGestureId] = useState(null);
  const [gestures, setGestures] = useState([]);
  const [showCreateNewGesture, setShowCreateNewGesture] = useState(false);

  const handleNameChange = (event) => {
    if (isLocked) return;
    setName(event.target.value);
  };

  const handleDeleteGesture = async (gestureId) => {
    console.log(gestureId);
    await deleteExperiment(gestureId);
    // Find the newId field for the gesture with the given gestureId
    const gestureToDelete = gestures.find((gesture) => gesture.id === gestureId);
    const id = gestureToDelete ? gestureToDelete.newId : null;
    await deleteGesture(id);
    setGestures(gestures.filter((gesture) => gesture.id !== gestureId));
  };

  var gestureToEdit = null

  useEffect(() => {
    deleteAllExperiments()
    const fetchGesturesEx = async () => {
      const data = await getAllGesturesEx();
      setGestures(data);
    };
    const edit = async () => {
      console.log(id);
      // if id = 0 we are create a new experiment, id the id != 0 we edit an exist gesture
      if(id){
        gestureToEdit = await getGestureById(id)
        console.log("here" + id)
        setShowCreateNewGesture(true)
        setIsLocked(true)
        setName(gestureToEdit.creator[0])
        setType(gestureToEdit.creator[1])
        console.log(gestureToEdit)
      }
    };

    fetchGesturesEx();
    edit();
  }, []);

 

  const handleTypeChange = (event) => {
    if (isLocked) return;
    setType(event.target.value);
  };

  const handleGestureAdd = (newGesture, newId) => {
    // Add the newId field to newGesture
    const gestureWithId = { ...newGesture, newId: newId };
    // Update the gestures state with the new gesture
    // Call the addGestureEx function with the new gesture and language
    addGestureEx(newGesture)
      .then((newId) => {
        const gestureWithId2 = {...gestureWithId, id: newId};
        setGestures([...gestures, gestureWithId2]);
      })
 
  };

  const handleSubmit = async () => {
    // TODO: Submit the form and create a new experiment with the given name, type, and gestures
    console.log({ name, type, gestures });
    await deleteAllExperiments();
    setGestures([]);
    navigate("/GestureManagement");
  };

  return (
    <Translations>
      {({ translate }) => (
        <div>
          <div className="row">
           {id == 0 && (<form id={isLocked ? "form2" : "form"} onSubmit={() => {setIsLocked(false) ;handleSubmit()}} className="col-3">
              {!isLocked && (
                <>
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
                </>
              )}
              <button type="button" onClick={() => {setIsLocked(true) ;setShowCreateNewGesture(true)}}>
                {translate('Create New Gesture')}
              </button>
              <br />
              <button type="submit">{translate('Save Experiment')}</button>
            </form> )}
            <div className="col">
              {id == 0 && (<h2 id="GestureCreated">{translate('Gestures created')}</h2>)}
              <div className="row">
                {gestures.map((gesture) => (
                  <div
                    className="col-lg-4 col-sm-6 col-12 mb-4"
                    key={gesture.id}
                    onMouseEnter={() => setHoveredGestureId(gesture.id)}
                    onMouseLeave={() => setHoveredGestureId(null)}
                  >
                    <div className="card">
                      <div className="delete-gesture-wrapper">
                        {hoveredGestureId === gesture.id && (
                          <span
                            className="delete-gesture"
                            onClick={() => handleDeleteGesture(gesture.id)}
                          >
                            &#10006; {/* Delete icon */}
                          </span>
                        )}
                      </div>
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
          </div>
          <div className="row">
            {showCreateNewGesture && (
              <div className="overlay">
                <CreateNewGesture
                  onGestureAdd={handleGestureAdd}
                  Show={() => setShowCreateNewGesture(false)}
                  name={name}
                  type={type}
                  gesture={id}
                  CreateNewGesture = {showCreateNewGesture}
                  handleSubmit = {handleSubmit}
                  setGestures = {setGestures}
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
