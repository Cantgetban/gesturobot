import "./gestureManagement.css";
import { Translations } from "../../language-management/Translations";
import { useNavigate } from "react-router-dom";
import GestureSection from "../../components/movment/gesturesection";

function GestureManagement() {
  return (
    <div>
      {" "}
      <div id="gestures">
        <GestureSection></GestureSection>
      </div>
      <div id="create-gesture">
        <h2>Create new gesture</h2>
        <form>
          <label for="gesture-name">Gesture name:</label>
          <input type="text" id="gesture-name" />
          <button type="submit">Create</button>
        </form>
      </div>
      <div id="edit-gesture">
        <h2>Edit gesture</h2>
        <form>
          <label for="gesture-select">Select gesture:</label>
          <select id="gesture-select">
            <option value="swipe">Swipe</option>
            <option value="tap">Tap</option>
            <option value="pinch">Pinch</option>
          </select>
          <label for="new-gesture-name">New name:</label>
          <input type="text" id="new-gesture-name" />
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}

export default GestureManagement;
