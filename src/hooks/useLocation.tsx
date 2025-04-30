import { useEffect, useState } from 'react';

export function useLocation() {
    const [current, setCurrent] = useState({latitude: 0, longitude: 0});
    
    function clearCurrent() {
        setCurrent({
            latitude: 0,
            longitude: 0,
        });
    };
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCurrent({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            () => {
                setCurrent({
                    latitude: 50.8504,
                    longitude: 4.3488,
                });
            }
        );
        return () => {
            clearCurrent();
        }
    }, []);
    
    return { current };
}