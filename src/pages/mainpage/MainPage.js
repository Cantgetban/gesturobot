import { Translations } from "../../language-management/Translations";
import { useNavigate } from "react-router-dom";
import "./mainpage.css";

function MainPage() {
  let navigate = useNavigate();

  const moveToGestureManagement = () => {
    navigate("/UserLogin");
  };

  const moveToMovmentLibrary = () => {
    navigate("/MovementsLib");
  };

  const moveToGestureLabeling = () => {
    navigate("/GestureTag");
  };

  return (
    <Translations>
      {({ translate }) => (
        <div>
          <div class="container">
            <div class="card1" onClick={moveToGestureManagement}>
              <div class="face face1">
                <div>
                  <b>{translate("Gesture management description")}</b>
                </div>
                <div class="face face2">
                  <h2>{translate("Gesture Management")}</h2>
                </div>
              </div>
            </div>
            <div class="card1" onClick={moveToMovmentLibrary}>
              <div class="face face1">
                <div>
                  <b>{translate("Movement lib description")}</b>
                </div>
                <div class="face face2">
                  <h2>{translate("Movement Library")}</h2>
                </div>
              </div>
            </div>
            <div class="card1" onClick={moveToGestureLabeling}>
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
