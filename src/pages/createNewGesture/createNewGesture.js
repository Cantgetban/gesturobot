import React, { useEffect, useState, useContext } from "react";
import Movement from "../../components/movment/movment";
import { getMovements } from "../../databases/movementsAPI";
import { useDrop } from "react-dnd";
import update from "immutability-helper";
import { useNavigate } from "react-router-dom";
import { Translations } from "../../language-management/Translations";
import { addGestureJson, deleteGesture, getGestureById} from "../../databases/gesturesAPI";
import { emotionsList } from "../../databases/emotions";
import { LanguageContext} from "../../language-management/LanguageContext";
import { mapHebrewToEnglish, mapEnglishToHebrew } from "../../databases/emotions"; 
import "./createNewGesture.css"

const CreateNewGesture = (props) => {

  var data;
  var gestureToEdit;
  const [movements, setMovements] = useState([]);
  const [series, setSeries] = useState([]);
  const [selectedEmotion, setSelectedEmotion] = useState("");
  const { language } = useContext(LanguageContext);

  let navigate = useNavigate();

  useEffect(() => {
    const editgesture = async (gesture) => {
      data = await getMovements();
      console.log(data);
      setMovements(data);
      if(props.gesture == 0)
        return;
      gestureToEdit = await getGestureById(gesture)
      console.log(gestureToEdit.movements)
      console.log(series.length)
      console.log(gestureToEdit.realLabel)
      setSelectedEmotion(gestureToEdit.realLabel[language == "en" ? 0 : 1])
      console.log(selectedEmotion)
      /// type and name already moved
     // deleteGesture(gestureToEdit.id)
     await createSeries(gestureToEdit.movements, data)
    };
    editgesture(props.gesture);
  }, []);
  
  const createSeries = async (moves, data) => {
    var ser = [];
    var index = 0
    for (let move of moves){
      let movement = data.find((movement) => movement.id === move)
      let movementWithIndex = {...movement, index};
      ser = [...ser, movementWithIndex];
      console.log(ser)
      index += 1;
    }
    setSeries(ser)
    return ser
  }

  const addMovementToSeries = (movement) => {
    let index = series.length;
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

    console.log(selectedEmotion)
    let label = language === "en" ? [selectedEmotion , mapEnglishToHebrew(selectedEmotion)] 
    : [mapHebrewToEnglish(selectedEmotion), selectedEmotion]
     
    const newGesture = {
      name: "New Gesture",
      realLabel: label,
      movements: series.map((movement) => movement.id),
      creator: [props.name, parseInt(props.type)],
      labels: [],
    };

    console.log(newGesture)

    setSeries([]);
    setSelectedEmotion("");
    addGestureJson(newGesture)
    .then((nextId) => {
      props.Show()
      props.onGestureAdd(newGesture, nextId);
    })
    if(props.gesture != 0){
      await deleteGesture(props.gesture);
      await props.handleSubmit()
      return
    }
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
            {props.gesture === 0 ? translate("Save And Add New Gesture") : translate("Save Edited Gesture")}
            </button>
            <label>
              {translate("Select an emotion")}:
              <select value={selectedEmotion} onChange={handleEmotionSelect}>
                <option value="">{translate("--Please choose an emotion--")}</option>
                {emotionsList.map((emotion, index) => (
                  <option key={index} value={language == "en"? emotion.en : emotion.he}>
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
                    {language == "en" ? movement.name : movement.hebrewName}
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
