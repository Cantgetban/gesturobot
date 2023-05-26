import React, { useRef } from "react";
import { useDrag } from "react-dnd";
import { useContext, useState } from "react";
import { LanguageContext } from "../../language-management/LanguageContext";
import { Translations } from "../../language-management/Translations";
import "./movment.css"

const Movement = ({ movement, draggable }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
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
    setIsPlaying(true)
    videoRef.current.play();
  };

  const handleVideoEnd = () => {
    setIsPlaying(false)
  };

  return (
    <Translations>
      {({ translate }) => (
        <div
          className="card"
          id = "con"
          style={{opacity: isDragging ? 0.5 : 1 }}
          ref={drag}
        >
          <div className="embed-responsive embed-responsive-16by9 video-play-button video-player">
          {
          isPlaying ? null :
          <div className="video-play-button" onClick={handleButtonClick}>
          <img src="http://clipart-library.com/images_k/white-play-button-transparent/white-play-button-transparent-14.png"/>
            </div>
        }
            <video
              muted={true}
              ref={videoRef}
              title={name}
              onEnded={handleVideoEnd}
              id="movement-player"
              src= {movement.videoUrl}
            />
          </div>
          <div className="card-body" id="cd">
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
