import { useState,useEffect } from 'react';
import { FetchDataWithCoord } from '../types/dataFetch';

interface Params {
    url: string,
}

export function useFetch({url} : Params) {
    const [fetchDatas,setfetchDatas] = useState<FetchDataWithCoord>();
    const [error, setError] = useState('');

    useEffect(() => {
        let ignore = true;
      
        async function fetchData() {
          	const response = await fetch(url);
          	if (!response.ok) {
            	setError(`Une erreur est survenue !`);
            	throw new Error(`Request failed with status ${response.status}`);
          	}	
          	const data = await response.json();
          	if (ignore) {
           		setfetchDatas(data);
				setError('');
          	}
        }
        
        if (url !== ''){
          	fetchData();
        }
      
        return () => {
            ignore = false;
        };

	}, [url]);

	return { fetchDatas, error };
};