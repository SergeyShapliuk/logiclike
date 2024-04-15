import { useState, useEffect } from 'react';

import { LogicListResponseType } from '../../types/types';

const useFetchList = (url: string) => {
  const [data, setData] = useState<LogicListResponseType[]>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url);
        const result = await response.json();

        if (response.ok) {
          setData(result);
        } else {
          setHasError(true);
          setErrorMessage(result);
        }
        setIsLoading(false);
      } catch (err) {
        setHasError(true);
        setErrorMessage(err.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, hasError, errorMessage };
};

export default useFetchList;
