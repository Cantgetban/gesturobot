import "./gestureManagement.css";
import { Translations } from "../../language-management/Translations";
import { useNavigate } from "react-router-dom";
import GestureSection from "../../components/gesturesection/gesturesection";

function GestureManagement() {
  let navigate = useNavigate();

  const moveToViewGestures = () => {
    navigate("/GestureDisplay");
  };

  const moveToMovmentLibrary = () => {
    navigate("/MovementLib");
  };
  return (
    <Translations>
      {({ translate }) => (
        <div>
          <img src="/logo3.png" class="logo-image" alt="GestuRobot logo"></img>
          <div class="container">
            <div class="card1" onClick={moveToViewGestures}>
              <div class="face face1">
                <div>
                  <b>{translate("View all gestures")}</b>
                </div>
                <div class="face face2">
                  <h2>{translate("View all gestures")}</h2>
                </div>
              </div>
            </div>
            <div class="card1" onClick={moveToMovmentLibrary}>
              <div class="face face1">
                <div>
                  <b>{translate("Start new experiment")}</b>
                </div>
                <div class="face face2">
                  <h2>{translate("Start new experiment")}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Translations>
  );
}

export default GestureManagement;
