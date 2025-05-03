import { useState, createContext } from 'react';
import { useLocation } from './hooks/useLocation.tsx';
import HomePage from './components/pages/home-page.tsx';
import FavoritesPage from './components/pages/favorites-page.tsx';

interface CurrentParams {
	latitude: number,
	longitude: number,
}

export const CurrentCoordContext = createContext<CurrentParams | null>(null);

export default function App() {
	const { current } =  useLocation();


	const [page, setPage] = useState('home');

  	return (
		<div className="dark:bg-gray-800 bg-gray-300 md:min-w-[626px] min-h-screen">
			<CurrentCoordContext.Provider value={current}>
				<div className="mx-auto md:min-w-[626px] md:w-1/3">
					{ page === 'home' && 
					<HomePage 
					onPageShow={() => setPage('favorite')}
					/>
				}

					{ page === 'favorite' &&
					<FavoritesPage
					onPageShow={() => setPage('home')}
					/>
				}
				</div>
			</CurrentCoordContext.Provider>
		</div>
  	)
}