const BASE_URL = 'http://localhost:3000'; // Replace with your JSON Server URL


 const  addTazNameType = async (tazNameType) => {
    try {
      // Check if the name and Taz are unique
      const existingData = await searchTazNameType(tazNameType.taz);
      if (existingData) {
        return
      }
      console.log(JSON.stringify(tazNameType))
      // Add the new TazNameType
      const response = await fetch("http://localhost:3000/TazNameType", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tazNameType),
      });

      if (!response.ok) {
        throw new Error('Failed to add TazNameType.');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  const deleteTazNameType =  async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/TazNameType/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete TazNameType.');
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  const searchTazNameType =  async (taz) => {
    try {
      const response = await fetch(`${BASE_URL}/TazNameType?taz=${taz}`);

      if (!response.ok) {
        throw new Error('Failed to search TazNameType.');
      }

      const data = await response.json();
      return data[0];
    } catch (error) {
      throw new Error(error.message);
    }
  }

  const getNameAndTypeById =  async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/TazNameType/${id}`);

      if (!response.ok) {
        throw new Error('Failed to get TazNameType by ID.');
      }

      const data = await response.json();
      const { name, type } = data;
      return { name, type };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  const checkIfNameExists = async (name, Taz) => {
    const response = await fetch(`${BASE_URL}/TazNameType?name=${name}`);
    const data = await response.json();
    for (let tazNameType of data) {
      if (tazNameType.taz === Taz) {
        return false; // Name exists with the same Taz
      }
    }
    return data.length > 0; // Name exists with another Taz or doesn't exist
  };

export {addTazNameType, deleteTazNameType, searchTazNameType, getNameAndTypeById, checkIfNameExists};
