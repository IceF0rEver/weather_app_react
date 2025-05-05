import { useState, useEffect } from "react";
import { useFetch } from "@/hooks/useFetch";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { LocalStorageData } from "@/types/localStorage";

export function AddFrom() {
    const apiKey = import.meta.env.VITE_API_KEY;
    
    const [url, setUrl] = useState('');
    const [newCity, setNewCity] = useState('');
    const [newCityData, setnewCityData] = useState<LocalStorageData>();
    
    const { fetchDatas, error } = useFetch({ url });
    
    useEffect(() => {
        if (fetchDatas && fetchDatas.city.id){
            setnewCityData({
                id: fetchDatas.city.id,
                latitude: fetchDatas.city.coord.lat,
                longitude: fetchDatas.city.coord.lon,
                city: fetchDatas.city.name,
                country: fetchDatas.city.country,
                current: false,
            })
        }
    }, [fetchDatas]);

    useLocalStorage({
            action: 'add',
            key: 'cities',
            data: newCityData,
        });  
    
    const handleSubmit = (e : any) => {
        e.preventDefault();
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${newCity}&appid=${apiKey}&lang=fr&units=metric`;
        setUrl(url);
    };

    const handleAddCurrentLocation = () => {
        const currentData = JSON.parse(localStorage.getItem('current') || "[]");
        setnewCityData({
            id: currentData[0].id,
            latitude: currentData[0].latitude,
            longitude: currentData[0].longitude,
            city: currentData[0].city,
            country: currentData[0].country,
            current: currentData[0].current,
        });
    };
    
    return (
        <div>
            <section className="bg-white dark:bg-gray-900 dark:bg-opacity-80 bg-opacity-75 rounded-lg shadow p-5 flex flex-col">
                <h2 className="font-bold text-xl mb-4 dark:text-gray-50">Ajouter un lieu</h2>
                <form  
                    onSubmit={handleSubmit}
                >
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-300">Nom du lieu</label>
                        <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        placeholder="Paris, France"
                        value={newCity}
                        onChange={(e) => setNewCity(e.target.value)}
                        />
                    <span className="p-1 text-red-500 font-semibold">{ error }</span>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <button
                            onClick={handleAddCurrentLocation} 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                        >
                            Ajouter la position actuelle
                        </button>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Ajouter
                        </button>
                    </div>
                </form>
            </section>
        </div>
    )
};