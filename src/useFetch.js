import { useEffect, useState, useRef } from "react";
const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default function useFetch(url) {
  //using ref to avoid setting state on unmounted component
  const isMounted = useRef(url);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    isMounted.current = true;
    async function init() {
      try {
        const response = await fetch(baseUrl + url);
        if (response.ok) {
          const json = await response.json();
          if (isMounted.current) setData(json);
        } else {
          throw response;
        }
      } catch (e) {
        if (isMounted.current) setError(e);
      } finally {
        setloading(false);
      }
    }
    init();

    return () => {
      isMounted.current = false;
    };
  }, [url]);

  return { data, error, loading };
}
