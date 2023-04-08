import "./GestureDisplay.css";
import GestureSection from "../../components/gesturesection/gesturesection";
function GestureDisplay() {
  return (
    <>
      <form className="form-container">
        <label for="gesture-select">Filter by:</label>
        <select id="gesture-select">
          <option value="name">Name</option>
          <option value="emotion">Emotion</option>
          <option value="type">Type</option>
          <option value="date">Date</option>
        </select>
        <input type="text" id="new-gesture-name" />
        <button type="submit">Filter</button>
      </form>
      <GestureSection></GestureSection>
    </>
  );
}

export default GestureDisplay;
