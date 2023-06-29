import { useState, useEffect, useContext } from "react";
import CreateNewGesture from "../createNewGesture/createNewGesture";
import { Link, useParams } from 'react-router-dom';
import { addGestureJson, deleteGesture, getGestureById }  from "../../databases/gesturesAPI"
import { addGestureEx, getAllGesturesEx, deleteAllExperiments, deleteExperiment } from "../../databases/newExperimentAPI";
import { useNavigate } from "react-router-dom";
import LoopOfMovements from "../../components/loopOfMovements/loopOfMovements";
import { Translations } from "../../language-management/Translations";
import { LanguageContext } from "../../language-management/LanguageContext";
import {addTazNameType, deleteTazNameType, searchTazNameType, getNameAndTypeById, checkIfNameExists} from "../../databases/tazNameTypeAPI"
import "./createNewExperiment.css";


function CreateNewExperiment({id}) {
  const [isLocked, setIsLocked] = useState(false);
  const language = useContext(LanguageContext);
  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [Taz, setTaz] = useState("");
  const [type, setType] = useState("");
  const [hoveredGestureId, setHoveredGestureId] = useState(null);
  const [gestures, setGestures] = useState([]);
  const [showCreateNewGesture, setShowCreateNewGesture] = useState(false);
  const [showCreatedGestures, setShowCreatedGestures] = useState(false);

  const handleNameChange = (event) => {
    if (isLocked) return;
    setName(event.target.value);
  };

  const handleTazChange = async (event) => {
    if (isLocked) return;
    setTaz(event.target.value);
    let res = await searchTazNameType(event.target.value)
    //console.log(res)
    if (res){
      setName(res.name)
      document.getElementById('name-input').value = res.name;
      setType(res.type)
      document.getElementById('type-input').value = res.type;
      document.getElementById('name-input').disabled = true;
      document.getElementById('type-input').disabled = true; 
    } else {
      document.getElementById('name-input').disabled = false; 
      document.getElementById('type-input').disabled = false;
    }
  }

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
        setTaz(gestureToEdit.creator[2])
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
    console.log({ name, type, Taz, gestures });
    await deleteAllExperiments();
    setGestures([]);
    const TazNameType = {
      taz : Taz,
      name : name,
      type : type,
    };
    await addTazNameType(TazNameType);
    navigate("/GestureManagement");
  };

  const submitAndCreateNewGesture = async () => {
    let b = await checkIfNameExists(name, Taz)
    if(b){
      setErrorMessage('Username is already in use with another ID.');
      return;
    }
    setIsLocked(true);
    setShowCreateNewGesture(true);
  };

  const handleCloseError = () => {
    setErrorMessage('');
  };

  

  return (
    <Translations>
      {({ translate }) => (
        <div>
          <div className="row">
           {id == 0 && (<form id={isLocked ? "form2" : "form"}  onSubmit={(event)=>{event.preventDefault(); submitAndCreateNewGesture()}} className="col-3">
              {!isLocked && (
                <>
                 <label>
                    {translate('Id')}:
                    <input type="text" disabled={isLocked} value={Taz} onChange={handleTazChange} pattern="\d{9}" title="Please enter a 9-digit number" required/>
                  </label>
                  <label>
                    {translate('Name')}:
                    <input id="name-input" type="text" disabled={isLocked} value={name} onChange={handleNameChange} pattern=".{3,20}" title="Name should be 3-20 characters" required/>
                    {errorMessage && (
                      <div className="alert alert-danger d-flex align-items-center" role="alert">
                        <span>{errorMessage}</span>
                        <button type="button" className="close ml-auto" onClick={handleCloseError}>
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                    )}
                  </label>
                  <label>
                    {translate('Type')}:
                    <select id="type-input" disabled={isLocked} value={type} onChange={handleTypeChange}>
                      <option value="0">0</option>
                      <option value="1">1</option>
                    </select>
                  </label>
                  <br />
                </>
              )}
              <button type="submit" className="btn btn-primary">
                {translate('Create New Gesture')}
              </button>
              {isLocked && (<button onClick={() => {setIsLocked(false) ;handleSubmit()}}>{translate('Save Experiment')}</button>)}
            </form> )}
            <div className="col">
              <label>
                <input
                  type="checkbox"
                  checked={showCreatedGestures}
                  onChange={(event) => setShowCreatedGestures(event.target.checked)}
                />
                {id == 0 && translate("Show created Gestures")}
              </label>
              {id == 0 && showCreatedGestures && (<h2 id="GestureCreated">{translate('Gestures created')}</h2>)}
              <div className="row">
                { showCreatedGestures && gestures.map((gesture) => (
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
                  Taz={Taz}
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
