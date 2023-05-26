import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import addTaggerJson from "../../databases/taggersAPI";
import "./demographicForm.css";
import { Translations } from "../../language-management/Translations";

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
    <Translations>
      {({ translate }) => (
        <>
          <form className="demographic-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">{translate('Name')}:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="age">{translate('Age')}:</label>
              <input
                type="number"
                id="age"
                value={age}
                onChange={(event) => setAge(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender">{translate('Gender')}:</label>
              <select
                id="gender"
                value={gender}
                onChange={(event) => setGender(event.target.value)}
              >
                <option value="">{translate('Select gender')}</option>
                <option value="male">{translate('Male')}</option>
                <option value="female">{translate('Female')}</option>
                <option value="other">{translate('Other')}</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="education">{translate('Education')}:</label>
              <select
                type="text"
                id="education"
                value={education}
                onChange={(event) => setEducation(event.target.value)}
              >
                <option value="" disabled>
                  {translate('-- select one --')}
                </option>
                <option value={translate('No formal education')}>
                  {translate('No formal education')}
                </option>
                <option value={translate('Primary education')}>
                  {translate('Primary education')}
                </option>
                <option value={translate('Secondary education')}>
                  {translate('Secondary education or high school')}
                </option>
                <option value={translate('GED')}>{translate('GED')}</option>
                <option value={translate('Vocational qualification')}>
                  {translate('Vocational qualification')}
                </option>
                <option value={translate("Bachelor's degree")}>
                  {translate("Bachelor's degree")}
                </option>
                <option value={translate("Master's degree")}>
                  {translate("Master's degree")}
                </option>
                <option value={translate('Doctorate or higher')}>
                  {translate('Doctorate or higher')}
                </option>
              </select>
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <button type="submit">{translate('Submit')}</button>
          </form>
        </>
      )}
    </Translations>
  );
}

export default DemographicForm;
