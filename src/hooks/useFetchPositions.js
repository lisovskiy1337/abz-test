import axios from "axios";
import React, { useEffect, useState } from "react";

const useFetchPositions = () => {
  const [positions, setPositions] = useState([]);
  useEffect(() => {
    fetchPositions();
  }, []);

  const fetchPositions = async () => {
    try {
      const response = await axios.get(`https://frontend-test-assignment-api.abz.agency/api/v1/positions`);

      const { data } = response;
      if (!data.success) {
        throw new Error(data.message);
      }
      setPositions(data.positions);
    } catch (error) {
      console.log("Error:", error.message);
    }
  };
  return { positions, fetchPositions };
};

export default useFetchPositions;
