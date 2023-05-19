import { useState, useEffect, useRef } from 'react';
import "./gesturesection.css";
import { getAllGestures } from "../../databases/gesturesAPI";
import LoopOfMovements from '../loopOfMovements/loopOfMovements';
function GestureSection(props) {

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
      return gesture.realLabel.toLowerCase().includes(props.value.toLowerCase());
    } else if (props.filterBy === 'type') {
      const type = gesture.creator[1] === 0 ? "0" : "1";
      return type.includes(props.value.toLowerCase());
    } else if (props.filterBy === 'date') {
      return gesture.date.toLowerCase().includes(props.value.toLowerCase());
    }
    return true;
  });

  return (
    <>
        {filteredGestures.map((gesture) => (
          <div className="p-1" key={gesture.id}>
            <div
              className="card col-3"
            >
              <span className="embed-responsive embed-responsive-16by9">
              <LoopOfMovements ids={gesture.movements}/>
              </span>
              <div className="card-body">
                <h5 className="card-title">{gesture.name}</h5>
                <p className="card-text">{gesture.creator[0]}</p>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
export default GestureSection;
