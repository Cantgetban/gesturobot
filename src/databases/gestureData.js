import { useState } from "react";

function GestureAPI(gesture) {
  const [gestureData, setGestureData] = useState(gesture);

  const getGestureData = async () => {
    try {
      const response = await fetch(`https://example.com/api/gestures/${gestureData.id}`);
      const data = await response.json();
      setGestureData(data);
    } catch (error) {
      console.error(error);
      // If the GET request fails, hard-code some default data
      setGestureData({
        name: "Default Gesture",
        realLabel: "happy",
        movements: [1, 2, 3],
        creator: "Anonymous",
      });
    }
  };

  const postGestureData = async () => {
    try {
      const response = await fetch(`https://example.com/api/gestures`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gestureData),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    gestureData,
    getGestureData,
    postGestureData,
  };
}

export default GestureAPI;
