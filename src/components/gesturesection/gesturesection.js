import React, { useState, useEffect, useRef, useContext } from 'react';
import './gesturesection.css';
import { getAllGestures, deleteGesture } from '../../databases/gesturesAPI';
import LoopOfMovements from '../loopOfMovements/loopOfMovements';
import { LanguageContext } from '../../language-management/LanguageContext';
import { useNavigate } from "react-router-dom";
import CreateNewExperiment from '../../pages/createNewExperiment/createNewExperiment';

function GestureSection(props) {
  let navigate = useNavigate();
  const language = useContext(LanguageContext);
  const [gestures, setGestures] = useState([]);
  const [hoveredGestureId, setHoveredGestureId] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchGestures = async () => {
      const data = await getAllGestures();
      setGestures(data);
    };

    fetchGestures();
  }, []);

  const handleDeleteGesture = async (gestureId) => {
    await deleteGesture(gestureId);
    setGestures(gestures.filter(gesture => gesture.id !== gestureId));
  };

  const hangleEditGesture = (gestureId) => {
    props.setGestureID(gestureId)
    navigate("/CreateNewExperiment");
  };

  const filteredGestures =  gestures.filter(gesture => {
    console.log(language.language)
    const temp = language.language === 'en' ? gesture.realLabel[0] : gesture.realLabel[1];
    const type = gesture.creator[1] === 0 ? '0' : '1';
    return gesture.creator[0].toLowerCase().includes(props.name.toLowerCase()) &&
           temp.toLowerCase().includes(props.emotion.toLowerCase()) &&
           type.includes(props.type.toLowerCase()) &&
           gesture.creator[2].toLowerCase().includes(props.Taz.toLowerCase());
  });

  return (
    <div className="row">
      {filteredGestures.map(gesture => (
        <div
          className="col-lg-4 col-sm-6 col-12 mb-4"
          key={gesture.id}
          onMouseEnter={() => setHoveredGestureId(gesture.id)}
          onMouseLeave={() => setHoveredGestureId(null)}
        >
          <div className="card">
            {hoveredGestureId === gesture.id && (
              <div className="icon-container">
              <div className="delete-gesture" onClick={() => handleDeleteGesture(gesture.id)}>
                &#10006; {/* Delete icon */}
              </div>
              <div className="edit-gesture" onClick={()=> hangleEditGesture(gesture.id)}>
              {String.fromCharCode(9998)} {/* edit icon */} 
              </div>
              </div>
            )}
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
  );
}

export default GestureSection;
