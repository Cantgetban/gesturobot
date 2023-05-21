import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Popup({ onClose }) {
  const handleButtonClick = () => {
    var feedback = document.getElementById("message").value;
    onClose();
  };

  return (
    <div className="popup">
      <div className="popup__content">
        <form id="feedback-form">
          <div>
            <h2>Feedback</h2>
            <textarea id="message" required></textarea>
          </div>
          <button type="submit" onClick={handleButtonClick}>
            Submit
          </button>
        </form>
      </div>
    </div>
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
    <>
      {showPopup && <Popup onClose={handleClosePopup} />}
      {showContent && (
        <div class="container">
          <h1>Thank you!</h1>
          <button onClick={handleClick}>Back to Main Page</button>
        </div>
      )}
    </>
  );
}

export default Labelfeedback;
