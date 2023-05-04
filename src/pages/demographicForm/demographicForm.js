import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import addTaggerJson from "../../databases/taggersAPI";
import "./demographicForm.css";

function DemographicForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [education, setEducation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  let navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !age || !gender || !education) {
      setErrorMessage(
        "Not all the fields filled. Please make sure that you didnt left an empty field."
      );
      return;
    }
    const newTagger = {
      name: { name },
      age: { age },
      gender: { gender },
      education: { education },
    };
    addTaggerJson(newTagger);
    navigate("/TagInstructions");
  };

  return (
    <>
      <img src="/logo3.png" class="logo-image" alt="GestuRobot logo"></img>
      <form className="demographic-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(event) => setAge(event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            value={gender}
            onChange={(event) => setGender(event.target.value)}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="education">Education:</label>
          <select
            type="text"
            id="education"
            value={education}
            onChange={(event) => setEducation(event.target.value)}
          >
            <option value="" selected="selected" disabled="disabled">
              -- select one --
            </option>
            <option value="No formal education">No formal education</option>
            <option value="Primary education">Primary education</option>
            <option value="Secondary education">
              Secondary education or high school
            </option>
            <option value="GED">GED</option>
            <option value="Vocational qualification">
              Vocational qualification
            </option>
            <option value="Bachelor's degree">Bachelor's degree</option>
            <option value="Master's degree">Master's degree</option>
            <option value="Doctorate or higher">Doctorate or higher</option>
          </select>
        </div>
        {errorMessage && <div class="error-message">{errorMessage}</div>}
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default DemographicForm;
