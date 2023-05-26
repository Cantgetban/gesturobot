import React, { useState, useEffect, useRef, useContext} from 'react';
import "./gesturesection.css";
import { getAllGestures } from "../../databases/gesturesAPI";
import LoopOfMovements from '../loopOfMovements/loopOfMovements';
import { LanguageContext } from '../../language-management/LanguageContext';


function GestureSection(props) {
  const language = useContext(LanguageContext);
  const [gestures, setGestures] = useState([]);
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchGestures = async () => {
      const data = await getAllGestures();
      setGestures(data);
    };

    fetchGestures();
  }, []);

  const filteredGestures = gestures.filter(gesture => {
    if (props.filterBy === 'name') {
      return gesture.creator[0].toLowerCase().includes(props.value.toLowerCase());
    } else if (props.filterBy === 'emotion') {
      const temp = language == 'en' ? gesture.realLabel.en : gesture.realLabel.he;
      return temp.toLowerCase().includes(props.value.toLowerCase());
    } else if (props.filterBy === 'type') {
      const type = gesture.creator[1] === 0 ? "0" : "1";
      return type.includes(props.value.toLowerCase());
    } else if (props.filterBy === 'date') {
      return gesture.date.toLowerCase().includes(props.value.toLowerCase());
    }
    return true;
  });

  return (
    <div className="row">
      {filteredGestures.map((gesture) => (
        <div className="col-lg-4 col-sm-6 col-12 mb-4" key={gesture.id}>
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
  );
}

export default GestureSection;
