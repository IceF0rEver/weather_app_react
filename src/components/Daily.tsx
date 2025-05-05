import { useState, useEffect, useContext, useRef } from 'react';
import { useFetch } from '../hooks/useFetch';
import { ActiveCityContext } from '../App';
import { DailyData } from '../types/dataFetch';
import { LineChartComponent } from './LineChart';

export function Daily() {
    const apiKey = import.meta.env.VITE_API_KEY;
    
    interface Item {
        dt: number;
        temp_min: number;
        temp_max: number;
        humidity: string;
        icon: string;
    };
        
    interface ItemChart {
        dt: number;
        temp_min: number;
        temp_max: number;
    };
            
    const [url, setUrl] = useState('');
    const [items, setItems] = useState<Item[]>([]);
    const [itemsChart, setItemsChart] = useState<ItemChart[]>([]);

    const dailyData = useRef<DailyData>({});
            
    const { activeCity } = useContext(ActiveCityContext)!;
    const { fetchDatas } = useFetch({ url });
        
        
    useEffect(() => {
        if (activeCity && activeCity.latitude !== 0 && activeCity.longitude !== 0) {
            const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${activeCity.latitude}&lon=${activeCity.longitude}&appid=${apiKey}&lang=fr&units=metric`;
            setUrl(url);
        }
    }, [activeCity]);
    
    useEffect(() => {
        if (fetchDatas){
            for (const item of fetchDatas.list) {
                const date = new Date(item.dt * 1000).setHours(0, 0, 0, 0);
                if (!dailyData.current[date]) {
                    dailyData.current[date] = {
                    dt: item.dt,
                    temp_min: Number(item.main.temp_min.toFixed(0)),
                    temp_max: Number(item.main.temp_max.toFixed(0)),
                    humidity: item.main.humidity.toFixed(0),
                    icon: item.weather[0].icon,
                    };
                } else {
                    dailyData.current[date].temp_min = Math.min(dailyData.current[date].temp_min, item.main.temp_min);
                    dailyData.current[date].temp_max = Math.max(dailyData.current[date].temp_max, item.main.temp_max);
                }
            };
            for (const item in dailyData.current) {
                const day = dailyData.current[item];
    
                setItems(prev => [
                    ...prev,
                    {
                        dt: day.dt,
                        temp_min: Number(day.temp_min.toFixed(0)),
                        temp_max: Number(day.temp_max.toFixed(0)),
                        humidity: day.humidity,
                        icon: day.icon,
                    }
                ]);
    
                setItemsChart(prev => [
                    ...prev,
                    {
                        dt: day.dt,
                        temp_max: Number(day.temp_max.toFixed(0)),
                        temp_min: Number(day.temp_min.toFixed(0)),
                    }
                ]);
            }
        };
    }, [fetchDatas]);

    return (
        <div>
            <section className="bg-white dark:bg-gray-900 dark:bg-opacity-80 bg-opacity-75 rounded-lg shadow p-5">
                <h2 className="font-bold dark:text-gray-50 text-xl mb-4">Prochains jours</h2>
                <div>
                    <div className="bg-white rounded-lg p-1 py-4 overflow-x-auto">
                        <div className="h-72 min-w-[420px] sm:min-w-1/3 px-3">
                            <LineChartComponent
                                chartData={itemsChart}
                                config={{
                                    temp_min: {
                                        label: "Températures minimales",
                                        color: "#00BFFF",
                                    },
                                    temp_max: {
                                        label: "Températures maximales",
                                        color: "#FF4500",
                                    }
                                }}
                            />
                        </div>
                        <div className="flex justify-between min-w-[500px] sm:min-w-1/3">
                            { items.length > 0 && items.map(item =>
                            <div key={item.dt}>
                                <div className="flex content-center justify-center">
                                    <p className="text-xs text-black">
                                        { new Date(item.dt * 1000).toLocaleDateString('fr', { weekday: 'short'})}
                                    </p>
                                </div>
                                <div className="bg-blue-300 rounded-lg">
                                    <img className="mx-auto size-12" src={`https://openweathermap.org/img/wn/${item.icon}@4x.png`} alt="weather icon"/>
                                    <div className="flex content-center justify-center px-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M12 4.67c-4.05 3.7-6 6.79-6 9.14c0 3.63 2.65 6.2 6 6.2s6-2.57 6-6.2c0-2.35-1.95-5.45-6-9.14m.28 14.32c-2.13.13-4.62-1.09-5.19-4.12a.75.75 0 0 1 1.48-.25c.41 2.23 2.28 2.98 3.64 2.87c.43-.02.79.32.79.75c0 .4-.32.73-.72.75" opacity=".3"/><path fill="currentColor" d="M12 2c-5.33 4.55-8 8.48-8 11.8c0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8m0 18c-3.35 0-6-2.57-6-6.2c0-2.34 1.95-5.44 6-9.14c4.05 3.7 6 6.79 6 9.14c0 3.63-2.65 6.2-6 6.2m-4.17-6c.37 0 .67.26.74.62c.41 2.22 2.28 2.98 3.64 2.87c.43-.02.79.32.79.75c0 .4-.32.73-.72.75c-2.13.13-4.62-1.09-5.19-4.12a.75.75 0 0 1 .74-.87"/>
                                        </svg>
                                        <p className="text-xs pb-2 text-black">{ item.humidity }%</p>
                                    </div>
                                </div>
                            </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}