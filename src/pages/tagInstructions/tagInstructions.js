import "./tagInstructions.css";
import { useState, useEffect } from "react";
import { getAllGestures } from "../../databases/gesturesAPI";
import GestureLable from "../../components/gestureLable/gestureLable";

function Popup({ onClose }) {
  const handleButtonClick = () => {
    onClose();
  };

  return (
    <div className="popup">
      <div className="popup__content">
        <h2 className="popup__title">Instructions for Labeling</h2>
        <p className="popup__text">
          You will see robot gestures and you need to give one emotion from the
          5 given emotions that describe the best emotion from the gesture
        </p>
        <button className="popup__button" onClick={handleButtonClick}>
          I understand
        </button>
      </div>
    </div>
  );
}

function TagInstructions() {
  const [showPopup, setShowPopup] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [exampleGesture, setExampleGesture] = useState([]);

  const handleClosePopup = () => {
    setShowPopup(false);
    setShowContent(true);
  };

  useEffect(() => {
    const fetchGestures = async () => {
      const data = await getAllGestures();
      setExampleGesture(data[0]);
    };

    fetchGestures();
  }, []);

  return (
    <>
      {showPopup && <Popup onClose={handleClosePopup} />}
      {showContent && <GestureLable gesture={exampleGesture}></GestureLable>}
    </>
  );
}

export default TagInstructions;
