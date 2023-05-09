import React, { useState, useEffect } from "react";
import { getAllGestures } from "../../databases/gesturesAPI";
import GestureLable from "../../components/gestureLable/gestureLable";

function Tagging() {
  const [Gestures, setGestures] = useState([]);
  const [currentGestureIndex, setCurrentGestureIndex] = useState(0);

  //fetching 5 least tagged videos
  useEffect(() => {
    const fetchGestures = async () => {
      const data = await getAllGestures();
      const sortedData = data.sort((a, b) => a.labels.length - b.labels.length);
      const smallestLabels = sortedData.slice(0, 5);
      setGestures(smallestLabels);
    };

    fetchGestures();
  }, []);

  function handleNextGesture() {
    setCurrentGestureIndex(currentGestureIndex + 1);
  }

  return (
    <div>
      {Gestures.length > 0 ? (
        <GestureLable
          gesture={Gestures[currentGestureIndex]}
          clickFunction={handleNextGesture}
        ></GestureLable>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Tagging;
