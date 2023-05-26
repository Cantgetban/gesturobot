import React, { useEffect, useState, useContext } from "react";
import Movement from "../../components/movment/movment";
import { getMovements } from "../../databases/movementsAPI";
import { useDrop } from "react-dnd";
import update from "immutability-helper";
import { useNavigate } from "react-router-dom";
import { Translations } from "../../language-management/Translations";
import { addGestureJson, deleteGesture } from "../../databases/gesturesAPI";
import { emotionsList } from "../../databases/emotions";
import { LanguageContext} from "../../language-management/LanguageContext";
import { mapHebrewToEnglish, mapEnglishToHebrew } from "../../databases/emotions";

const CreateNewGesture = (props) => {
  const [movements, setMovements] = useState([]);
  const [series, setSeries] = useState([]);
  const [selectedEmotion, setSelectedEmotion] = useState("");
  const { language } = useContext(LanguageContext);

  let navigate = useNavigate();

  useEffect(() => {
    const fetchMovements = async () => {
      const data = await getMovements();
      console.log(data);
      setMovements(data);
    };

    fetchMovements();
  }, []);

  const addMovementToSeries = (movement) => {
    const index = series.length;
    const movementWithIndex = { ...movement, index };
    setSeries((prevSeries) => [...prevSeries, movementWithIndex]);
  };

  const [dropTargetProps, dropTarget] = useDrop({
    accept: "movement",
    canDrop: (item, monitor) => {
      // Return true only if the movement is dragged over the series drop target
      return (
        monitor.isOver({ shallow: true }) &&
        monitor.getItemType() === "movement"
      );
    },
    drop: (item, monitor) => {
      if (!item.movement) {
        return;
      }
      const targetMovementId = item.movement.id;
      const targetMovement = movements.find(
        (movement) => movement.id === targetMovementId
      );
      if (targetMovement) {
        // Add the target movement to the series
        addMovementToSeries(targetMovement);
      }
    },
  });

  const addGesture = async () => {
    if (series.length === 0) {
      //here add the code that dent message to the user
      return;
    }

    if (selectedEmotion === "") {
      //here add the code that dent message to the user
      return;
    }
     
    const realLabel = language == "en" ? mapEnglishToHebrew(selectedEmotion)
    : mapHebrewToEnglish(selectedEmotion);

    const newGesture = {
      name: "New Gesture",
      realLabel: realLabel,
      movements: series.map((movement) => movement.id),
      creator: [props.name, parseInt(props.type)],
      labels: [],
    };

    setSeries([]);
    setSelectedEmotion("");
    addGestureJson(newGesture);
    props.Show();
    props.onGestureAdd(newGesture);
    navigate("/createNewExperiment");
  };

  const handleMovementDragEnd = (movement, result) => {
    if (!result.dropResult) {
      return;
    }
    const { sourceIndex, targetIndex } = result.dropResult;
    const updatedSeries = update(series, {
      $splice: [
        [sourceIndex, 1],
        [targetIndex, 0, movement],
      ],
    });
    setSeries(updatedSeries);
  };

  const handleRemoveMovement = (movementId) => {
    const indexToRemove = series.findIndex(
      (seriesMovement) => seriesMovement.id === movementId
    );
    if (indexToRemove !== -1) {
      const updatedSeries = [
        ...series.slice(0, indexToRemove),
        ...series.slice(indexToRemove + 1),
      ];
      setSeries(updatedSeries);
    }
  };

  const handleMoveUp = (movementIndex) => {
    if (movementIndex === 0) {
      return;
    }
    const updatedSeries = update(series, {
      $splice: [
        [movementIndex - 1, 0, series[movementIndex]],
        [movementIndex + 1, 1],
      ],
    });
    setSeries(updatedSeries);
  };

  const handleMoveDown = (movementIndex) => {
    if (movementIndex === series.length - 1) {
      return;
    }
    const updatedSeries = update(series, {
      $splice: [
        [movementIndex, 1],
        [movementIndex + 1, 0, series[movementIndex]],
      ],
    });
    setSeries(updatedSeries);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(selectedEmotion);
  };

  const handleEmotionSelect = (event) => {
    setSelectedEmotion(event.target.value);
  };

  return (
    <Translations>
      {({ translate }) => (
        <div className="row">
          <div className="col-md-9">
            <h2 className="text-center mb-3">
              {translate("Movements Library")}
            </h2>
            <div className="d-flex flex-wrap">
              {movements.map((movement) => (
                <div className="p-1" key={movement.id}>
                  <Movement movement={movement} />
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-3">
            <h2 className="text-center mb-3">{translate("New Gesture")}</h2>
            <button className="btn btn-primary" onClick={() => addGesture()}>
              {translate("Save And Add New Gesture")}
            </button>
            <label>
              {translate("Select an emotion")}:
              <select value={selectedEmotion} onChange={handleEmotionSelect}>
                <option value="">{translate("--Please choose an emotion--")}</option>
                {emotionsList.map((emotion, index) => (
                  <option key={index} value={emotion}>
                    {language == "en"? emotion.en : emotion.he}
                  </option>
                ))}
              </select>
            </label>
            <br />
            <div className="card mb-3">
              <div className="card-body p-0" {...dropTargetProps}>
                {series.map((movement, index) => (
                  <div className="p-1" key={movement.id}>
                    <Movement
                      movement={movement}
                      onDragEnd={(result) => handleMovementDragEnd(result)}
                    />
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-sm btn-outline-secondary mx-1"
                        onClick={() => handleRemoveMovement(movement.id)}
                      >
                        {translate("Remove")}
                      </button>
                      <button
                        className="btn btn-sm btn-outline-secondary mx-1"
                        disabled={index === 0}
                        onClick={() => handleMoveUp(index)}
                      >
                        {translate("Move up")}
                      </button>
                      <button
                        className="btn btn-sm btn-outline-secondary mx-1"
                        disabled={index === series.length - 1}
                        onClick={() => handleMoveDown(index)}
                      >
                        {translate("Move down")}
                      </button>
                    </div>
                  </div>
                ))}
                <div
                  className="p-1 card card-body"
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    height: "200px",
                  }}
                  ref={dropTarget}
                >
                  {translate("Drag next movement here")}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Translations>
  );
};

export default CreateNewGesture;
