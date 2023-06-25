import "./GestureDisplay.css";
import GestureSection from "../../components/gesturesection/gesturesection";
import { getAllGestures } from "../../databases/gesturesAPI";
import { useState } from 'react';
import { Translations } from "../../language-management/Translations";

function GestureDisplay({setGestureID}) {
  const [filterName, setFilterName] = useState('');
  const [filterTaz, setFilterTaz] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterEmotion, setFilterEmotion] = useState('');

  const handleNameChange = (event) => {
    setFilterName(event.target.value);
  }

  const handleTazChange = (event) => {
    setFilterTaz(event.target.value);
  }

  const handleTypeChange = (event) => {
    setFilterType(event.target.value);
  }

  const handleEmotionChange = (event) => {
    setFilterEmotion(event.target.value);
  }

  return (
    <Translations>
    {({ translate }) => (
      <div>
        <form className="form-container">
          <label htmlFor="gesture-select">{translate('Filter by:')}</label>
          <div style={{ display: 'flex' }}>
  <div style={{ marginRight: '10px' }}>
    <label htmlFor="new-gesture-name-1">{translate("Name")}</label>
    <input
      type="text"
      id="new-gesture-name-1"
      placeholder={translate('name')}
      value={filterName}
      onChange={handleNameChange}
    />
  </div>

  <div style={{ marginRight: '10px' }}>
    <label htmlFor="new-gesture-name-2">{translate("Id")}</label>
    <input
      type="text"
      id="new-gesture-name-2"
      placeholder={translate('id')}
      value={filterTaz}
      onChange={handleTazChange}
    />
  </div>

              <div style={{ marginRight: '10px' }}>
                <label htmlFor="new-gesture-name-3">{translate("Type")}</label>
                <select
                  id="new-gesture-name-3"
                  value={filterType}
                  onChange={handleTypeChange}
                >
                  <option value=""> All types </option>
                  <option value="0">0</option>
                  <option value="1">1</option>
                </select>
              </div>

  <div style={{ marginRight: '10px' }}>
    <label htmlFor="new-gesture-name-4">{translate("Emotion")}</label>
    <input
      type="text"
      id="new-gesture-name-4"
      placeholder={translate('emotion')}
      value={filterEmotion}
      onChange={handleEmotionChange}
    />
  </div>
</div>
        </form>
        <GestureSection name={filterName} type={filterType} Taz={filterTaz} emotion={filterEmotion} setGestureID={setGestureID}/>
      </div>
    )}
  </Translations>
  );
}

export default GestureDisplay;
