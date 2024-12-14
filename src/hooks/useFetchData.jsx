import React, { useEffect, useState } from "react";
import axios from "axios";

function useFetchData(URL = "", params = {}) {

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    let isSubscribe = true;
    (async function fetchData() {
      try {
        const response = await axios.get(URL, params);
        if (isSubscribe && response.status === 200) {
          setData(response.data || null);
        }
      } catch (error) {
        console.log(error);
      } finally {
        isSubscribe && setIsLoading(false);
      }
    })();
    return () => (isSubscribe = false);
  }, []);

  return { isLoading, data };
}

export default useFetchData;
