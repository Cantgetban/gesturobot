import React, { useState, useEffect } from "react";
import { getAllGestures } from "../../databases/gesturesAPI";
import GestureLable from "../../components/gestureLable/gestureLable";
import { useNavigate } from "react-router-dom";
import { Translations } from "../../language-management/Translations";
import { editGesture } from "../../databases/gesturesAPI";

function Tagging() {
  const [Gestures, setGestures] = useState([]);
  const [currentGestureIndex, setCurrentGestureIndex] = useState(0);
  var counter = 0;
  let navigate = useNavigate();
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

  const HandleNextGesture = (event) => {
    //update new label
    var label = event.target.textContent;
    var gestureID = Gestures[currentGestureIndex].id;
    var updatedGesture = Gestures[currentGestureIndex];
    updatedGesture.labels.push(label);
    editGesture(gestureID, updatedGesture);

    //get new gesture
    if (currentGestureIndex > 3) {
      navigate("/LabelFeedBack");
    }
    setCurrentGestureIndex(currentGestureIndex + 1);
  };

  return (
    <Translations>
      {({ translate }) => (
        <div>
          {Gestures.length > 0 ? (
            <GestureLable
              gesture={Gestures[currentGestureIndex]}
              clickFunction={HandleNextGesture}
            />
          ) : (
            <p>{translate("Loading...")}</p>
          )}
        </div>
      )}
    </Translations>
  );
}

export default Tagging;
