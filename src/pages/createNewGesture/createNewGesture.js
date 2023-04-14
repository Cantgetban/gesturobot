import React, { useEffect, useState } from "react";
import Movement from "../../components/movment/movment";
import { getMovements } from "../../databases/getMovements";
import { useDrop } from "react-dnd";
import update from "immutability-helper";
import { useNavigate } from "react-router-dom";



const CreateNewGesture = () => {
  const [movements, setMovements] = useState([]);
  const [series, setSeries] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    const fetchMovements = async () => {
      const data = await getMovements();
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
      return monitor.isOver({ shallow: true }) && monitor.getItemType() === "movement";
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

  const addGesture = () => {
    if (series.length === 0){
      //here add the code that dent message to the user
      return
    }
    const newGesture = series
    setSeries([]);
    //AddNewGesture(newGesture)
    navigate("/GestureManagement")
  }


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
    const indexToRemove = series.findIndex((seriesMovement) => seriesMovement.id === movementId);
    if (indexToRemove !== -1) {
      const updatedSeries = [...series.slice(0, indexToRemove), ...series.slice(indexToRemove + 1)];
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

  return (
    <div className="row">
      <div className="col-md-9">
        <h2 className="text-center mb-3">Movements Library</h2>
        <div className="d-flex flex-wrap">
          {movements.map((movement) => (
            <div className="p-1" key={movement.id}>
              <Movement movement={movement} />
            </div>
          ))}
        </div>
      </div>
        <div className="col-md-3">
          <h2 className="text-center mb-3">New Gesture</h2>
          <button className="btn btn-primary" onClick={() => addGesture()}>
            Save And Add Gesture
          </button>
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
                          Remove
                        </button>
                        <button
                          className="btn btn-sm btn-outline-secondary mx-1"
                          disabled={index === 0}
                          onClick={() => handleMoveUp(index)}
                        >
                          Move Up
                        </button>
                        <button
                          className="btn btn-sm btn-outline-secondary mx-1"
                          disabled={index === series.length - 1}
                          onClick={() => handleMoveDown(index)}
                        >
                          Move Down
                        </button>
                      </div>
                  </div>
              ))}
              <div className="p-1 card card-body" style={{ backgroundColor: "black", color: "white" , height: "200px"}}  ref={dropTarget}>
                Drag next movement here
              </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default CreateNewGesture;      