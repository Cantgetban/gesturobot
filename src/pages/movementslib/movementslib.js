import { useEffect, useState } from "react";
import Movement from "../../components/movment/movment";
import { getMovements } from "../../databases/movementsAPI";
import { Translations } from "../../language-management/Translations";

function MovementsLib() {
  const [movements, setMovements] = useState([]);
  const [isLooping, setIsLooping] = useState(false);
  const [hoveredMovement, setHoveredMovement] = useState(null);

  useEffect(() => {
    const fetchMovements = async () => {
      const data = await getMovements();
      setMovements(data);
    };

    fetchMovements();
  }, []);

  const handleLoopChange = () => {
    setIsLooping(!isLooping);
  };

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

  return (
    <Translations>
      {({ translate }) => (
        <div className="row">
          <div className="form-check mt-3">
            <input
              className="form-check-input"
              type="checkbox"
              checked={isLooping}
              onChange={handleLoopChange}
            />
            <label className="form-check-label">{translate("Loop Movements")}</label>
          </div>
          <h2 className="text-center mb-3">{translate('Movements Library')}</h2>
          <div className="d-flex flex-wrap" style={{paddingLeft: "10%", paddingRight: "10%"}}>
            {movements.map((movement) => (
       <span
       className="p-1"
       key={movement.id}
       onMouseEnter={() => handleMovementMouseEnter(movement.id)}
       onMouseLeave={handleMovementMouseLeave}
       style={{
        justifyContent: "center",
        alignItems: "center",
        transform: hoveredMovement === movement.id ? "scale(1.5)" : "scale(1)",
        transition: "transform 0.3s ease-in-out",
        zIndex: hoveredMovement === movement.id ? 1 : "auto",
        position: "relative",
      }}
     >
       <Movement
         movement={movement}
         draggable
         isLooping={hoveredMovement === movement.id ? true : isLooping}
         style={{
           width: "100%",
           height: "100%",
           position: "absolute",
           top: 0,
           left: 0,
           right: 0,
           bottom: 0,
           margin: "auto",
           zIndex: hoveredMovement === movement.id ? "auto" : 1,
         }}
       />
     </span>
            ))}
          </div>
        </div>
      )}
    </Translations>
  );
}

export default MovementsLib;
