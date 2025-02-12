import { useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async (requestConfig, transformData) => {
    const endPoint = requestConfig.endPoint;
    const method = requestConfig.method ? requestConfig.method : "GET";
    const headers = requestConfig.headers ? requestConfig.headers : {};
    const body = requestConfig.body ? requestConfig.body : null;

    try {
      setIsLoading(true);
      const response = await fetch(endPoint, {
        method,
        headers,
        body,
      });
      const data = await response.json();

      if (response.ok) {
        setIsLoading(false);
        return transformData(data);
      }

      const responseError = {
        type: "Error",
        msg: data.msg || "Default Error Msg",
        status: data.status,
      };

      let error = new Error();
      error = { ...error, ...responseError };

      transformData(data);
      throw error;
    } catch (error) {
      setError(error.msg);
    }

    setIsLoading(false);
  };
  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
