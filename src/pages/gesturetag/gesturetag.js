import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./gesturetag.css";

function GestureTag() {
  const [isAgreed, setIsAgreed] = useState(false);
  let navigate = useNavigate();
  const handleCheckboxChange = (event) => {
    setIsAgreed(event.target.checked);
  };
  const handleConfirmClick = () => {
    navigate("/DemographicForm");
  };
  return (
    <div>
      <div class="container">
        <h1>Participation Confirmation</h1>
        <p>
          Please confirm your participation by checking the box below and
          agreeing to the terms and conditions:
        </p>
        <label for="agree">
          I agree to the terms and conditions.
          <input
            type="checkbox"
            id="agree"
            name="agree"
            checked={isAgreed}
            onChange={handleCheckboxChange}
          ></input>
        </label>
        <button
          id="confirm-btn"
          onClick={handleConfirmClick}
          disabled={!isAgreed}
        >
          Confirm Participation
        </button>
      </div>
    </div>
  );
}

export default GestureTag;
