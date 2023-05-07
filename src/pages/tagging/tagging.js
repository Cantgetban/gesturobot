import React, { useState, useEffect } from "react";
import { getAllGestures } from "../../databases/gesturesAPI";
import GestureLable from "../../components/gestureLable/gestureLable";

function Tagging() {
  const [Gestures, setGestures] = useState([]);

  //fetching 5 least tagged videos
  async function fetchGestures() {
    const data = await getAllGestures();
    console.log(data);
    const sortedData = data.sort((a, b) => a.labels.length - b.labels.length);
    const smallestLabels = sortedData.slice(0, 5);
    setGestures(smallestLabels);
  }
  fetchGestures();

  const [activeIndex, setActiveIndex] = useState(0);
  const handleNextClick = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % Gestures.length);
  };
  const activeView = Gestures[activeIndex];
  return (
    <>
      <GestureLable
        gesture={activeView}
        clickFunction={handleNextClick}
      ></GestureLable>
    </>
  );
}

export default Tagging;
