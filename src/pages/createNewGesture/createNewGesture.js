import React, { useEffect, useState, useContext } from "react";
import Movement from "../../components/movment/movment";
import { getMovements } from "../../databases/movementsAPI";
import { useDrop } from "react-dnd";
import update from "immutability-helper";
import { useNavigate } from "react-router-dom";
import { Translations } from "../../language-management/Translations";
import { addGestureJson, deleteGesture, getGestureById} from "../../databases/gesturesAPI";
import { deleteAllExperiments } from "../../databases/newExperimentAPI";
import { emotionsList } from "../../databases/emotions";
import { LanguageContext} from "../../language-management/LanguageContext";
import { mapHebrewToEnglish, mapEnglishToHebrew } from "../../databases/emotions"; 
import "./createNewGesture.css"
import LoopOfMovements from "../../components/loopOfMovements/loopOfMovements";


function SeriesCard({ series }) {
  return (
    <div className="card">
      <div className="card-video">
        <LoopOfMovements key={series.map(ser => ser.id).join('-')} ids={series.map(ser => ser.id)} />
      </div>
    </div>
  );
}


const CreateNewGesture = (props) => {

  var data;
  var gestureToEdit;
  const [emotionIsSet, setemotionIsSet] = useState(false);
  const [hoveredMovement, setHoveredMovement] = useState(null);
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
      setemotionIsSet(true)
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

  const handleMovementMouseEnter = (movementId) => {
    console.log(movementId)
    setMovements((prevMovements) =>
      prevMovements.map((movement) =>
        movement.id === movementId
          ? { ...movement, isLooping: true }
          : movement
      )
    );
    setHoveredMovement(movementId);
  };

  const handleMovementMouseLeave = () => {
    setMovements((prevMovements) =>
      prevMovements.map((movement) =>
        movement.id === hoveredMovement
          ? { ...movement, isLooping: false }
          : movement
      )
    );
    setHoveredMovement(null);
  };

  const addMovementToSeries = (movement) => {
    let index = series.length;
    const movementWithIndex = { ...movement, index };
    setSeries((prevSeries) => [...prevSeries, movementWithIndex]);
  };

  const [dropTargetProps, dropTarget] = useDrop({
    accept: "movement",
    canDrop: (item, monitor) => {
      if(!emotionIsSet)
        return false;
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
      creator: [props.name, parseInt(props.type), props.Taz],
      labels: [],
    };

    console.log(newGesture)

    setSeries([]);
    setSelectedEmotion("");
    addGestureJson(newGesture)
    .then((nextId) => {
      props.Show()
      props.onGestureAdd(newGesture, nextId);
    }).then(async () =>
    {if(props.gesture != 0){
      await deleteGesture(props.gesture);
      await deleteAllExperiments();
      await props.setGestures([]);
      navigate("/GestureManagement");
      return
    }})
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
    setSeries(updatedSeries.sort((a, b) => a.index - b.index));
  };

  const handleRemoveMovement = (movementIndex) => {
    const updatedSeries = series
      .filter((movement) => movement.index !== movementIndex)
      .map((movement) => {
        if (movement.index > movementIndex) {
          return { ...movement, index: movement.index - 1 };
        }
        return movement;
      });
    setSeries(updatedSeries.sort((a, b) => a.index - b.index));
    console.log(series)
  };

  const handleMoveUp = (movementIndex) => {
    if (movementIndex === 0) {
      return;
    }
    const updatedSeries = series.map((movement) => {
      if (movement.index === movementIndex - 1) {
        return { ...movement, index: movement.index + 1 };
      } else if (movement.index === movementIndex) {
        return { ...movement, index: movement.index - 1 };
      }
      return movement;
    });
    setSeries(updatedSeries.sort((a, b) => a.index - b.index));
  };
  
  const handleMoveDown = (movementIndex) => {
    if (movementIndex === series.length - 1) {
      return;
    }
    const updatedSeries = series.map((movement) => {
      if (movement.index === movementIndex) {
        return { ...movement, index: movement.index + 1 };
      } else if (movement.index === movementIndex + 1) {
        return { ...movement, index: movement.index - 1 };
      }
      return movement;
    });
    setSeries(updatedSeries);
    console.log(series)
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(selectedEmotion);
  };

  const handleEmotionSelect = (event) => {
    setemotionIsSet(event.target.value != "");
    setSelectedEmotion(event.target.value);
  };

  const addMovement = (id) => {
    if(!emotionIsSet)
      return
    console.log(id)
    const targetMovementId = id
    const targetMovement = movements.find(
      (movement) => movement.id === targetMovementId
    );
    if (targetMovement) {
      // Add the target movement to the series
      addMovementToSeries(targetMovement);
    }
  }

  return (
    <Translations>
      {({ translate }) => (
        <div className="row">
          <div className="col-md-9">
            <h2 className="text-center mb-3">
              {emotionIsSet && translate("Movements Library")}
            </h2>
            <div className="d-flex flex-wrap">
              {emotionIsSet && movements.map((movement) => (
                <div className="p-1" key={movement.id} onMouseLeave={handleMovementMouseLeave} onMouseEnter={() => handleMovementMouseEnter(movement.id)}>
                  <button onDoubleClick={() => addMovement(movement.id)}>
                  <Movement movement={movement} isLooping={hoveredMovement === movement.id} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-3">
            <h2 className="text-center mb-3">{translate("New Gesture")}</h2>
            <button className="btn btn-primary" onClick={() => addGesture()}>
            {props.gesture === 0 ? translate("Save And Add New Gesture") : translate("Save Edited Gesture")}
            </button>
            <SeriesCard series = {series} />
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
            <div className="card mb-3" id="drag">
              <div className="card-body p-0" {...dropTargetProps}>
                {series.map((movement, index) => (
                  <div className="p-1" key={index}>
                    {language == "en" ? movement.name : movement.hebrewName}
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-sm btn-outline-secondary mx-1"
                        onClick={() => handleRemoveMovement(index)}
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
