import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./gesturetag.css";
import { Translations } from "../../../src/language-management/Translations.js"

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
    <Translations>
      {({ translate }) => (
        <div>
          <div className="container">
            <h1>{translate('Participation Confirmation')}</h1>
            <p>
              {translate('Please confirm your participation by checking the box below and agreeing to the terms and conditions:')}
            </p>
            <label htmlFor="agree">
              {translate('I agree to the terms and conditions.')}
              <input
                type="checkbox"
                id="agree"
                name="agree"
                checked={isAgreed}
                onChange={handleCheckboxChange}
              />
            </label>
            <button
              id="confirm-btn"
              onClick={handleConfirmClick}
              disabled={!isAgreed}
            >
              {translate('Confirm Participation')}
            </button>
          </div>
        </div>
      )}
    </Translations>
  );
}

export default GestureTag;
