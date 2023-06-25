import "./GestureDisplay.css";
import GestureSection from "../../components/gesturesection/gesturesection";
import { getAllGestures } from "../../databases/gesturesAPI";
import { useState } from 'react';
import { Translations } from "../../language-management/Translations";

function GestureDisplay({setGestureID}) {
  const [filterBy, setFilterBy] = useState('name');
  const [inputValue, setInputValue] = useState('');

  const handleSelectChange = (event) => {
    setFilterBy(event.target.value);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }

  return (
    <Translations>
    {({ translate }) => (
      <div>
        <form className="form-container">
          <label htmlFor="gesture-select">{translate('Filter by:')}</label>
          <select id="gesture-select" className="mb-2" onChange={handleSelectChange}>
            <option value="name">{translate('Name')}</option>
            <option value="emotion">{translate('Emotion')}</option>
            <option value="type">{translate('Type')}</option>
            {/* <option value="date">{translate('Date')}</option> */}
          </select>
          <input
            type="text"
            id="new-gesture-name"
            placeholder={translate('Write your filter..')}
            value={inputValue}
            onChange={handleInputChange}
          />
        </form>
        <GestureSection filterBy={filterBy} value={inputValue} setGestureID={setGestureID} />
      </div>
    )}
  </Translations>
  );
}

export default GestureDisplay;
