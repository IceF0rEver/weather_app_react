import { useEffect } from 'react';

interface Params {
    action: 'add' | 'remove' | 'read';
    key: string;
    data?: any; 
}

export function useLocalStorage({ action, key, data }: Params) {
    useEffect(() => {
      if (!key) return;
  
      switch (action) {
        case 'add':
          if (data !== undefined) {
            localStorage.setItem(key, JSON.stringify(data));
          }
          break;
  
        case 'remove':
          localStorage.removeItem(key);
          break;
  
        // case 'read':
        //   if (key !== undefined) {
        //     return JSON.parse(localStorage.getItem(key) ?? 'empty');
        //   }
        //   break;
      }
    }, [action, key, data]);
  }