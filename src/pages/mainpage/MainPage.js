
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
          <div className="row">
            <button onClick={moveToGestureManagement} className="btn btn-primary">{translate("Gesture Management")}</button>
            <button onClick={moveToMovmentLibrary} className="btn btn-secondary">{translate("Movment Library")}</button>
            <button onClick={moveToGestureLabeling} className="btn btn-danger">{translate("Gesture Labeling")}</button>
          </div>
        </div>
      )}
    </Translations>
  );
}

export default MainPage;
