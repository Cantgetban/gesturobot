import React, { useRef } from "react";
import { useDrag } from "react-dnd";
import { useContext } from "react";
import { LanguageContext } from "../../language-management/LanguageContext";
import { Translations } from "../../language-management/Translations";

const Movement = ({ movement, draggable }) => {
  const videoRef = useRef(null);
  
  const { language } = useContext(LanguageContext);
  const name = language === "en" ? movement.name : movement.hebrewName;
  const description =
    language === "en" ? movement.description : movement.hebrewDescription;

  const [{ isDragging }, drag] = useDrag({
    type: "movement", // specify the type of the drag source
    item: { movement },
    canDrag: draggable,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleButtonClick = () => {
    videoRef.current.play();
  };

  return (
    <Translations>
      {({ translate }) => (
        <div
          className="card"
          style={{ width: "18rem", opacity: isDragging ? 0.5 : 1 }}
          ref={drag}
        >
          <span className="embed-responsive embed-responsive-16by9">
            <video
              width={287}
              height={180}
              ref={videoRef}
              title={name}
              className="embed-responsive-item"
              src= {movement.videoUrl}
              controls
            />
          </span>
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{description}</p>
            {draggable && (
              <button className="btn btn-primary" onClick={handleButtonClick}>
                {translate("Start Movement")}
              </button>
            )}
          </div>
        </div>
      )}
    </Translations>
  );
};

export default Movement;
