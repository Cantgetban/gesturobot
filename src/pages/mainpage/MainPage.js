
import { Translations } from "../language-management/Translations.js";

function MainPage() {
  return (
    <Translations>
      {({ translate }) => (
        <div>
          <h1>{translate("Welcome to my landing page")}</h1>
          <div className="row">
            <button className="btn btn-primary">{translate("Gesture Management")}</button>
            <button className="btn btn-secondary">{translate("Movment Library")}</button>
            <button className="btn btn-danger">{translate("Gesture Labeling")}</button>
          </div>
        </div>
      )}
    </Translations>
  );
}

export default MainPage;
