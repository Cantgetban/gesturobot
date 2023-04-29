import { useState, useEffect, useRef } from 'react';
import "./gesturesection.css";
import { getAllGestures } from "../../databases/gesturesAPI";
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

  const handleButtonClick = () => {
    videoRef.current.play();
  };

  const filteredGestures = gestures.filter(gesture => {
    if (props.filterBy === 'name') {
      return gesture.creator[0].toLowerCase().includes(props.value.toLowerCase());
    } else if (props.filterBy === 'emotion') {
      return gesture.realLabel.toLowerCase().includes(props.value.toLowerCase());
    } else if (props.filterBy === 'type') {
      return gesture.creator[1].toLowerCase().includes(props.value.toLowerCase());
    } else if (props.filterBy === 'date') {
      return gesture.date.toLowerCase().includes(props.value.toLowerCase());
    }
    return true;
  });

  return (
    <>
      <div class="gif-display">
        {filteredGestures.map((gesture) => (
          <div className="p-1" key={gesture.id}>
            <div
              className="card"
              style={{ width: "18rem"}}
            >
              <span className="embed-responsive embed-responsive-16by9">
                <video
                  title={gesture.name}
                  className="embed-responsive-item"
                  controls
                />
              </span>
              <div className="card-body">
                <h5 className="card-title">{gesture.name}</h5>
                <p className="card-text">{gesture.creator[0]}</p>
                {(
                  <button className="btn btn-primary" onClick={handleButtonClick}>
                    Start Gesture
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
export default GestureSection;
