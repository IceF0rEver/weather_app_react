import { useState, useEffect, useContext } from 'react';
import { useFetch } from '../hooks/useFetch';
import { ActiveCityContext } from '../App';
import Map from './Map';

export function Current() {
    const apiKey = import.meta.env.VITE_API_KEY;
    
    const { activeCity } = useContext(ActiveCityContext)!;
    
    const [url, setUrl] = useState('');
    
    const { fetchDatas } = useFetch({ url });
    
    useEffect(() => {
        if (activeCity !== null && activeCity.latitude !== 0 && activeCity.longitude !== 0) {
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${activeCity.latitude}&lon=${activeCity.longitude}&appid=${apiKey}&lang=fr&units=metric`;
            setUrl(url);
        }
    }, [activeCity]);

    return (
        <div>
            <section className="bg-white dark:bg-gray-900 dark:bg-opacity-80 bg-opacity-75 rounded-lg shadow p-5 flex flex-col">
                <header className="mb-4">
                    <h2 className="font-bold text-xl dark:text-gray-50">Météo instantanée</h2>
                </header>
                <article className="flex items-center justify-between">
                    <div>
                        <h3 className="text-sm sm:text-lg font-semibold dark:text-gray-50">{fetchDatas?.name}</h3>
                        {fetchDatas?.dt && (
                            <time
                                className="text-xs sm:text-sm text-gray-600 dark:text-gray-300"
                                dateTime={new Date(fetchDatas.dt * 1000).toISOString()}
                            >
                                {new Date(fetchDatas.dt * 1000).toLocaleTimeString('fr', {
                                hour: '2-digit',
                                minute: '2-digit',
                                })}

                                <br />

                                {new Date(fetchDatas.dt * 1000).toLocaleDateString('fr', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                                })}
                            </time>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <div className="text-right my-auto">
                            <p className="text-2xl sm:text-5xl dark:text-gray-50">{ fetchDatas?.main.temp.toFixed(0) }°C</p>
                            <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-300">{ fetchDatas?.weather[0].description }</p>
                        </div>
                        <div className="my-auto w-2/3 sm:w-full">
                            <img className="mx-auto my-auto bg-blue-300 rounded-full" src={`https://openweathermap.org/img/wn/${fetchDatas?.weather[0].icon}@2x.png`} alt="img"/>
                        </div>
                    </div>
                </article>
                 <article className="pt-4">
                 <Map />
                 </article>
            </section>
        </div>
    )
};