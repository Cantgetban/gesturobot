import React, { useRef, useState, useEffect } from "react";
import { useDrag } from "react-dnd";
import { useContext } from "react";
import { LanguageContext } from "../../language-management/LanguageContext";
import { Translations } from "../../language-management/Translations";
import "./movment.css";

const Movement = ({ movement, draggable, isLooping }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { language } = useContext(LanguageContext);
  const name = language === "en" ? movement.name : movement.hebrewName;
  const description =
    language === "en" ? movement.description : movement.hebrewDescription;

  useEffect(() => {
    if (isLooping) {
      setIsPlaying(true);
      videoRef.current.play();
    }
  }, [isLooping]);

  const [{ isDragging }, drag] = useDrag({
    type: "movement",
    item: { movement },
    canDrag: draggable,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleButtonClick = () => {
    setIsPlaying(true);
    videoRef.current.play();
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    if (isLooping)
    handleButtonClick()
  };

  return (
    <Translations>
      {({ translate }) => (
        <div
          className="card"
          id="con"
          style={{ opacity: isDragging ? 0.5 : 1, cursor: "pointer" }}
          ref={drag}
        >
          <div className="embed-responsive embed-responsive-16by9 video-play-button video-player">
            <video
              muted={true}
              ref={videoRef}
              title={name}
              onEnded={handleVideoEnd}
              id="movement-player"
              src={movement.videoUrl}
            />
          </div>
          <div className="card-body" id="cd">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{description}</p>
          </div>
        </div>
      )}
    </Translations>
  );
};

export default Movement;
