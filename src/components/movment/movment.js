import React, { useRef } from "react";
import { useContext } from "react";
import { LanguageContext } from "../../pages/language-management/LanguageContext";
import { Translations } from "../../pages/language-management/Translations";

const Movement = ({movement }) => {
  const videoRef = useRef(null);

  const { language } = useContext(LanguageContext)
  const name = language === "en" ? movement.name : movement.hebrewName;
  const description = language === "en" ? movement.description : movement.hebrewDescription; 

  const handleButtonClick = () => {
    videoRef.current.play();
  };

  return (
    <Translations>
        {({ translate }) => (
    <div className="card" style={{ width: "18rem" }}>
      <div className="embed-responsive embed-responsive-16by9">
        <iframe
          ref={videoRef}
          title={name}
          className="embed-responsive-item"
          src={movement.videoSrc}
          allowFullScreen
        ></iframe>
      </div>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{description}</p>
        <button className="btn btn-primary" onClick={handleButtonClick}>
          {translate("Start Movement")}
        </button>
      </div>
    </div>
        )}
    </Translations>
  );
};

export default Movement;
