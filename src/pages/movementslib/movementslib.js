import React, { useEffect, useState } from "react";
import Movement from "../../components/movment/movment";
import { getMovements } from "../../databases/getMovements"; 

const MovementsLib = () => { 
  const [movements, setMovements] = useState([]);

  useEffect(() => {
    const fetchMovements = async () => {
      const data = await getMovements(); 
      setMovements(data);
    };

    fetchMovements();
  }, []);

  return (
    <div className="row">
      {movements.map((movement) => (
        <div key={movement.id} className="col-sm-6 col-md-4 col-lg-3 mb-3">
          <Movement movement={movement} />
          {console.log(movement.description)}
        </div>
      ))}
    </div>
  );
};

export default MovementsLib; // export the component with the new name
