
import { Translations } from "../language-management/Translations.js";
import {useNavigate} from 'react-router-dom';

function MainPage() {

  let navigate = useNavigate();

  const moveToGestureManagement = () => {
    navigate('/GestureManagement');
  }

  const moveToMovmentLibrary = () => {
    navigate('/MovementLib');
  }

  const moveToGestureLabeling = () => {
    navigate('/GestureTag');
  }

  return (
     <Translations>
      {({ translate }) => (
        <div>
          <h1>{translate("Welcome to my landing page")}</h1>
          <div className="row" style={{ height: "50vh" }}>
            <div className="col-md-4">
              <div className="card bg-primary h-100">
                <div className="card-body d-flex align-items-center justify-content-center">
                  <button onClick={moveToGestureManagement} className="btn btn-light btn-block">{translate("Gesture Management")}</button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-secondary h-100">
                <div className="card-body d-flex align-items-center justify-content-center">
                  <button onClick={moveToMovmentLibrary} className="btn btn-light btn-block">{translate("Movement Library")}</button>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card bg-danger h-100">
                <div className="card-body d-flex align-items-center justify-content-center">
                  <button onClick={moveToGestureLabeling} className="btn btn-light btn-block">{translate("Gesture Labeling")}</button>
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
