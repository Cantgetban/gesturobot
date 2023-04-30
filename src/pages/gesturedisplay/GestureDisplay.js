import "./GestureDisplay.css";
import GestureSection from "../../components/gesturesection/gesturesection";
import { getAllGestures } from "../../databases/gesturesAPI";
import { useState } from 'react';

function GestureDisplay() {
  const [filterBy, setFilterBy] = useState('name');
  const [inputValue, setInputValue] = useState('');

  const handleSelectChange = (event) => {
    setFilterBy(event.target.value);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }

  return (
    <>
      <form className="form-container">
        <label htmlFor="gesture-select">Filter by:</label>
        <select id="gesture-select" onChange={handleSelectChange}>
          <option value="name">Name</option>
          <option value="emotion">Emotion</option>
          <option value="type">Type</option>
          <option value="date">Date</option>
        </select>
        <input type="text" id="new-gesture-name" value={inputValue} onChange={handleInputChange} />
      </form>
      <GestureSection filterBy={filterBy} value={inputValue} />
    </>
  );
}

export default GestureDisplay;
