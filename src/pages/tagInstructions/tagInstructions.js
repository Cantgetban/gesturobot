import "./tagInstructions.css";
import { useState, useEffect } from "react";
import { getAllGestures } from "../../databases/gesturesAPI";
import GestureLable from "../../components/gestureLable/gestureLable";
import { useNavigate } from "react-router-dom";
import { Translations } from "../../language-management/Translations";

function Popup({ onClose }) {
  const handleButtonClick = () => {
    onClose();
  };

  return (
    <Translations>
      {({ translate }) => (
        <div className="popup">
          <div className="popup__content">
            <h2 className="popup__title">
              {translate("Instructions for Labeling")}
            </h2>
            <p className="popup__text">
              {translate(
                "You will see robot gestures and you need to give one emotion from the 5 given emotions that describe the best emotion from the gesture"
              )}
            </p>
            <button className="popup__button" onClick={handleButtonClick}>
              {translate("I understand")}
            </button>
          </div>
        </div>
      )}
    </Translations>
  );
}

function TagInstructions() {
  const [showPopup, setShowPopup] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [exampleGesture, setExampleGesture] = useState([]);
  let navigate = useNavigate();

  function PopupAfterClick() {
    const result = window.confirm(
      "That was great! Are you ready to move on and tag real gestures?"
    );
    if (result) {
      navigate("/Tagging");
    }
  }

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
      {showContent && (
        <GestureLable
          gesture={exampleGesture}
          clickFunction={PopupAfterClick}
        ></GestureLable>
      )}
    </>
  );
}

export default TagInstructions;
