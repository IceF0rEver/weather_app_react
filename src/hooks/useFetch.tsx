import { useState,useEffect } from 'react';
import { FetchDataWithCoord } from '../types/dataFetch';

interface Params {
    url: string,
}

export function useFetch({url} : Params) {
    const [fetchDatas,setfetchDatas] = useState<FetchDataWithCoord>();

    useEffect(() => {
        let ignore = true;
      
        async function fetchData() {
          const response = await fetch(url);
          const json = await response.json();
          if (ignore) {
            setfetchDatas(json);
          }
        }
        
        if (url !== ''){
          fetchData();
        }
      
        return () => {
            ignore = false;
        };

      }, [url]); 

    return { fetchDatas };
};