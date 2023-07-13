import axios from "axios";
import React, { useEffect, useState } from "react";

const useToken = () => {
  const [token, setToken] = useState(null);
  const getToken = async () => {
    try {
      const tokenResponse = await axios.get(`https://frontend-test-assignment-api.abz.agency/api/v1/token`);
      const tokenData = tokenResponse.data;

      if (tokenData.success) {
        setToken(tokenData.token);
      } else {
        console.error("Failed to retrieve token");
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getToken();
  }, []);
  return { token, getToken };
};

export default useToken;
