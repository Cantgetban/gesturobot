import React, { useState, useEffect } from "react";
import { getMovements } from "../../databases/movementsAPI";
import "./loopOfMovements.css";

const LoopOfMovements = (props) => {
  const [URLs, setURLs] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isFirstVideoPlayed, setIsFirstVideoPlayed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = React.useRef(null);

  function getURLsByIds(data) {
    const URLs = props.ids.map((id) => {
      const matchingObject = data.find((object) => object.id === id);
      return matchingObject ? matchingObject.videoUrl : "";
    });
    return URLs;
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMovements();
      const URLs = getURLsByIds(data);
      setURLs(URLs);
    };
    fetchData();
  }, []);

  const handleVideoEnd = () => {
    if (currentVideoIndex === URLs.length - 1) {
      setCurrentVideoIndex(0);
      setIsPlaying(false);
      return;
    }
    setCurrentVideoIndex(
      currentVideoIndex === URLs.length - 1 ? 0 : currentVideoIndex + 1
    );
    if (currentVideoIndex === 0 && !isFirstVideoPlayed) {
      setIsFirstVideoPlayed(true);
    }
    handleButtonClick();
  };

  const handleButtonClick = () => {
    setIsPlaying(true);
    if (!isFirstVideoPlayed) {
      setIsFirstVideoPlayed(true);
    }
    videoRef.current.play();
  };

  useEffect(() => {
    if (
      videoRef.current &&
      ((currentVideoIndex === 0 && !isFirstVideoPlayed) ||
        currentVideoIndex !== 0)
    ) {
      videoRef.current.play();
      return;
    }
  }, [URLs, currentVideoIndex, isFirstVideoPlayed]);
  return (
    <>
      <video
        onEnded={handleVideoEnd}
        width={280}
        height={200}
        src={URLs[currentVideoIndex]}
        ref={videoRef}
      ></video>
      <button
        className="btn btn-primary"
        onClick={handleButtonClick}
        disabled={isPlaying}
      >
        {isPlaying ? "Playing..." : "Start Gesture"}
      </button>
    </>
  );
};

export default LoopOfMovements;
