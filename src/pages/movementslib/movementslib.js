import { useEffect, useState } from "react";
import Movement from "../../components/movment/movment";
import { getMovements } from "../../databases/getMovements";

function MovementsLib() {
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
        <h2 className="text-center mb-3">Movements Library</h2>
        <div className="d-flex flex-wrap">
          {movements.map((movement) => (
            <div className="p-1" key={movement.id}>
              <Movement movement={movement} />
            </div>
          ))}
        </div>
      </div>
  )
}

export default MovementsLib;
