import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Translations } from "../../language-management/Translations";
function Popup({ onClose }) {
  const handleButtonClick = () => {
    var feedback = document.getElementById("message").value;
    onClose();
  };

  return (
    <Translations>
      {({ translate }) => (
        <div className="popup">
          <div className="popup__content">
            <form id="feedback-form">
              <div>
                <h2>{translate('Feedback')}</h2>
                <textarea id="message" required></textarea>
              </div>
              <button type="submit" onClick={handleButtonClick}>
                {translate('Submit')}
              </button>
            </form>
          </div>
        </div>
      )}
    </Translations>
  );
}

function Labelfeedback() {
  const [showPopup, setShowPopup] = useState(true);
  const [showContent, setShowContent] = useState(false);
  var navigate = useNavigate();
  const handleClosePopup = () => {
    setShowPopup(false);
    setShowContent(true);
  };
  function handleClick() {
    navigate("/");
  }
  return (
    <Translations>
      {({ translate }) => (
        <>
          {showPopup && <Popup onClose={handleClosePopup} />}
          {showContent && (
            <div className="container">
              <h1>{translate('Thank you!')}</h1>
              <button onClick={handleClick}>{translate('Back to Main Page')}</button>
            </div>
          )}
        </>
      )}
    </Translations>
  );
}

export default Labelfeedback;
