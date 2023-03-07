import { useState, useEffect } from "react";

export const useCall = () => {
  const [robotStates, setRobotStates] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/states", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setRobotStates(data.states);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return robotStates;
};
