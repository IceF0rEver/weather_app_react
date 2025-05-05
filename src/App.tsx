import { useState, useEffect, createContext } from 'react';
import { useLocation } from './hooks/useLocation.tsx';
import HomePage from './components/pages/home-page.tsx';
import FavoritesPage from './components/pages/favorites-page.tsx';
import { LocalStorageData } from './types/localStorage';
import { useFetch } from './hooks/useFetch.tsx';
import { useLocalStorage } from './hooks/useLocalStorage.tsx';

interface CurrentCoordContext {
	latitude: number,
	longitude: number,
};
interface ActiveCityContext {
	activeCity: LocalStorageData | null;
	setActiveCity: (city : LocalStorageData) => void;
};
interface ActivePageContext {
	activePage: 'home' | 'favorite';
	setActivePage: (page: 'home' | 'favorite') => void;
  }

export const CurrentCoordContext = createContext<CurrentCoordContext | null>(null);
export const ActiveCityContext = createContext<ActiveCityContext | null>(null);
export const ActivePageContext = createContext<ActivePageContext | null>(null);



export default function App() {
	const apiKey = import.meta.env.VITE_API_KEY;
	const { current } =  useLocation();

	const [activePage, setActivePage] = useState<'home' | 'favorite'>('home');
	const [activeCity, setActiveCity] = useState<LocalStorageData | null>(null);
    const [currentData, setCurrentData] = useState<LocalStorageData | null>(null);


	const [url, setUrl] = useState('');

	const { fetchDatas } = useFetch({ url });

	useEffect(() => {
	    if (current && current.latitude !== 0 && current.longitude !== 0) {
	        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${current.latitude}&lon=${current.longitude}&appid=${apiKey}&lang=fr&units=metric`;
	        setUrl(url);
	    }
	}, [current]);

	useEffect(() => {
	    if (fetchDatas && current){
	        setCurrentData({
	            id: fetchDatas.id,
	            latitude: current.latitude,
	            longitude: current.longitude,
	            city: fetchDatas.name,
	            country: fetchDatas.sys.country,
	            current: true,
	        })
	    }
	}, [fetchDatas]);

	useEffect(() => {
		setActiveCity(currentData as null);
	}, [currentData]);

    useLocalStorage({
        action: 'add',
        key: 'current',
        data: currentData,
    });    



  	return (
		<div className="dark:bg-gray-800 bg-gray-300 md:min-w-[626px] min-h-screen">
			<CurrentCoordContext.Provider value={current}>
				<ActivePageContext.Provider value={{activePage, setActivePage}}>
					<ActiveCityContext.Provider value={{activeCity, setActiveCity}}>
						<div className="mx-auto md:min-w-[626px] md:w-1/3 py-4">
							{ activePage === 'home' && 
							<HomePage 
							onPageShow={() => setActivePage('favorite')}
							/>
						}

							{ activePage === 'favorite' &&
							<FavoritesPage
							onPageShow={() => setActivePage('home')}
							/>
						}
						</div>
					</ActiveCityContext.Provider>
				</ActivePageContext.Provider>
			</CurrentCoordContext.Provider>
		</div>
  	)
}