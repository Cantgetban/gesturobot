import { Translations } from "../language-management/Translations.js";
import { useNavigate } from "react-router-dom";
import "./mainpage.css";

function MainPage() {
  let navigate = useNavigate();

  const moveToGestureManagement = () => {
    navigate("/GestureManagement");
  };

  const moveToMovmentLibrary = () => {
    navigate("/MovementLib");
  };

  const moveToGestureLabeling = () => {
    navigate("/GestureTag");
  };

  return (
    <Translations>
      {({ translate }) => (
        <div>
          <img src="/logo2.png" class="logo-image" alt="GestuRobot logo"></img>
          <div class="container">
            <div class="card" onClick={moveToGestureManagement}>
              <div class="face face1">
                <div>
                  <b>{translate("Gesture management description")}</b>
                </div>
                <div class="face face2">
                  <h2>{translate("Gesture Management")}</h2>
                </div>
              </div>
            </div>
            <div class="card" onClick={moveToMovmentLibrary}>
              <div class="face face1">
                <div>
                  <b>{translate("Movement lib description")}</b>
                </div>
                <div class="face face2">
                  <h2>{translate("Movement Library")}</h2>
                </div>
              </div>
            </div>
            <div class="card" onClick={moveToGestureLabeling}>
              <div class="face face1">
                <div>
                  <b>{translate("Gesture taging description")}</b>
                </div>
                <div class="face face2">
                  <h2>{translate("Gesture Labeling")}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Translations>
  );
}

export default MainPage;
