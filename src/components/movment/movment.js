import React, { useRef } from "react";

const Movement = ({movement }) => {
  const videoRef = useRef(null);

  const handleButtonClick = () => {
    videoRef.current.play();
  };

  return (
    <div className="card" style={{ width: "18rem" }}>
      <div className="embed-responsive embed-responsive-16by9">
        <iframe
          ref={videoRef}
          title={movement.name}
          className="embed-responsive-item"
          src={movement.videoSrc}
          allowFullScreen
        ></iframe>
      </div>
      <div className="card-body">
        <h5 className="card-title">{movement.name}</h5>
        <p className="card-text">{movement.description}</p>
        <button className="btn btn-primary" onClick={handleButtonClick}>
          Start Movement
        </button>
      </div>
    </div>
  );
};

export default Movement;
